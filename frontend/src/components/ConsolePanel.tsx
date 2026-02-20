import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2, ChevronDown } from 'lucide-react';

export interface ConsoleMessage {
  id: string;
  type: 'output' | 'error' | 'warning' | 'info' | 'input';
  content: string;
  timestamp: Date;
  line?: number;
}

interface ConsolePanelProps {
  messages: ConsoleMessage[];
  onClear: () => void;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({ messages, onClear }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageStyle = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return 'text-console-error';
      case 'warning':
        return 'text-console-warning';
      case 'input':
        return 'text-accent';
      case 'info':
        return 'text-muted-foreground';
      default:
        return 'text-console-foreground';
    }
  };

  const getMessageIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'input':
        return '📥';
      case 'info':
        return 'ℹ️';
      default:
        return '▸';
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-border bg-console">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card/50 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-secondary" />
          <span className="font-semibold text-sm">Console</span>
          {messages.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary">
              {messages.length}
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          title="Effacer la console"
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 console-output scrollbar-thin"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ChevronDown className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">La sortie du programme apparaîtra ici</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 animate-fade-in ${getMessageStyle(msg.type)}`}
              >
                <span className="select-none">{getMessageIcon(msg.type)}</span>
                <div className="flex-1">
                  {msg.line && (
                    <span className="text-muted-foreground text-xs mr-2">
                      [L{msg.line}]
                    </span>
                  )}
                  <span className="whitespace-pre-wrap break-all">{msg.content}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
