import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useCommentsStore } from '@/stores/useCommentsStore';
import { useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addComment = useCommentsStore((s) => s.addComment);
  const location = useLocation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await addComment(message.trim(), location.pathname);
      toast({ title: '✅ Commentaire envoyé', description: 'Merci pour votre retour !' });
      setMessage('');
      onClose();
    } catch (error) {
      toast({ 
        title: '❌ Erreur', 
        description: 'Impossible d\'envoyer le commentaire. Veuillez réessayer.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md mx-4 mb-4 sm:mb-0 p-5 bg-card rounded-2xl border border-border shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">💬 Laisser un commentaire</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre commentaire..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none transition-all"
            autoFocus
          />
          <p className="text-xs text-muted-foreground mt-1.5 mb-3">
            Page : <code className="px-1 py-0.5 rounded bg-muted-foreground/10 font-mono">{location.pathname}</code>
          </p>
          <button
            type="submit"
            disabled={!message.trim() || isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
};
