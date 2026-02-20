import React, { useState, useEffect } from 'react';
import { ArrowRight, Box, Tag, Download, RefreshCw, Keyboard, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExplanationPanelProps {
  explanation: {
    title: string;
    content: string[];
    animation?: string;
  };
  onContinue: () => void;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  explanation,
  onContinue,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!showAll && currentLine < explanation.content.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, explanation.content.length, showAll]);

  const getAnimationIcon = () => {
    switch (explanation.animation) {
      case 'box': return <Box className="w-16 h-16 text-primary" />;
      case 'types': return <Tag className="w-16 h-16 text-primary" />;
      case 'assignment': return <Download className="w-16 h-16 text-primary" />;
      case 'modify': return <RefreshCw className="w-16 h-16 text-primary" />;
      case 'input': return <Keyboard className="w-16 h-16 text-primary" />;
      case 'final': return <Trophy className="w-16 h-16 text-primary" />;
      default: return <Box className="w-16 h-16 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Animation/Icon */}
      <div className="flex justify-center">
        <div className="p-6 rounded-2xl bg-primary/10 animate-pulse">
          {getAnimationIcon()}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-center">{explanation.title}</h3>

      {/* Content */}
      <div className="space-y-4 min-h-[200px]">
        {explanation.content.map((line, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg bg-muted/50 transition-all duration-500",
              index <= currentLine || showAll
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: showAll ? '0ms' : `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-foreground">{line}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="ghost"
          onClick={() => setShowAll(true)}
          className={cn(showAll && "invisible")}
        >
          Tout afficher
        </Button>
        <Button onClick={onContinue} className="gap-2">
          J'ai compris !
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
