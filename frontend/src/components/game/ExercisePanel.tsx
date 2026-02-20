import React, { useState, useCallback } from 'react';
import { Play, CheckCircle2, XCircle, SkipForward, Code2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Editor from '@monaco-editor/react';
import { Parser } from '@/engine/parser/parser';
import { Interpreter } from '@/engine/runtime/interpreter';
import { AlgoError } from '@/engine/errors/errorHandler';
import { cn } from '@/lib/utils';

interface ExercisePanelProps {
  exercise: {
    instruction: string;
    starterCode: string;
    expectedOutput?: string;
    validation: {
      type: 'contains' | 'exact' | 'regex';
      patterns: string[];
    };
  };
  onComplete: () => void;
  onSkip: () => void;
}

export const ExercisePanel: React.FC<ExercisePanelProps> = ({
  exercise,
  onComplete,
  onSkip,
}) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [validated, setValidated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          outputs.push(text);
          setOutput([...outputs]);
        },
        onMemoryUpdate: () => {},
        onLineChange: () => {},
        onInput: async () => {
          return '10'; // Default input for exercises
        },
        onError: (err) => {
          setError(err.message);
          setIsRunning(false);
        },
        onComplete: () => {
          setIsRunning(false);
        },
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
    
    if (isValid) {
      setTimeout(onComplete, 1500);
    }
  }, [code, exercise.validation, onComplete]);

  return (
    <div className="space-y-4">
      {/* Instruction */}
      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
        <div className="flex items-start gap-3">
          <Code2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-primary mb-1">Exercice pratique</h4>
            <p className="text-sm">{exercise.instruction}</p>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium">Éditeur</span>
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
          onChange={(value) => setCode(value || '')}
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
          "p-4 rounded-lg flex items-center gap-3",
          validated ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          {validated ? (
            <>
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <p className="font-semibold">Bravo ! Ton code est correct !</p>
                <p className="text-sm opacity-80">Tu passes à l'étape suivante...</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6" />
              <div>
                <p className="font-semibold">Pas tout à fait...</p>
                <p className="text-sm opacity-80">Vérifie que tu as bien suivi l'instruction.</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Skip Option */}
      <div className="flex justify-end pt-2">
        <Button variant="ghost" onClick={onSkip} className="gap-2 text-muted-foreground">
          <SkipForward className="w-4 h-4" />
          Passer l'exercice
        </Button>
      </div>
    </div>
  );
};
