const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Comment {
  id: string;
  message: string;
  page_url: string;
  created_at: string;
}

/**
 * Récupère tous les commentaires depuis l'API
 */
export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    throw error;
  }
};

/**
 * Crée un nouveau commentaire via l'API
 */
export const createComment = async (message: string, pageUrl: string): Promise<Comment> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, page_url: pageUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error);
    throw error;
  }
};

/**
 * Supprime un commentaire via l'API
 */
export const deleteComment = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Erreur HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    throw error;
  }
};

