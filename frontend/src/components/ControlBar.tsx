import React from 'react';
import { Play, Pause, Square, SkipForward, RotateCcw, Zap } from 'lucide-react';

interface ControlBarProps {
  isRunning: boolean;
  isPaused: boolean;
  stepMode: boolean;
  onRun: () => void;
  onRunStepByStep: () => void;
  onStep: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isRunning,
  isPaused,
  stepMode,
  onRun,
  onRunStepByStep,
  onStep,
  onPause,
  onResume,
  onStop,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-card/80 backdrop-blur-lg border-b border-border">
      {/* Run button */}
      {!isRunning ? (
        <button
          onClick={onRun}
          className="control-button-primary flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          <span>Exécuter</span>
        </button>
      ) : isPaused ? (
        <button
          onClick={onResume}
          className="control-button-primary flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          <span>Reprendre</span>
        </button>
      ) : (
        <button
          onClick={onPause}
          className="control-button-secondary flex items-center gap-2"
        >
          <Pause className="w-4 h-4" />
          <span>Pause</span>
        </button>
      )}

      {/* Step by step button */}
      {!isRunning ? (
        <button
          onClick={onRunStepByStep}
          className="control-button-accent flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          <span>Pas à pas</span>
        </button>
      ) : stepMode && (
        <button
          onClick={onStep}
          className="control-button-accent flex items-center gap-2"
          disabled={!isPaused}
        >
          <SkipForward className="w-4 h-4" />
          <span>Étape suivante</span>
        </button>
      )}

      {/* Stop button */}
      {isRunning && (
        <button
          onClick={onStop}
          className="control-button-destructive flex items-center gap-2"
        >
          <Square className="w-4 h-4" />
          <span>Arrêter</span>
        </button>
      )}

      {/* Reset button */}
      <button
        onClick={onReset}
        className="control-button bg-muted text-foreground hover:bg-muted/80 flex items-center gap-2 ml-auto"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Réinitialiser</span>
      </button>
    </div>
  );
};
