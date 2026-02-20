import React from 'react';
import { BookOpen, Code2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LessonSection } from '@/data/learningTopics';
import { cn } from '@/lib/utils';

interface LessonViewerProps {
  lessons: LessonSection[];
  currentLesson: number;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lessons,
  currentLesson,
  onNext,
  onPrevious,
  onComplete,
}) => {
  const lesson = lessons[currentLesson];
  const isFirst = currentLesson === 0;
  const isLast = currentLesson === lessons.length - 1;

  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Bold
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>');
        // Bullet points
        if (line.startsWith('• ')) {
          return `<li class="ml-4">${line.slice(2)}</li>`;
        }
        return line ? `<p>${line}</p>` : '<br/>';
      })
      .join('');
  };

  const IllustrationBox = () => (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-6">
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-20 h-20 rounded-lg bg-card border-2 border-primary/30 flex items-center justify-center shadow-lg animate-fade-in"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">var{i}</div>
              <div className="font-bold text-primary">{i * 10}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const IllustrationFlow = () => (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl mb-6">
      <div className="flex items-center gap-4">
        <div className="w-24 h-16 rounded-lg bg-card border-2 border-orange-500/50 flex items-center justify-center">
          <span className="text-sm font-medium">Condition</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-sm font-bold">VRAI →</span>
            <div className="w-20 h-10 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center text-xs">Bloc A</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-sm font-bold">FAUX →</span>
            <div className="w-20 h-10 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs">Bloc B</div>
          </div>
        </div>
      </div>
    </div>
  );

  const IllustrationLoop = () => (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl mb-6">
      <div className="relative">
        <div className="w-32 h-16 rounded-lg bg-card border-2 border-purple-500/50 flex items-center justify-center">
          <span className="text-sm font-medium">Instructions</span>
        </div>
        <svg className="absolute -right-12 top-1/2 -translate-y-1/2 w-16 h-24" viewBox="0 0 64 96">
          <path
            d="M8 48 Q 56 48 56 8 Q 56 -16 32 -16 L 8 -16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-purple-500"
            strokeDasharray="4"
          />
          <polygon points="8,44 0,48 8,52" fill="currentColor" className="text-purple-500" />
        </svg>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-purple-500 font-medium">
          Répéter
        </div>
      </div>
    </div>
  );

  const IllustrationArray = () => (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-xl mb-6">
      <div className="flex gap-1">
        {['A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'E'].map((char, i) => (
          <div
            key={i}
            className="w-10 h-12 rounded border-2 border-teal-500/50 bg-card flex flex-col items-center justify-center animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-xs text-muted-foreground">{i + 1}</span>
            <span className="font-bold text-teal-600">{char}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIllustration = () => {
    switch (lesson.illustration) {
      case 'box': return <IllustrationBox />;
      case 'flow': return <IllustrationFlow />;
      case 'loop': return <IllustrationLoop />;
      case 'array': return <IllustrationArray />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {lessons.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= currentLesson ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Lesson Content */}
      <div className="min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold">{lesson.title}</h3>
        </div>

        {lesson.illustration && renderIllustration()}

        <div
          className="prose prose-sm max-w-none text-foreground space-y-3"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
        />

        {lesson.code && (
          <div className="mt-6 rounded-lg overflow-hidden border border-border">
            <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Exemple de code</span>
            </div>
            <pre className="p-4 bg-card overflow-x-auto">
              <code className="text-sm font-mono">
                {lesson.code.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-muted-foreground text-right mr-4 select-none">{i + 1}</span>
                    <span className={cn(
                      line.includes('//') && "text-muted-foreground italic"
                    )}>{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Précédent
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentLesson + 1} / {lessons.length}
        </span>

        {isLast ? (
          <Button onClick={onComplete} className="gap-2">
            <Lightbulb className="w-4 h-4" />
            Passer au quiz
          </Button>
        ) : (
          <Button onClick={onNext}>
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
};
