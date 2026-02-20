import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Level } from '@/data/gameLevels';
import { LevelProgress } from '@/pages/VariableQuest';
import { ExplanationPanel } from './ExplanationPanel';
import { MissionPanel } from './MissionPanel';
import { QuizPanel } from './QuizPanel';
import { ExercisePanel } from './ExercisePanel';
import { cn } from '@/lib/utils';

interface LevelContentProps {
  level: Level;
  onBack: () => void;
  onComplete: (stars: number) => void;
  progress?: LevelProgress;
}

type Step = 'explanation' | 'mission' | 'quiz' | 'exercise' | 'complete';

export const LevelContent: React.FC<LevelContentProps> = ({
  level,
  onBack,
  onComplete,
  progress,
}) => {
  const [step, setStep] = useState<Step>('explanation');
  const [missionScore, setMissionScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const stepLabels: Record<Step, string> = {
    explanation: 'Explication',
    mission: 'Mission',
    quiz: 'Quiz',
    exercise: 'Pratique',
    complete: 'Terminé',
  };

  const steps: Step[] = ['explanation', 'mission', 'quiz', 'exercise', 'complete'];
  const currentStepIndex = steps.indexOf(step);

  const handleMissionComplete = (score: number) => {
    setMissionScore(score);
    setStep('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setStep('exercise');
  };

  const handleExerciseComplete = () => {
    setExerciseCompleted(true);
    setStep('complete');
  };

  const calculateStars = () => {
    let stars = 1; // Base star for completion
    if (quizScore >= 2) stars++; // Second star for good quiz
    if (quizScore === 3 && exerciseCompleted) stars++; // Third star for perfect
    return stars;
  };

  const handleFinish = () => {
    onComplete(calculateStars());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl bg-gradient-to-br text-white text-xl",
                level.color
              )}>
                {level.icon}
              </div>
              <div>
                <h1 className="text-lg font-bold">Niveau {level.id}</h1>
                <p className="text-xs text-muted-foreground">{level.title}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            {steps.slice(0, -1).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  i < currentStepIndex 
                    ? "bg-success text-success-foreground" 
                    : i === currentStepIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {i < currentStepIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          {/* Step Header */}
          <div className={cn(
            "px-6 py-4 bg-gradient-to-r text-white",
            level.color
          )}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{stepLabels[step]}</h2>
              {step !== 'complete' && (
                <span className="text-sm opacity-80">
                  Étape {currentStepIndex + 1} / 4
                </span>
              )}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {step === 'explanation' && (
              <ExplanationPanel
                explanation={level.explanation}
                onContinue={() => setStep('mission')}
              />
            )}

            {step === 'mission' && (
              <MissionPanel
                mission={level.mission}
                onComplete={handleMissionComplete}
              />
            )}

            {step === 'quiz' && (
              <QuizPanel
                questions={level.quiz}
                onComplete={handleQuizComplete}
              />
            )}

            {step === 'exercise' && (
              <ExercisePanel
                exercise={level.exercise}
                onComplete={handleExerciseComplete}
                onSkip={() => setStep('complete')}
              />
            )}

            {step === 'complete' && (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Niveau terminé !</h3>
                <p className="text-muted-foreground mb-6">
                  Tu as terminé le niveau {level.id} avec succès !
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-10 h-10 transition-all duration-500",
                        calculateStars() >= star
                          ? "text-amber-400 fill-amber-400 animate-scale-in"
                          : "text-muted-foreground/30"
                      )}
                      style={{ animationDelay: `${star * 200}ms` }}
                    />
                  ))}
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-6 mb-8 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{quizScore}/3</div>
                    <div className="text-muted-foreground">Quiz</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">
                      {exerciseCompleted ? '✓' : '○'}
                    </div>
                    <div className="text-muted-foreground">Exercice</div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleFinish}
                  className={cn("bg-gradient-to-r text-white", level.color)}
                >
                  {level.id === 6 ? 'Obtenir mon certificat' : 'Continuer'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};
