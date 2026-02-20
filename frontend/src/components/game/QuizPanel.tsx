import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/data/gameLevels';
import { cn } from '@/lib/utils';

interface QuizPanelProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const QuizPanel: React.FC<QuizPanelProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score + (isCorrect ? 1 : 0));
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentQuestion + 1} / {questions.length}
        </span>
        <span className="font-medium">
          Score : {score} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="p-6 rounded-xl bg-muted/50">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <h3 className="text-xl font-medium">{question.question}</h3>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={showResult}
            className={cn(
              "p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3",
              selectedAnswer === index
                ? showResult
                  ? index === question.correctIndex
                    ? "border-success bg-success/10"
                    : "border-destructive bg-destructive/10"
                  : "border-primary bg-primary/10"
                : showResult && index === question.correctIndex
                  ? "border-success bg-success/5"
                  : "border-border hover:border-primary/50"
            )}
          >
            <span className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
              selectedAnswer === index
                ? showResult
                  ? index === question.correctIndex
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground"
                  : "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1">{option}</span>
            {showResult && index === question.correctIndex && (
              <CheckCircle2 className="w-5 h-5 text-success" />
            )}
            {showResult && selectedAnswer === index && index !== question.correctIndex && (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={cn(
          "p-4 rounded-lg",
          isCorrect ? "bg-success/10" : "bg-amber-500/10"
        )}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn(
                "font-medium mb-1",
                isCorrect ? "text-success" : "text-amber-600"
              )}>
                {isCorrect ? "Bonne réponse !" : "Explication :"}
              </p>
              <p className="text-sm text-muted-foreground">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end pt-4">
        {!showResult ? (
          <Button
            onClick={handleValidate}
            disabled={selectedAnswer === null}
            className="gap-2"
          >
            Valider
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
