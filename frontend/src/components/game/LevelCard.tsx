import React from 'react';
import { Star, Lock, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Level } from '@/data/gameLevels';
import { LevelProgress } from '@/pages/VariableQuest';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  level: Level;
  index: number;
  isUnlocked: boolean;
  progress?: LevelProgress;
  onClick: () => void;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  index,
  isUnlocked,
  progress,
  onClick,
}) => {
  const isCompleted = progress?.completed;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer group",
        isUnlocked 
          ? "hover:scale-105 hover:shadow-xl" 
          : "opacity-60 cursor-not-allowed",
        isCompleted && "ring-2 ring-success"
      )}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* Background Gradient */}
      <div 
        className={cn(
          "absolute inset-0 opacity-10 bg-gradient-to-br",
          level.color
        )} 
      />

      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      {/* Completed Badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle2 className="w-6 h-6 text-success" />
        </div>
      )}

      <div className="p-6 relative">
        {/* Level Number */}
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4 bg-gradient-to-br",
          level.color
        )}>
          {level.id}
        </div>

        {/* Icon */}
        <div className="text-4xl mb-3">{level.icon}</div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2">{level.title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{level.description}</p>

        {/* Stars */}
        <div className="flex gap-1">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-5 h-5 transition-colors",
                progress?.stars && progress.stars >= star
                  ? "text-amber-400 fill-amber-400"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Hover Effect */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left",
          level.color
        )} />
      </div>
    </Card>
  );
};
