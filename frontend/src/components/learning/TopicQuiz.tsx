import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/data/learningTopics';
import { cn } from '@/lib/utils';
import { getRandomQuestions, QUIZ_QUESTIONS_COUNT } from '@/data/quizQuestions';

interface TopicQuizProps {
  questions: QuizQuestion[];
  topicId?: string; // Optionnel: si fourni, on utilise la banque de questions
  onComplete: (score: number, total: number) => void;
}

export const TopicQuiz: React.FC<TopicQuizProps> = ({ questions: originalQuestions, topicId, onComplete }) => {
  // Générer un set aléatoire de questions au montage (ou utiliser les questions fournies)
  const [quizKey, setQuizKey] = useState(0);
  
  const questions = useMemo(() => {
    if (topicId) {
      const randomQuestions = getRandomQuestions(topicId, QUIZ_QUESTIONS_COUNT);
      // Si pas assez de questions dans la banque, utiliser les originales
      return randomQuestions.length > 0 ? randomQuestions : originalQuestions;
    }
    return originalQuestions;
  }, [topicId, originalQuestions, quizKey]);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const isComplete = currentQuestion === questions.length - 1 && showResult;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

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
      const finalScore = score + (isCorrect ? 1 : 0);
      onComplete(finalScore, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  const handleNewQuiz = () => {
    // Incrémenter la clé pour forcer le useMemo à recalculer
    setQuizKey(prev => prev + 1);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(QUIZ_QUESTIONS_COUNT).fill(null));
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                i < currentQuestion ? (
                  answers[i] === questions[i].correctIndex 
                    ? "bg-success text-success-foreground" 
                    : "bg-destructive text-destructive-foreground"
                ) : i === currentQuestion
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i < currentQuestion ? (
                answers[i] === questions[i].correctIndex ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
              ) : i + 1}
            </div>
          ))}
        </div>
        <span className="font-medium text-primary">
          Score : {score} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
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
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <span className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
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
            <span className="flex-1 font-medium">{option}</span>
            {showResult && index === question.correctIndex && (
              <CheckCircle2 className="w-6 h-6 text-success" />
            )}
            {showResult && selectedAnswer === index && index !== question.correctIndex && (
              <XCircle className="w-6 h-6 text-destructive" />
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={cn(
          "p-4 rounded-lg animate-fade-in",
          isCorrect ? "bg-success/10 border border-success/20" : "bg-amber-500/10 border border-amber-500/20"
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
            ) : (
              <HelpCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
            )}
            <div>
              <p className={cn(
                "font-bold mb-1",
                isCorrect ? "text-success" : "text-amber-600"
              )}>
                {isCorrect ? "Excellente réponse !" : "Pas tout à fait..."}
              </p>
              <p className="text-sm text-muted-foreground">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRetry} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </Button>
          {topicId && (
            <Button variant="ghost" onClick={handleNewQuiz} className="gap-2">
              <Shuffle className="w-4 h-4" />
              Nouvelles questions
            </Button>
          )}
        </div>

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
            {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
