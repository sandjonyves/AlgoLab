// Lexer/Tokenizer for French Algorithm Language

export type TokenType =
  | 'KEYWORD'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'STRING'
  | 'OPERATOR'
  | 'ASSIGNMENT'
  | 'COMPARISON'
  | 'LOGICAL'
  | 'PUNCTUATION'
  | 'COLON'
  | 'COMMA'
  | 'LPAREN'
  | 'RPAREN'
  | 'LBRACKET'
  | 'RBRACKET'
  | 'NEWLINE'
  | 'EOF'
  | 'COMMENT';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

const KEYWORDS = new Set([
  'ALGORITHME', 'VARIABLES', 'DEBUT', 'FIN',
  'SI', 'ALORS', 'SINON', 'FINSI',
  'TANT', 'QUE', 'FAIRE', 'FIN TANT QUE',
  'POUR', 'A', 'FINPOUR', 'PAS',
  'FONCTION', 'RETOURNER', 'FINFONCTION',
  'ENTIER', 'REEL', 'BOOLEEN', 'CHAINE', 'CARACTERE', 'TABLEAU', 'LISTE',
  'VRAI', 'FAUX',
  'ET', 'OU', 'NON',
  'MOD', 'DIV',
  'AFFICHER', 'LIRE'
]);

const OPERATORS = new Set(['+', '-', '*', '/', '^']);
const COMPARISONS = new Set(['=', '<', '>', '<=', '>=', '<>', '!=']);

export class Lexer {
  private source: string;
  private pos: number = 0;
  private line: number = 1;
  private column: number = 1;
  private tokens: Token[] = [];

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    this.tokens = [];
    this.pos = 0;
    this.line = 1;
    this.column = 1;

    while (this.pos < this.source.length) {
      this.skipWhitespace();
      if (this.pos >= this.source.length) break;

      const char = this.current();

      // Skip comments
      if (char === '/' && this.peek() === '/') {
        this.skipLineComment();
        continue;
      }

      // Newlines
      if (char === '\n') {
        this.tokens.push({ type: 'NEWLINE', value: '\n', line: this.line, column: this.column });
        this.advance();
        this.line++;
        this.column = 1;
        continue;
      }

      // Assignment arrow ←
      if (char === '←' || (char === '<' && this.peek() === '-')) {
        const startCol = this.column;
        if (char === '←') {
          this.advance();
        } else {
          this.advance();
          this.advance();
        }
        this.tokens.push({ type: 'ASSIGNMENT', value: '←', line: this.line, column: startCol });
        continue;
      }

      // Comparison operators (must check before single char operators)
      if (this.isComparisonStart(char)) {
        const token = this.readComparison();
        if (token) {
          this.tokens.push(token);
          continue;
        }
      }

      // Numbers
      if (this.isDigit(char)) {
        this.tokens.push(this.readNumber());
        continue;
      }

      // Strings
      if (char === '"' || char === "'") {
        this.tokens.push(this.readString(char));
        continue;
      }

      // Identifiers and Keywords
      if (this.isAlpha(char)) {
        this.tokens.push(this.readIdentifier());
        continue;
      }

      // Operators
      if (OPERATORS.has(char)) {
        this.tokens.push({ type: 'OPERATOR', value: char, line: this.line, column: this.column });
        this.advance();
        continue;
      }

      // Punctuation
      if (char === ':') {
        this.tokens.push({ type: 'COLON', value: ':', line: this.line, column: this.column });
        this.advance();
        continue;
      }

      if (char === ',') {
        this.tokens.push({ type: 'COMMA', value: ',', line: this.line, column: this.column });
        this.advance();
        continue;
      }

      if (char === '(') {
        this.tokens.push({ type: 'LPAREN', value: '(', line: this.line, column: this.column });
        this.advance();
        continue;
      }

      if (char === ')') {
        this.tokens.push({ type: 'RPAREN', value: ')', line: this.line, column: this.column });
        this.advance();
        continue;
      }

      if (char === '[') {
        this.tokens.push({ type: 'LBRACKET', value: '[', line: this.line, column: this.column });
        this.advance();
        continue;
      }

      if (char === ']') {
        this.tokens.push({ type: 'RBRACKET', value: ']', line: this.line, column: this.column });
        this.advance();
        continue;
      }

      // Skip carriage return
      if (char === '\r') {
        this.advance();
        continue;
      }

      // Unknown character - skip it
      this.advance();
    }

    this.tokens.push({ type: 'EOF', value: '', line: this.line, column: this.column });
    return this.tokens;
  }

  private current(): string {
    return this.source[this.pos];
  }

  private peek(offset: number = 1): string {
    return this.source[this.pos + offset] || '';
  }

  private advance(): string {
    const char = this.source[this.pos];
    this.pos++;
    this.column++;
    return char;
  }

  private skipWhitespace(): void {
    while (this.pos < this.source.length) {
      const char = this.current();
      if (char === ' ' || char === '\t' || char === '\r') {
        this.advance();
      } else {
        break;
      }
    }
  }

  private skipLineComment(): void {
    while (this.pos < this.source.length && this.current() !== '\n') {
      this.advance();
    }
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isAlpha(char: string): boolean {
    return /[a-zA-ZÀ-ÿ_]/.test(char);
  }

  private isAlphaNumeric(char: string): boolean {
    return /[a-zA-ZÀ-ÿ0-9_]/.test(char);
  }

  private isComparisonStart(char: string): boolean {
    return char === '<' || char === '>' || char === '=' || char === '!';
  }

  private readNumber(): Token {
    const startCol = this.column;
    let value = '';
    
    while (this.pos < this.source.length && this.isDigit(this.current())) {
      value += this.advance();
    }

    // Check for decimal
    if (this.current() === '.' && this.isDigit(this.peek())) {
      value += this.advance(); // .
      while (this.pos < this.source.length && this.isDigit(this.current())) {
        value += this.advance();
      }
    }

    return { type: 'NUMBER', value, line: this.line, column: startCol };
  }

  private readString(quote: string): Token {
    const startCol = this.column;
    this.advance(); // Skip opening quote
    let value = '';

    while (this.pos < this.source.length && this.current() !== quote) {
      if (this.current() === '\\') {
        this.advance();
        const escaped = this.advance();
        switch (escaped) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case '\\': value += '\\'; break;
          case '"': value += '"'; break;
          case "'": value += "'"; break;
          default: value += escaped;
        }
      } else {
        value += this.advance();
      }
    }

    if (this.pos < this.source.length) {
      this.advance(); // Skip closing quote
    }

    return { type: 'STRING', value, line: this.line, column: startCol };
  }

  private readIdentifier(): Token {
    const startCol = this.column;
    let value = '';

    while (this.pos < this.source.length && this.isAlphaNumeric(this.current())) {
      value += this.advance();
    }

    // Check for "FIN TANT QUE" special case
    if (value.toUpperCase() === 'FIN') {
      this.skipWhitespace();
      const savedPos = this.pos;
      const savedCol = this.column;
      let nextWord = '';
      while (this.pos < this.source.length && this.isAlphaNumeric(this.current())) {
        nextWord += this.advance();
      }
      if (nextWord.toUpperCase() === 'TANT') {
        this.skipWhitespace();
        let queWord = '';
        while (this.pos < this.source.length && this.isAlphaNumeric(this.current())) {
          queWord += this.advance();
        }
        if (queWord.toUpperCase() === 'QUE') {
          return { type: 'KEYWORD', value: 'FIN TANT QUE', line: this.line, column: startCol };
        }
      }
      // Restore position if not "FIN TANT QUE"
      this.pos = savedPos;
      this.column = savedCol;
    }

    const upperValue = value.toUpperCase();
    const type: TokenType = KEYWORDS.has(upperValue) ? 'KEYWORD' : 'IDENTIFIER';
    
    return { type, value: type === 'KEYWORD' ? upperValue : value, line: this.line, column: startCol };
  }

  private readComparison(): Token | null {
    const startCol = this.column;
    const char = this.current();
    
    if (char === '<') {
      this.advance();
      if (this.current() === '=') {
        this.advance();
        return { type: 'COMPARISON', value: '<=', line: this.line, column: startCol };
      }
      if (this.current() === '>') {
        this.advance();
        return { type: 'COMPARISON', value: '<>', line: this.line, column: startCol };
      }
      if (this.current() === '-') {
        // This is assignment, handled separately
        this.pos--;
        this.column--;
        return null;
      }
      return { type: 'COMPARISON', value: '<', line: this.line, column: startCol };
    }

    if (char === '>') {
      this.advance();
      if (this.current() === '=') {
        this.advance();
        return { type: 'COMPARISON', value: '>=', line: this.line, column: startCol };
      }
      return { type: 'COMPARISON', value: '>', line: this.line, column: startCol };
    }

    if (char === '=') {
      this.advance();
      return { type: 'COMPARISON', value: '=', line: this.line, column: startCol };
    }

    if (char === '!') {
      this.advance();
      if (this.current() === '=') {
        this.advance();
        return { type: 'COMPARISON', value: '!=', line: this.line, column: startCol };
      }
      this.pos--;
      this.column--;
      return null;
    }

    return null;
  }
}
