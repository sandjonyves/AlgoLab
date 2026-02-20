import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MissionPanelProps {
  mission: {
    type: 'select' | 'drag-drop' | 'fill-blank' | 'match';
    instruction: string;
    items?: { id: string; text: string; isVariable: boolean }[];
    pairs?: { left: string; right: string }[];
    blanks?: { text: string; answer: string }[];
  };
  onComplete: (score: number) => void;
}

export const MissionPanel: React.FC<MissionPanelProps> = ({ mission, onComplete }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [blanks, setBlanks] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (showResult) return;
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleMatchSelect = (left: string, right: string) => {
    if (showResult) return;
    setMatches(prev => ({ ...prev, [left]: right }));
  };

  const handleBlankChange = (index: number, value: string) => {
    if (showResult) return;
    setBlanks(prev => ({ ...prev, [index]: value }));
  };

  const validateSelection = () => {
    const correct = mission.items?.filter(item => item.isVariable).map(item => item.id) || [];
    const selectedArray = Array.from(selected);
    const isValid = 
      correct.length === selectedArray.length &&
      correct.every(id => selected.has(id));
    setIsCorrect(isValid);
    setShowResult(true);
  };

  const validateMatches = () => {
    const pairs = mission.pairs || [];
    const isValid = pairs.every(pair => matches[pair.left] === pair.right);
    setIsCorrect(isValid);
    setShowResult(true);
  };

  const validateBlanks = () => {
    const blankAnswers = mission.blanks || [];
    const isValid = blankAnswers.every(
      (blank, index) => blanks[index]?.toLowerCase().trim() === blank.answer.toLowerCase()
    );
    setIsCorrect(isValid);
    setShowResult(true);
  };

  const handleValidate = () => {
    switch (mission.type) {
      case 'select':
        validateSelection();
        break;
      case 'match':
        validateMatches();
        break;
      case 'fill-blank':
      case 'drag-drop':
        validateBlanks();
        break;
    }
  };

  const handleContinue = () => {
    onComplete(isCorrect ? 3 : 1);
  };

  const renderSelectMission = () => (
    <div className="grid grid-cols-2 gap-3">
      {mission.items?.map(item => (
        <button
          key={item.id}
          onClick={() => handleSelect(item.id)}
          disabled={showResult}
          className={cn(
            "p-4 rounded-lg border-2 text-left transition-all",
            selected.has(item.id)
              ? showResult
                ? item.isVariable
                  ? "border-success bg-success/10"
                  : "border-destructive bg-destructive/10"
                : "border-primary bg-primary/10"
              : showResult && item.isVariable
                ? "border-success/50 bg-success/5"
                : "border-border hover:border-primary/50"
          )}
        >
          <span className="font-medium">{item.text}</span>
          {showResult && (
            <span className="ml-2">
              {item.isVariable ? (
                <CheckCircle2 className="w-4 h-4 inline text-success" />
              ) : selected.has(item.id) ? (
                <XCircle className="w-4 h-4 inline text-destructive" />
              ) : null}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  const renderMatchMission = () => {
    const rightOptions = mission.pairs?.map(p => p.right) || [];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-3">
            {mission.pairs?.map(pair => (
              <button
                key={pair.left}
                onClick={() => !showResult && setSelectedLeft(pair.left)}
                className={cn(
                  "w-full p-3 rounded-lg border-2 text-center font-mono transition-all",
                  selectedLeft === pair.left
                    ? "border-primary bg-primary/10"
                    : matches[pair.left]
                      ? showResult
                        ? matches[pair.left] === pair.right
                          ? "border-success bg-success/10"
                          : "border-destructive bg-destructive/10"
                        : "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/50"
                )}
              >
                {pair.left}
                {matches[pair.left] && (
                  <span className="ml-2 text-muted-foreground">
                    → {matches[pair.left]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-3">
            {rightOptions.map(right => (
              <button
                key={right}
                onClick={() => {
                  if (!showResult && selectedLeft) {
                    handleMatchSelect(selectedLeft, right);
                    setSelectedLeft(null);
                  }
                }}
                disabled={!selectedLeft || showResult}
                className={cn(
                  "w-full p-3 rounded-lg border-2 text-center transition-all",
                  "border-border",
                  selectedLeft && !showResult && "hover:border-primary hover:bg-primary/5"
                )}
              >
                {right}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFillBlankMission = () => (
    <div className="space-y-4">
      {mission.blanks?.map((blank, index) => (
        <div key={index} className="flex items-center gap-3">
          <code className="flex-1 p-3 rounded-lg bg-muted font-mono">
            {blank.text.replace('___', '')}
            <input
              type="text"
              value={blanks[index] || ''}
              onChange={(e) => handleBlankChange(index, e.target.value)}
              disabled={showResult}
              className={cn(
                "w-20 mx-1 px-2 py-1 rounded border-2 bg-background text-center",
                showResult
                  ? blanks[index]?.toLowerCase().trim() === blank.answer.toLowerCase()
                    ? "border-success"
                    : "border-destructive"
                  : "border-primary"
              )}
              placeholder="?"
            />
          </code>
          {showResult && (
            <span className="text-sm">
              {blanks[index]?.toLowerCase().trim() === blank.answer.toLowerCase() ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <span className="text-destructive">
                  Réponse : <strong>{blank.answer}</strong>
                </span>
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <p className="text-lg font-medium text-center">{mission.instruction}</p>

      {/* Mission Content */}
      <div className="min-h-[200px]">
        {mission.type === 'select' && renderSelectMission()}
        {mission.type === 'match' && renderMatchMission()}
        {(mission.type === 'fill-blank' || mission.type === 'drag-drop') && renderFillBlankMission()}
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className={cn(
          "p-4 rounded-lg text-center",
          isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          {isCorrect ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Excellent ! C'est correct !</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Pas tout à fait... Regarde les corrections.</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end pt-4">
        {!showResult ? (
          <Button onClick={handleValidate} className="gap-2">
            Valider
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleContinue} className="gap-2">
            Continuer
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
