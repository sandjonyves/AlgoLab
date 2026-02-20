import pool from '../config/database.js';

/**
 * Récupère tous les commentaires triés par date décroissante
 * @returns {Promise<Array>} Liste des commentaires
 */
export const getAll = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM comments ORDER BY created_at DESC'
    );
    return result.rows.map(comment => ({
      id: comment.id,
      message: comment.message,
      page_url: comment.page_url,
      created_at: new Date(comment.created_at).toISOString()
    }));
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des commentaires: ${error.message}`);
  }
};

/**
 * Crée un nouveau commentaire
 * @param {string} message - Le message du commentaire
 * @param {string} page_url - L'URL de la page
 * @returns {Promise<Object>} Le commentaire créé
 */
export const create = async (message, page_url) => {
  try {
    // Générer un ID unique
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const insertResult = await pool.query(
      'INSERT INTO comments (id, message, page_url) VALUES ($1, $2, $3) RETURNING *',
      [id, message, page_url]
    );
    
    const comment = insertResult.rows[0];
    
    return {
      id: comment.id,
      message: comment.message,
      page_url: comment.page_url,
      created_at: new Date(comment.created_at).toISOString()
    };
  } catch (error) {
    console.error('Erreur détaillée lors de la création du commentaire:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      stack: error.stack
    });
    throw new Error(`Erreur lors de la création du commentaire: ${error.message}`);
  }
};

/**
 * Supprime un commentaire par son ID
 * @param {string} id - L'ID du commentaire à supprimer
 * @returns {Promise<boolean>} True si supprimé avec succès
 */
export const deleteById = async (id) => {
  try {
    const result = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    return result.rowCount > 0;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du commentaire: ${error.message}`);
  }
};

