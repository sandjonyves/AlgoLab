import { create } from 'zustand';
import { fetchComments, createComment, deleteComment as deleteCommentAPI, Comment as APIComment } from '@/lib/api';

export interface Comment {
  id: string;
  message: string;
  page_url: string;
  created_at: Date;
}

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  fetchComments: () => Promise<void>;
  addComment: (message: string, pageUrl: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

// Convertir un commentaire de l'API en Comment du store
const apiCommentToComment = (apiComment: APIComment): Comment => ({
  id: apiComment.id,
  message: apiComment.message,
  page_url: apiComment.page_url,
  created_at: new Date(apiComment.created_at),
});

export const useCommentsStore = create<CommentsState>()((set, get) => ({
  comments: [],
  loading: false,
  error: null,

  fetchComments: async () => {
    set({ loading: true, error: null });
    try {
      const apiComments = await fetchComments();
      const comments = apiComments.map(apiCommentToComment);
      set({ comments, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du chargement des commentaires';
      set({ error: errorMessage, loading: false });
      console.error('Erreur fetchComments:', error);
    }
  },

  addComment: async (message, pageUrl) => {
    set({ loading: true, error: null });
    try {
      const apiComment = await createComment(message, pageUrl);
      const newComment = apiCommentToComment(apiComment);
      set((state) => ({
        comments: [newComment, ...state.comments],
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'ajout du commentaire';
      set({ error: errorMessage, loading: false });
      console.error('Erreur addComment:', error);
      throw error; // Re-throw pour que le composant puisse gérer l'erreur
    }
  },

  deleteComment: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCommentAPI(id);
      set((state) => ({
        comments: state.comments.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression du commentaire';
      set({ error: errorMessage, loading: false });
      console.error('Erreur deleteComment:', error);
      throw error; // Re-throw pour que le composant puisse gérer l'erreur
    }
  },
}));
