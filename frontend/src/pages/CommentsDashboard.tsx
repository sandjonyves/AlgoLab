import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCommentsStore } from '@/stores/useCommentsStore';
import { Trash2, MessageSquare, ArrowLeft, Loader2, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 10;
const MAX_MESSAGE_LENGTH = 50; // Longueur maximale du message tronqué

const CommentsDashboard: React.FC = () => {
  const { comments, loading, error, fetchComments, deleteComment } = useCommentsStore();
  const [page, setPage] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<{ id: string; message: string; page_url: string; created_at: Date } | null>(null);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const sorted = [...comments].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paginated = sorted.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  // Fonction pour tronquer le message
  const truncateMessage = (message: string): string => {
    if (message.length <= MAX_MESSAGE_LENGTH) return message;
    return message.substring(0, MAX_MESSAGE_LENGTH) + '...';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-4 max-w-5xl mx-auto">
          <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard Commentaires</h1>
              <p className="text-xs text-muted-foreground">{comments.length} commentaire{comments.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}
        
        {loading && comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-12 h-12 text-muted-foreground/40 mb-4 animate-spin" />
            <p className="text-lg font-medium text-muted-foreground">Chargement des commentaires...</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Aucun commentaire</p>
            <p className="text-sm text-muted-foreground/70">Les commentaires des utilisateurs apparaîtront ici.</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="sm:hidden flex flex-col gap-3">
              {paginated.map((c) => (
                <div key={c.id} className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm mb-2">{truncateMessage(c.message)}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-mono">{c.page_url}</span>
                    <span>{new Date(c.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedComment(c)}
                      className="flex-1 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      Détail
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                          setDeletingId(c.id);
                          try {
                            await deleteComment(c.id);
                            toast({ title: '✅ Commentaire supprimé', description: 'Le commentaire a été supprimé avec succès.' });
                          } catch (error) {
                            toast({ 
                              title: '❌ Erreur', 
                              description: 'Impossible de supprimer le commentaire.',
                              variant: 'destructive'
                            });
                          } finally {
                            setDeletingId(null);
                          }
                        }
                      }}
                      disabled={deletingId === c.id}
                      className="flex-1 text-xs"
                    >
                      {deletingId === c.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Message</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Page</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-center font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => (
                    <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 max-w-xs">
                        <span className="truncate block">{truncateMessage(c.message)}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.page_url}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(c.created_at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedComment(c)}
                            className="h-8 w-8 p-0"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
                                setDeletingId(c.id);
                                try {
                                  await deleteComment(c.id);
                                  toast({ title: '✅ Commentaire supprimé', description: 'Le commentaire a été supprimé avec succès.' });
                                } catch (error) {
                                  toast({ 
                                    title: '❌ Erreur', 
                                    description: 'Impossible de supprimer le commentaire.',
                                    variant: 'destructive'
                                  });
                                } finally {
                                  setDeletingId(null);
                                }
                              }
                            }}
                            disabled={deletingId === c.id}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Supprimer"
                          >
                            {deletingId === c.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      i === page ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted-foreground/10 text-muted-foreground'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Dialog pour afficher le message complet */}
      <Dialog open={selectedComment !== null} onOpenChange={(open) => !open && setSelectedComment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du commentaire</DialogTitle>
            <DialogDescription>
              Message complet du commentaire
            </DialogDescription>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <p className="mt-2 p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap break-words">
                  {selectedComment.message}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Page</label>
                  <p className="mt-2 font-mono text-sm bg-muted p-2 rounded-lg">
                    {selectedComment.page_url}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p className="mt-2 text-sm bg-muted p-2 rounded-lg">
                    {new Date(selectedComment.created_at).toLocaleString('fr-FR', { 
                      dateStyle: 'long', 
                      timeStyle: 'medium' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentsDashboard;
