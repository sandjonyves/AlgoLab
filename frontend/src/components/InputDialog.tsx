import React, { useState, useEffect, useRef } from 'react';
import { Keyboard } from 'lucide-react';

interface InputDialogProps {
  isOpen: boolean;
  variableName: string;
  onSubmit: (value: string) => void;
}

export const InputDialog: React.FC<InputDialogProps> = ({
  isOpen,
  variableName,
  onSubmit,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setValue('');
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md mx-4 p-6 bg-card rounded-2xl border border-border shadow-2xl animate-slide-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Keyboard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Entrée requise</h3>
            <p className="text-sm text-muted-foreground">
              LIRE({variableName})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">
            Entrez une valeur pour <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-primary">{variableName}</code>
          </label>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono transition-all"
            placeholder="Entrez votre valeur..."
            autoFocus
          />
          <button
            type="submit"
            className="w-full mt-4 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};
