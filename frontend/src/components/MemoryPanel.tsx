import React from 'react';
import { Database, Cpu } from 'lucide-react';
import { Variable } from '@/engine/runtime/interpreter';

interface MemoryPanelProps {
  memory: Map<string, Variable>;
  isRunning: boolean;
}

export const MemoryPanel: React.FC<MemoryPanelProps> = ({ memory, isRunning }) => {
  const formatValue = (value: Variable['value']): string => {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'VRAI' : 'FAUX';
    if (typeof value === 'string') return `"${value}"`;
    if (Array.isArray(value)) {
      return '[' + value.map(v => formatValue(v)).join(', ') + ']';
    }
    return String(value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ENTIER':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'REEL':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'CHAINE':
      case 'CARACTERE':
        return 'bg-success/20 text-success border-success/30';
      case 'BOOLEEN':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'TABLEAU':
      case 'LISTE':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const variables = Array.from(memory.values());

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-border bg-memory">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card/50 border-b border-border">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-accent" />
          <span className="font-semibold text-sm">Mémoire</span>
          {variables.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent">
              {variables.length} var{variables.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {isRunning && (
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-success animate-pulse" />
            <span className="text-xs text-success">En cours</span>
          </div>
        )}
      </div>

      {/* Variables */}
      <div className="flex-1 overflow-auto p-4 scrollbar-thin">
        {variables.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Database className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm text-center">
              Les variables déclarées apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {variables.map((variable) => (
              <div
                key={variable.name}
                className="p-3 rounded-lg bg-card border border-border animate-fade-in hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-semibold text-memory-variable">
                    {variable.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded border ${getTypeColor(
                      variable.type
                    )}`}
                  >
                    {variable.type}
                  </span>
                </div>
                <div className="font-mono text-sm text-memory-value break-all">
                  {formatValue(variable.value)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
