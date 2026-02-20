import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlgoEditor } from '@/components/AlgoEditor';
import { ConsolePanel, ConsoleMessage } from '@/components/ConsolePanel';
import { MemoryPanel } from '@/components/MemoryPanel';
import { ControlBar } from '@/components/ControlBar';
import { InputDialog } from '@/components/InputDialog';
import { Parser } from '@/engine/parser/parser';
import { Interpreter, Variable } from '@/engine/runtime/interpreter';
import { AlgoError, formatError, createErrorMessage } from '@/engine/errors/errorHandler';
import { Code2, BookOpen, Sparkles, Gamepad2 } from 'lucide-react';

const DEFAULT_CODE = `ALGORITHME CalculSomme
VARIABLES
    n : ENTIER
    i : ENTIER
    somme : ENTIER
DEBUT
    // Calculer la somme des nombres de 1 à n
    AFFICHER("Entrez un nombre:")
    LIRE(n)
    
    somme ← 0
    POUR i ← 1 A n FAIRE
        somme ← somme + i
    FINPOUR
    
    AFFICHER("La somme de 1 à", n, "est:", somme)
FIN`;

const Index = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const [memory, setMemory] = useState<Map<string, Variable>>(new Map());
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stepMode, setStepMode] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | undefined>();
  const [errorLine, setErrorLine] = useState<number | undefined>();
  const [inputRequest, setInputRequest] = useState<{ variableName: string; resolve: (value: string) => void } | null>(null);

  const interpreterRef = useRef<Interpreter | null>(null);
  const stepResolveRef = useRef<(() => void) | null>(null);

  const addMessage = useCallback((type: ConsoleMessage['type'], content: string, line?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { id, type, content, timestamp: new Date(), line }]);
  }, []);

  const clearConsole = useCallback(() => {
    setMessages([]);
  }, []);

  const handleRun = useCallback(async (isStepMode: boolean = false) => {
    clearConsole();
    setMemory(new Map());
    setErrorLine(undefined);
    setCurrentLine(undefined);
    setStepMode(isStepMode);
    setIsRunning(true);
    setIsPaused(isStepMode);

    const parser = new Parser();
    
    try {
      addMessage('info', '🚀 Analyse du programme...');
      const ast = parser.parse(code);
      addMessage('info', `✓ Programme "${ast.name}" analysé avec succès`);
      addMessage('info', '▶ Début de l\'exécution...');

      const interpreter = new Interpreter({
        onOutput: (text) => addMessage('output', text),
        onMemoryUpdate: (mem) => setMemory(new Map(mem)),
        onLineChange: (line) => setCurrentLine(line),
        onInput: async (variableName) => {
          return new Promise<string>((resolve) => {
            setInputRequest({ variableName, resolve });
          });
        },
        onStep: isStepMode ? async () => {
          setIsPaused(true);
          await new Promise<void>((resolve) => {
            stepResolveRef.current = resolve;
          });
        } : undefined,
        onError: (error) => {
          const info = formatError(error);
          addMessage('error', createErrorMessage(info), info.line);
          setErrorLine(info.line);
        },
        onComplete: () => {
          addMessage('info', '✓ Exécution terminée');
          setIsRunning(false);
          setIsPaused(false);
          setCurrentLine(undefined);
        },
      });

      interpreterRef.current = interpreter;
      await interpreter.execute(ast, isStepMode);
    } catch (error) {
      if (error instanceof AlgoError) {
        const info = formatError(error);
        addMessage('error', createErrorMessage(info), info.line);
        setErrorLine(info.line);
      } else {
        addMessage('error', `Erreur: ${(error as Error).message}`);
      }
      setIsRunning(false);
      setIsPaused(false);
    }
  }, [code, addMessage, clearConsole]);

  const handleStep = useCallback(() => {
    if (stepResolveRef.current) {
      const resolve = stepResolveRef.current;
      stepResolveRef.current = null;
      setIsPaused(false);
      resolve();
    }
  }, []);

  const handlePause = useCallback(() => {
    if (interpreterRef.current) {
      interpreterRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const handleResume = useCallback(() => {
    if (interpreterRef.current) {
      interpreterRef.current.resume();
      setIsPaused(false);
    }
    // Also handle step mode resume
    if (stepResolveRef.current) {
      handleStep();
    }
  }, [handleStep]);

  const handleStop = useCallback(() => {
    if (interpreterRef.current) {
      interpreterRef.current.stop();
    }
    setIsRunning(false);
    setIsPaused(false);
    setCurrentLine(undefined);
    addMessage('warning', '⏹ Exécution arrêtée par l\'utilisateur');
  }, [addMessage]);

  const handleReset = useCallback(() => {
    handleStop();
    clearConsole();
    setMemory(new Map());
    setErrorLine(undefined);
    setCode(DEFAULT_CODE);
  }, [handleStop, clearConsole]);

  const handleInputSubmit = useCallback((value: string) => {
    if (inputRequest) {
      addMessage('input', `Entrée: ${value}`);
      inputRequest.resolve(value);
      setInputRequest(null);
    }
  }, [inputRequest, addMessage]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">VsAlgo</h1>
              <p className="text-xs text-muted-foreground">
                Apprends l'algorithmique en français
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/learning"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-colors font-medium"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Apprentissage</span>
            </Link>
            <Link
              to="/variable-quest"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 transition-colors font-medium"
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Variable Quest</span>
            </Link>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Control Bar */}
      <ControlBar
        isRunning={isRunning}
        isPaused={isPaused}
        stepMode={stepMode}
        onRun={() => handleRun(false)}
        onRunStepByStep={() => handleRun(true)}
        onStep={handleStep}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onReset={handleReset}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-hidden">
        <div className="h-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Editor */}
          <div className="lg:col-span-2 h-[calc(100vh-220px)] min-h-[400px]">
            <AlgoEditor
              code={code}
              onChange={setCode}
              currentLine={currentLine}
              errorLine={errorLine}
            />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4 h-[calc(100vh-220px)] min-h-[400px]">
            {/* Memory Panel */}
            <div className="flex-1 min-h-0">
              <MemoryPanel memory={memory} isRunning={isRunning} />
            </div>

            {/* Console Panel */}
            <div className="flex-1 min-h-0">
              <ConsolePanel messages={messages} onClear={clearConsole} />
            </div>
          </div>
        </div>
      </main>

      {/* Input Dialog */}
      <InputDialog
        isOpen={inputRequest !== null}
        variableName={inputRequest?.variableName || ''}
        onSubmit={handleInputSubmit}
      />
    </div>
  );
};

export default Index;
