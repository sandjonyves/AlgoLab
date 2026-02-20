import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LevelCard } from '@/components/game/LevelCard';
import { LevelContent } from '@/components/game/LevelContent';
import { Certificate } from '@/components/game/Certificate';
import { levels } from '@/data/gameLevels';

export interface LevelProgress {
  completed: boolean;
  stars: number;
  quizPassed: boolean;
  exercisePassed: boolean;
}

const VariableQuest = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, LevelProgress>>(() => {
    const saved = localStorage.getItem('variablequest-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [showCertificate, setShowCertificate] = useState(false);

  const saveProgress = useCallback((levelId: number, levelProgress: LevelProgress) => {
    setProgress(prev => {
      const newProgress = { ...prev, [levelId]: levelProgress };
      localStorage.setItem('variablequest-progress', JSON.stringify(newProgress));
      return newProgress;
    });
  }, []);

  const handleLevelComplete = useCallback((levelId: number, stars: number) => {
    saveProgress(levelId, {
      completed: true,
      stars,
      quizPassed: true,
      exercisePassed: true,
    });
    
    // Check if all levels completed
    if (levelId === 6) {
      setShowCertificate(true);
    } else {
      setCurrentLevel(null);
    }
  }, [saveProgress]);

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return progress[levelId - 1]?.completed || false;
  };

  const totalStars = Object.values(progress).reduce((sum, p) => sum + (p.stars || 0), 0);
  const completedLevels = Object.values(progress).filter(p => p.completed).length;

  if (showCertificate) {
    return (
      <Certificate 
        playerName="Champion"
        totalStars={totalStars}
        onClose={() => {
          setShowCertificate(false);
          setCurrentLevel(null);
        }}
      />
    );
  }

  if (currentLevel !== null) {
    const level = levels.find(l => l.id === currentLevel);
    if (level) {
      return (
        <LevelContent
          level={level}
          onBack={() => setCurrentLevel(null)}
          onComplete={(stars) => handleLevelComplete(currentLevel, stars)}
          progress={progress[currentLevel]}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Variable Quest</h1>
                <p className="text-xs text-muted-foreground">
                  Apprends les variables en t'amusant !
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{totalStars} / 18</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-semibold">{completedLevels} / 6</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Aventure éducative</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Bienvenue dans Variable Quest !</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pars à l'aventure et découvre le monde magique des variables. 
            Chaque niveau te rapprochera de la maîtrise des bases de l'algorithmique !
          </p>
        </div>

        {/* Progress Path */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 -translate-x-1/2 hidden lg:block" />
          
          {/* Levels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level, index) => (
              <LevelCard
                key={level.id}
                level={level}
                index={index}
                isUnlocked={isLevelUnlocked(level.id)}
                progress={progress[level.id]}
                onClick={() => isLevelUnlocked(level.id) && setCurrentLevel(level.id)}
              />
            ))}
          </div>
        </div>

        {/* Final Challenge */}
        {completedLevels === 6 && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => setShowCertificate(true)}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white gap-2"
            >
              <Trophy className="w-5 h-5" />
              Voir mon certificat
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VariableQuest;
