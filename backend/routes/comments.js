import express from 'express';
import * as CommentModel from '../models/Comment.js';

const router = express.Router();

/**
 * GET /api/comments
 * Récupère tous les commentaires
 */
router.get('/', async (req, res) => {
  try {
    const comments = await CommentModel.getAll();
    res.json(comments);
  } catch (error) {
    console.error('Erreur GET /api/comments:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/comments
 * Crée un nouveau commentaire
 * Body: { message: string, page_url: string }
 */
router.post('/', async (req, res) => {
  try {
    const { message, page_url } = req.body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Le message est requis et ne peut pas être vide' });
    }

    if (!page_url || typeof page_url !== 'string' || page_url.trim().length === 0) {
      return res.status(400).json({ error: 'La page_url est requise et ne peut pas être vide' });
    }

    const comment = await CommentModel.create(message.trim(), page_url.trim());
    res.status(201).json(comment);
  } catch (error) {
    console.error('Erreur POST /api/comments:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

/**
 * DELETE /api/comments/:id
 * Supprime un commentaire par son ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'L\'ID du commentaire est requis' });
    }

    const deleted = await CommentModel.deleteById(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Commentaire non trouvé' });
    }

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur DELETE /api/comments/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

