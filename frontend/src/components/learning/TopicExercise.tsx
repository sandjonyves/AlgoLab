import React, { useState, useCallback, useEffect } from 'react';
import { Play, CheckCircle2, XCircle, Lightbulb, Eye, EyeOff, Code2, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Editor from '@monaco-editor/react';
import { Parser } from '@/engine/parser/parser';
import { Interpreter } from '@/engine/runtime/interpreter';
import { AlgoError } from '@/engine/errors/errorHandler';
import { Exercise } from '@/data/learningTopics';
import { useLearningStore } from '@/stores/useLearningStore';
import { cn } from '@/lib/utils';

interface TopicExerciseProps {
  topicId: string;
  exercises: Exercise[];
  completedExercises: string[];
  onComplete: (exerciseId: string) => void;
  onFinish: () => void;
}

export const TopicExercise: React.FC<TopicExerciseProps> = ({
  topicId,
  exercises,
  completedExercises,
  onComplete,
  onFinish,
}) => {
  const { topicStates, updateExerciseCode, setCurrentExerciseIndex } = useLearningStore();
  const topicState = topicStates[topicId];
  
  const currentExercise = topicState?.currentExerciseIndex || 0;
  const exercise = exercises[currentExercise];
  
  // Get saved code from store, fallback to starter code
  const savedCode = topicState?.exerciseCode[exercise?.id] || exercise?.starterCode || '';
  
  const [code, setCode] = useState(savedCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [validated, setValidated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const isCompleted = completedExercises.includes(exercise?.id);

  // Sync code when exercise changes
  useEffect(() => {
    if (exercise) {
      const savedExerciseCode = topicState?.exerciseCode[exercise.id] || exercise.starterCode;
      setCode(savedExerciseCode);
      setOutput([]);
      setError(null);
      setValidated(null);
      setShowHints(false);
      setShowSolution(false);
      setCurrentHint(0);
    }
  }, [currentExercise, exercise?.id]);

  // Save code to store on change
  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    if (exercise) {
      updateExerciseCode(topicId, exercise.id, newCode);
    }
  };

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);
    setError(null);
    setValidated(null);

    const parser = new Parser();
    
    try {
      const ast = parser.parse(code);
      const outputs: string[] = [];

      const interpreter = new Interpreter({
        onOutput: (text) => {
          outputs.push(String(text));
          setOutput([...outputs]);
        },
        onMemoryUpdate: () => {},
        onLineChange: () => {},
        onInput: async () => '10',
        onError: (err) => {
          setError(err.message);
          setIsRunning(false);
        },
        onComplete: () => setIsRunning(false),
      });

      await interpreter.execute(ast, false);
      setIsRunning(false);
    } catch (err) {
      if (err instanceof AlgoError) {
        setError(err.message);
      } else {
        setError((err as Error).message);
      }
      setIsRunning(false);
    }
  }, [code]);

  const validateCode = useCallback(() => {
    const { type, patterns } = exercise.validation;
    let isValid = false;

    // Normalize code: replace <- with ← for consistent validation
    const normalizedCode = code.replace(/<-/g, '←');

    switch (type) {
      case 'contains':
        isValid = patterns.every(pattern => {
          const normalizedPattern = pattern.replace(/<-/g, '←');
          return normalizedCode.toLowerCase().includes(normalizedPattern.toLowerCase());
        });
        break;
      case 'exact':
        isValid = patterns.some(pattern => {
          const normalizedPattern = pattern.replace(/<-/g, '←');
          return normalizedCode.trim() === normalizedPattern.trim();
        });
        break;
      case 'regex':
        isValid = patterns.every(pattern => new RegExp(pattern, 'i').test(normalizedCode));
        break;
    }

    setValidated(isValid);
    
    if (isValid && !isCompleted) {
      onComplete(exercise.id);
    }
  }, [code, exercise, isCompleted, onComplete]);

  const goToExercise = (index: number) => {
    setCurrentExerciseIndex(topicId, index);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      goToExercise(currentExercise + 1);
    } else {
      onFinish();
    }
  };

  if (!exercise) return null;

  return (
    <div className="space-y-4">
      {/* Exercise Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        {exercises.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => goToExercise(i)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              i === currentExercise
                ? "bg-primary text-primary-foreground"
                : completedExercises.includes(ex.id)
                  ? "bg-success/20 text-success"
                  : "bg-muted hover:bg-muted/80"
            )}
          >
            {completedExercises.includes(ex.id) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
            Exercice {i + 1}
          </button>
        ))}
      </div>

      {/* Exercise Instruction */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="flex items-start gap-3">
          <Code2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-lg mb-1">{exercise.title}</h4>
            <p className="text-sm">{exercise.instruction}</p>
          </div>
        </div>
      </div>

      {/* Hints */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHints(!showHints)}
          className="gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          {showHints ? 'Masquer les indices' : 'Voir les indices'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSolution(!showSolution)}
          className="gap-2"
        >
          {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showSolution ? 'Masquer la solution' : 'Voir la solution'}
        </Button>
      </div>

      {showHints && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span className="font-medium text-amber-600">Indice {currentHint + 1}/{exercise.hints.length}</span>
          </div>
          <p className="text-sm mb-3">{exercise.hints[currentHint]}</p>
          {currentHint < exercise.hints.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentHint(prev => prev + 1)}
              className="text-amber-600"
            >
              Indice suivant <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      )}

      {showSolution && (
        <div className="rounded-lg overflow-hidden border border-success/30 animate-fade-in">
          <div className="bg-success/10 px-4 py-2 border-b border-success/30 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Solution</span>
          </div>
          <pre className="p-4 bg-card overflow-x-auto text-sm font-mono">
            {exercise.solution}
          </pre>
        </div>
      )}

      {/* Editor */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium">Ton code</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={runCode}
              disabled={isRunning}
              className="gap-1"
            >
              <Play className="w-3 h-3" />
              Exécuter
            </Button>
            <Button
              size="sm"
              onClick={validateCode}
              disabled={isRunning}
              className="gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              Valider
            </Button>
          </div>
        </div>
        <Editor
          height="250px"
          defaultLanguage="plaintext"
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 10 },
          }}
        />
      </div>

      {/* Output Console */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b border-border">
          <span className="text-sm font-medium">Console</span>
        </div>
        <div className="bg-card p-4 min-h-[80px] font-mono text-sm">
          {output.length > 0 ? (
            output.map((line, i) => (
              <div key={i} className="text-foreground">{line}</div>
            ))
          ) : error ? (
            <div className="flex items-start gap-2 text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">
              Clique sur "Exécuter" pour voir le résultat...
            </span>
          )}
        </div>
      </div>

      {/* Validation Result */}
      {validated !== null && (
        <div className={cn(
          "p-4 rounded-lg flex items-center gap-3 animate-fade-in",
          validated ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"
        )}>
          {validated ? (
            <>
              <CheckCircle2 className="w-8 h-8 text-success" />
              <div>
                <p className="font-bold text-success">Bravo ! Exercice réussi !</p>
                <p className="text-sm text-muted-foreground">Tu peux passer à l'exercice suivant.</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-8 h-8 text-destructive" />
              <div>
                <p className="font-bold text-destructive">Pas tout à fait...</p>
                <p className="text-sm text-muted-foreground">Vérifie ton code et réessaie. N'hésite pas à consulter les indices !</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end pt-4 border-t border-border">
        <Button onClick={handleNext} className="gap-2">
          {currentExercise < exercises.length - 1 ? 'Exercice suivant' : 'Terminer le sujet'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
