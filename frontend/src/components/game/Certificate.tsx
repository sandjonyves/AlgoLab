import React, { useRef } from 'react';
import { Trophy, Star, Award, Download, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CertificateProps {
  playerName: string;
  totalStars: number;
  onClose: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({
  playerName,
  totalStars,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const getTitle = () => {
    if (totalStars >= 15) return "Maître des Variables";
    if (totalStars >= 10) return "Expert en Variables";
    return "Apprenti Programmeur";
  };

  const handleDownload = () => {
    // Simple print functionality
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 p-6">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour aux niveaux
        </Button>
      </div>

      {/* Certificate */}
      <div
        ref={certificateRef}
        className="max-w-3xl mx-auto bg-white dark:bg-card rounded-3xl shadow-2xl overflow-hidden print:shadow-none"
      >
        {/* Header Decoration */}
        <div className="h-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

        <div className="p-12 text-center relative">
          {/* Corner Decorations */}
          <div className="absolute top-8 left-8">
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <div className="absolute top-8 right-8">
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>

          {/* Trophy Icon */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-2">
            Certificat de Réussite
          </h1>
          <p className="text-muted-foreground mb-8">Variable Quest - VsAlgo</p>

          {/* Award Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-8">
            <Award className="w-6 h-6 text-amber-600" />
            <span className="text-xl font-bold text-amber-700 dark:text-amber-400">
              {getTitle()}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-6 mb-8">
            <p className="text-lg text-muted-foreground">
              Ce certificat est décerné à
            </p>
            <p className="text-4xl font-bold text-foreground">
              {playerName}
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Pour avoir complété avec succès les 6 niveaux de Variable Quest
              et maîtrisé les concepts fondamentaux des variables en algorithmique.
            </p>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(18)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-6 h-6 transition-all",
                  i < totalStars
                    ? "text-amber-400 fill-amber-400"
                    : "text-muted-foreground/20"
                )}
              />
            ))}
          </div>

          {/* Score */}
          <div className="inline-block px-8 py-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Score total</p>
            <p className="text-3xl font-bold">
              <span className="text-amber-500">{totalStars}</span>
              <span className="text-muted-foreground"> / 18 étoiles</span>
            </p>
          </div>

          {/* Date */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Délivré le {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="h-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />
      </div>

      {/* Actions */}
      <div className="max-w-3xl mx-auto mt-6 flex justify-center gap-4 print:hidden">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Imprimer / Télécharger
        </Button>
        <Button
          onClick={onClose}
          className="gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600"
        >
          <Trophy className="w-4 h-4" />
          Revenir au jeu
        </Button>
      </div>
    </div>
  );
};
