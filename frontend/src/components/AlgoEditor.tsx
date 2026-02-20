import React, { useRef } from 'react';
import Editor, { OnMount, Monaco } from '@monaco-editor/react';

interface AlgoEditorProps {
  code: string;
  onChange: (value: string) => void;
  currentLine?: number;
  errorLine?: number;
}

// Define custom theme for French algorithm language
const defineTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme('algo-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'c792ea', fontStyle: 'bold' },
      { token: 'type', foreground: 'ffcb6b' },
      { token: 'string', foreground: 'c3e88d' },
      { token: 'number', foreground: 'f78c6c' },
      { token: 'comment', foreground: '676e95', fontStyle: 'italic' },
      { token: 'operator', foreground: '89ddff' },
      { token: 'identifier', foreground: 'eeffff' },
      { token: 'function', foreground: '82aaff' },
    ],
    colors: {
      'editor.background': '#1a1f36',
      'editor.foreground': '#d6deeb',
      'editor.lineHighlightBackground': '#2d3555',
      'editor.selectionBackground': '#4c5882',
      'editorCursor.foreground': '#80cbc4',
      'editorLineNumber.foreground': '#4b5263',
      'editorLineNumber.activeForeground': '#80cbc4',
      'editor.selectionHighlightBackground': '#3d4665',
    },
  });
};

// Register French algorithm language
const registerLanguage = (monaco: Monaco) => {
  monaco.languages.register({ id: 'algo-fr' });

  monaco.languages.setMonarchTokensProvider('algo-fr', {
    keywords: [
      'ALGORITHME', 'VARIABLES', 'DEBUT', 'FIN',
      'SI', 'ALORS', 'SINON', 'FINSI',
      'TANT', 'QUE', 'FAIRE', 'FIN TANT QUE',
      'POUR', 'A', 'FINPOUR', 'PAS',
      'FONCTION', 'RETOURNER', 'FINFONCTION',
      'ET', 'OU', 'NON',
      'MOD', 'DIV',
      'AFFICHER', 'LIRE',
    ],
    typeKeywords: [
      'ENTIER', 'REEL', 'BOOLEEN', 'CHAINE', 'CARACTERE', 'TABLEAU', 'LISTE',
    ],
    booleans: ['VRAI', 'FAUX'],
    operators: [
      '←', '<-', '+', '-', '*', '/', '^',
      '=', '<', '>', '<=', '>=', '<>', '!=',
    ],
    symbols: /[=><!~?:&|+\-*\/\^%←]+/,

    tokenizer: {
      root: [
        // Comments
        [/\/\/.*$/, 'comment'],
        
        // Identifiers and keywords
        [/[a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*/, {
          cases: {
            '@keywords': 'keyword',
            '@typeKeywords': 'type',
            '@booleans': 'number',
            '@default': 'identifier',
          },
        }],

        // Numbers
        [/\d+\.\d+/, 'number.float'],
        [/\d+/, 'number'],

        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string'],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/'/, 'string', '@stringSingle'],

        // Operators
        [/←/, 'operator'],
        [/<-/, 'operator'],
        [/@symbols/, 'operator'],

        // Delimiters
        [/[{}()\[\]]/, '@brackets'],
        [/[,:]/, 'delimiter'],
      ],
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, 'string', '@pop'],
      ],
      stringSingle: [
        [/[^\\']+/, 'string'],
        [/\\./, 'string.escape'],
        [/'/, 'string', '@pop'],
      ],
    },
  });

  // Auto-completion
  monaco.languages.registerCompletionItemProvider('algo-fr', {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        // Structure keywords
        { label: 'ALGORITHME', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'ALGORITHME ${1:NomAlgo}\nVARIABLES\n    ${2:x} : ${3:ENTIER}\nDEBUT\n    $0\nFIN', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        { label: 'SI', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'SI ${1:condition} ALORS\n    $0\nFINSI', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        { label: 'SI...SINON', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'SI ${1:condition} ALORS\n    ${2:instructions}\nSINON\n    $0\nFINSI', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        { label: 'TANT QUE', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'TANT QUE ${1:condition} FAIRE\n    $0\nFIN TANT QUE', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        { label: 'POUR', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'POUR ${1:i} ← ${2:1} A ${3:10} FAIRE\n    $0\nFINPOUR', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        { label: 'FONCTION', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'FONCTION ${1:NomFonction}(${2:params}) : ${3:ENTIER}\nDEBUT\n    $0\n    RETOURNER ${4:resultat}\nFINFONCTION', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        
        // I/O
        { label: 'AFFICHER', kind: monaco.languages.CompletionItemKind.Function, insertText: 'AFFICHER(${1:expression})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        { label: 'LIRE', kind: monaco.languages.CompletionItemKind.Function, insertText: 'LIRE(${1:variable})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
        
        // Types
        { label: 'ENTIER', kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: 'ENTIER', range },
        { label: 'REEL', kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: 'REEL', range },
        { label: 'CHAINE', kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: 'CHAINE', range },
        { label: 'BOOLEEN', kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: 'BOOLEEN', range },
        { label: 'TABLEAU', kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: 'TABLEAU', range },
        
        // Booleans
        { label: 'VRAI', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'VRAI', range },
        { label: 'FAUX', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'FAUX', range },
      ];

      return { suggestions };
    },
  });
};

export const AlgoEditor: React.FC<AlgoEditorProps> = ({
  code,
  onChange,
  currentLine,
  errorLine,
}) => {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    defineTheme(monaco);
    registerLanguage(monaco);
    editor.updateOptions({ theme: 'algo-dark' });
  };

  // Update decorations when current or error line changes
  React.useEffect(() => {
    if (!editorRef.current) return;

    const newDecorations: {
      range: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number };
      options: { isWholeLine: boolean; className: string; glyphMarginClassName: string };
    }[] = [];

    if (currentLine && currentLine > 0) {
      newDecorations.push({
        range: {
          startLineNumber: currentLine,
          startColumn: 1,
          endLineNumber: currentLine,
          endColumn: 1,
        },
        options: {
          isWholeLine: true,
          className: 'current-line-highlight',
          glyphMarginClassName: 'current-line-glyph',
        },
      });
    }

    if (errorLine && errorLine > 0) {
      newDecorations.push({
        range: {
          startLineNumber: errorLine,
          startColumn: 1,
          endLineNumber: errorLine,
          endColumn: 1,
        },
        options: {
          isWholeLine: true,
          className: 'error-line-highlight',
          glyphMarginClassName: 'error-line-glyph',
        },
      });
    }

    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );
  }, [currentLine, errorLine]);

  return (
    <div className="editor-container h-full">
      <Editor
        height="100%"
        defaultLanguage="algo-fr"
        value={code}
        onChange={(value) => onChange(value || '')}
        onMount={handleEditorMount}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          glyphMargin: true,
          folding: true,
          lineDecorationsWidth: 10,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
        }}
      />
      <style>{`
        .current-line-highlight {
          background: rgba(128, 203, 196, 0.15) !important;
          border-left: 3px solid #80cbc4 !important;
        }
        .current-line-glyph {
          background: #80cbc4;
          border-radius: 50%;
          margin-left: 5px;
          width: 8px !important;
          height: 8px !important;
        }
        .error-line-highlight {
          background: rgba(255, 82, 82, 0.2) !important;
          border-left: 3px solid #ff5252 !important;
        }
        .error-line-glyph {
          background: #ff5252;
          border-radius: 50%;
          margin-left: 5px;
          width: 8px !important;
          height: 8px !important;
        }
      `}</style>
    </div>
  );
};
