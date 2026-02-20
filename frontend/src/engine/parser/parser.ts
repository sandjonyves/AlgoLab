// Recursive Descent Parser for French Algorithm Language

import { Token, TokenType, Lexer } from '../lexer/lexer';
import {
  ProgramNode,
  VariableDeclarationNode,
  StatementNode,
  ExpressionNode,
  IdentifierNode,
  NumericLiteralNode,
  StringLiteralNode,
  BooleanLiteralNode,
  BinaryExpressionNode,
  UnaryExpressionNode,
  AssignmentNode,
  IfStatementNode,
  WhileLoopNode,
  ForLoopNode,
  FunctionDeclarationNode,
  FunctionCallNode,
  PrintStatementNode,
  ReadStatementNode,
  ReturnStatementNode,
  ArrayAccessNode,
  DataType,
} from '../ast/types';
import { ParseError } from '../errors/errorHandler';

export class Parser {
  private tokens: Token[] = [];
  private pos: number = 0;
  private currentToken: Token;

  constructor() {
    this.currentToken = { type: 'EOF', value: '', line: 1, column: 1 };
  }

  parse(source: string): ProgramNode {
    const lexer = new Lexer(source);
    this.tokens = lexer.tokenize();
    this.pos = 0;
    this.currentToken = this.tokens[0];

    return this.parseProgram();
  }

  private parseProgram(): ProgramNode {
    const line = this.currentToken.line;
    let name = 'Programme';
    const variables: VariableDeclarationNode[] = [];
    const body: StatementNode[] = [];
    const functions: FunctionDeclarationNode[] = [];

    this.skipNewlines();

    // Parse ALGORITHME name
    if (this.check('KEYWORD', 'ALGORITHME')) {
      this.advance();
      this.skipNewlines();
      if (this.currentToken.type === 'IDENTIFIER') {
        name = this.currentToken.value;
        this.advance();
      }
    }

    this.skipNewlines();

    // Parse VARIABLES section
    if (this.check('KEYWORD', 'VARIABLES')) {
      this.advance();
      this.skipNewlines();
      while (!this.check('KEYWORD', 'DEBUT') && !this.check('KEYWORD', 'FONCTION') && !this.isAtEnd()) {
        const varDecl = this.parseVariableDeclaration();
        if (varDecl) {
          variables.push(varDecl);
        }
        this.skipNewlines();
      }
    }

    // Parse FONCTION declarations before DEBUT
    while (this.check('KEYWORD', 'FONCTION')) {
      functions.push(this.parseFunctionDeclaration());
      this.skipNewlines();
    }

    // Parse DEBUT...FIN block
    if (this.check('KEYWORD', 'DEBUT')) {
      this.advance();
      this.skipNewlines();

      while (!this.check('KEYWORD', 'FIN') && !this.isAtEnd()) {
        const stmt = this.parseStatement();
        if (stmt) {
          body.push(stmt);
        }
        this.skipNewlines();
      }

      if (this.check('KEYWORD', 'FIN')) {
        this.advance();
      }
    }

    return {
      type: 'Program',
      name,
      variables,
      body,
      functions,
      line,
    };
  }

  private parseVariableDeclaration(): VariableDeclarationNode | null {
    const line = this.currentToken.line;
    
    if (this.currentToken.type !== 'IDENTIFIER') {
      this.skipToNextLine();
      return null;
    }

    const name = this.currentToken.value;
    this.advance();

    if (!this.check('COLON')) {
      throw new ParseError(`Attendu ':' après le nom de variable '${name}'`, line);
    }
    this.advance();

    const dataType = this.parseDataType();

    let arraySize: number | undefined;
    if (this.check('LBRACKET')) {
      this.advance();
      if (this.check('NUMBER')) {
        arraySize = parseInt(this.currentToken.value);
        this.advance();
      }
      if (this.check('RBRACKET')) {
        this.advance();
      }
    }

    return {
      type: 'VariableDeclaration',
      name,
      dataType,
      arraySize,
      line,
    };
  }

  private parseDataType(): DataType {
    const typeMap: Record<string, DataType> = {
      'ENTIER': 'ENTIER',
      'REEL': 'REEL',
      'BOOLEEN': 'BOOLEEN',
      'CHAINE': 'CHAINE',
      'CARACTERE': 'CARACTERE',
      'TABLEAU': 'TABLEAU',
      'LISTE': 'LISTE',
    };

    const value = this.currentToken.value.toUpperCase();
    if (this.currentToken.type === 'KEYWORD' && typeMap[value]) {
      this.advance();
      return typeMap[value];
    }

    return 'UNKNOWN';
  }

  private parseStatement(): StatementNode | null {
    this.skipNewlines();

    if (this.isAtEnd()) return null;

    const line = this.currentToken.line;

    // AFFICHER statement
    if (this.check('KEYWORD', 'AFFICHER')) {
      return this.parsePrintStatement();
    }

    // LIRE statement
    if (this.check('KEYWORD', 'LIRE')) {
      return this.parseReadStatement();
    }

    // SI statement
    if (this.check('KEYWORD', 'SI')) {
      return this.parseIfStatement();
    }

    // TANT QUE loop
    if (this.check('KEYWORD', 'TANT')) {
      return this.parseWhileLoop();
    }

    // POUR loop
    if (this.check('KEYWORD', 'POUR')) {
      return this.parseForLoop();
    }

    // RETOURNER statement
    if (this.check('KEYWORD', 'RETOURNER')) {
      return this.parseReturnStatement();
    }

    // Assignment or function call
    if (this.currentToken.type === 'IDENTIFIER') {
      const name = this.currentToken.value;
      const savedPos = this.pos;
      this.advance();

      // Array access assignment
      if (this.check('LBRACKET')) {
        this.pos = savedPos;
        this.currentToken = this.tokens[this.pos];
        return this.parseAssignment();
      }

      // Assignment
      if (this.check('ASSIGNMENT')) {
        this.pos = savedPos;
        this.currentToken = this.tokens[this.pos];
        return this.parseAssignment();
      }

      // Function call
      if (this.check('LPAREN')) {
        this.pos = savedPos;
        this.currentToken = this.tokens[this.pos];
        return this.parseFunctionCall();
      }

      // Restore position if nothing matched
      this.pos = savedPos;
      this.currentToken = this.tokens[this.pos];
    }

    // Skip unknown token
    if (!this.isAtEnd()) {
      this.advance();
    }
    return null;
  }

  private parseAssignment(): AssignmentNode {
    const line = this.currentToken.line;
    
    const targetName = this.currentToken.value;
    this.advance();

    let target: IdentifierNode | ArrayAccessNode = {
      type: 'Identifier',
      name: targetName,
      line,
    };

    // Check for array access
    if (this.check('LBRACKET')) {
      this.advance();
      const index = this.parseExpression();
      if (this.check('RBRACKET')) {
        this.advance();
      }
      target = {
        type: 'ArrayAccess',
        array: { type: 'Identifier', name: targetName, line },
        index,
        line,
      };
    }

    if (!this.check('ASSIGNMENT')) {
      throw new ParseError(`Attendu '←' pour l'affectation`, line);
    }
    this.advance();

    const value = this.parseExpression();

    return {
      type: 'Assignment',
      target,
      value,
      line,
    };
  }

  private parsePrintStatement(): PrintStatementNode {
    const line = this.currentToken.line;
    this.advance(); // Skip AFFICHER

    if (!this.check('LPAREN')) {
      throw new ParseError(`Attendu '(' après AFFICHER`, line);
    }
    this.advance();

    const args: ExpressionNode[] = [];
    
    if (!this.check('RPAREN')) {
      args.push(this.parseExpression());
      while (this.check('COMMA')) {
        this.advance();
        args.push(this.parseExpression());
      }
    }

    if (!this.check('RPAREN')) {
      throw new ParseError(`Attendu ')' après les arguments de AFFICHER`, line);
    }
    this.advance();

    return {
      type: 'PrintStatement',
      arguments: args,
      line,
    };
  }

  private parseReadStatement(): ReadStatementNode {
    const line = this.currentToken.line;
    this.advance(); // Skip LIRE

    if (!this.check('LPAREN')) {
      throw new ParseError(`Attendu '(' après LIRE`, line);
    }
    this.advance();

    if (this.currentToken.type !== 'IDENTIFIER') {
      throw new ParseError(`Attendu un nom de variable dans LIRE`, line);
    }

    const variable: IdentifierNode = {
      type: 'Identifier',
      name: this.currentToken.value,
      line,
    };
    this.advance();

    if (!this.check('RPAREN')) {
      throw new ParseError(`Attendu ')' après la variable dans LIRE`, line);
    }
    this.advance();

    return {
      type: 'ReadStatement',
      variable,
      line,
    };
  }

  private parseIfStatement(): IfStatementNode {
    const line = this.currentToken.line;
    this.advance(); // Skip SI

    const condition = this.parseExpression();

    if (!this.check('KEYWORD', 'ALORS')) {
      throw new ParseError(`Attendu 'ALORS' après la condition SI`, line);
    }
    this.advance();
    this.skipNewlines();

    const thenBlock: StatementNode[] = [];
    while (!this.check('KEYWORD', 'SINON') && !this.check('KEYWORD', 'FINSI') && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) thenBlock.push(stmt);
      this.skipNewlines();
    }

    let elseBlock: StatementNode[] | undefined;
    if (this.check('KEYWORD', 'SINON')) {
      this.advance();
      this.skipNewlines();
      elseBlock = [];
      while (!this.check('KEYWORD', 'FINSI') && !this.isAtEnd()) {
        const stmt = this.parseStatement();
        if (stmt) elseBlock.push(stmt);
        this.skipNewlines();
      }
    }

    if (!this.check('KEYWORD', 'FINSI')) {
      throw new ParseError(`Attendu 'FINSI' pour fermer la condition SI`, line);
    }
    this.advance();

    return {
      type: 'IfStatement',
      condition,
      thenBlock,
      elseBlock,
      line,
    };
  }

  private parseWhileLoop(): WhileLoopNode {
    const line = this.currentToken.line;
    this.advance(); // Skip TANT

    if (!this.check('KEYWORD', 'QUE')) {
      throw new ParseError(`Attendu 'QUE' après 'TANT'`, line);
    }
    this.advance();

    const condition = this.parseExpression();

    if (!this.check('KEYWORD', 'FAIRE')) {
      throw new ParseError(`Attendu 'FAIRE' après la condition TANT QUE`, line);
    }
    this.advance();
    this.skipNewlines();

    const body: StatementNode[] = [];
    while (!this.check('KEYWORD', 'FIN TANT QUE') && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) body.push(stmt);
      this.skipNewlines();
    }

    if (!this.check('KEYWORD', 'FIN TANT QUE')) {
      throw new ParseError(`Attendu 'FIN TANT QUE' pour fermer la boucle TANT QUE`, line);
    }
    this.advance();

    return {
      type: 'WhileLoop',
      condition,
      body,
      line,
    };
  }

  private parseForLoop(): ForLoopNode {
    const line = this.currentToken.line;
    this.advance(); // Skip POUR

    if (this.currentToken.type !== 'IDENTIFIER') {
      throw new ParseError(`Attendu un nom de variable après POUR`, line);
    }
    const variable = this.currentToken.value;
    this.advance();

    if (!this.check('ASSIGNMENT')) {
      throw new ParseError(`Attendu '←' après la variable dans POUR`, line);
    }
    this.advance();

    const start = this.parseExpression();

    if (!this.check('KEYWORD', 'A')) {
      throw new ParseError(`Attendu 'A' après la valeur initiale dans POUR`, line);
    }
    this.advance();

    const end = this.parseExpression();

    let step: ExpressionNode | undefined;
    if (this.check('KEYWORD', 'PAS')) {
      this.advance();
      step = this.parseExpression();
    }

    if (!this.check('KEYWORD', 'FAIRE')) {
      throw new ParseError(`Attendu 'FAIRE' après la boucle POUR`, line);
    }
    this.advance();
    this.skipNewlines();

    const body: StatementNode[] = [];
    while (!this.check('KEYWORD', 'FINPOUR') && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) body.push(stmt);
      this.skipNewlines();
    }

    if (!this.check('KEYWORD', 'FINPOUR')) {
      throw new ParseError(`Attendu 'FINPOUR' pour fermer la boucle POUR`, line);
    }
    this.advance();

    return {
      type: 'ForLoop',
      variable,
      start,
      end,
      step,
      body,
      line,
    };
  }

  private parseFunctionDeclaration(): FunctionDeclarationNode {
    const line = this.currentToken.line;
    this.advance(); // Skip FONCTION

    if (this.currentToken.type !== 'IDENTIFIER') {
      throw new ParseError(`Attendu un nom de fonction après FONCTION`, line);
    }
    const name = this.currentToken.value;
    this.advance();

    if (!this.check('LPAREN')) {
      throw new ParseError(`Attendu '(' après le nom de fonction`, line);
    }
    this.advance();

    const params: { name: string; dataType?: DataType }[] = [];
    if (!this.check('RPAREN')) {
      do {
        if (this.check('COMMA')) this.advance();
        if (this.currentToken.type !== 'IDENTIFIER') {
          throw new ParseError(`Attendu un nom de paramètre`, line);
        }
        const paramName = this.currentToken.value;
        this.advance();
        let paramType: DataType | undefined;
        if (this.check('COLON')) {
          this.advance();
          paramType = this.parseDataType();
        }
        params.push({ name: paramName, dataType: paramType });
      } while (this.check('COMMA'));
    }

    if (!this.check('RPAREN')) {
      throw new ParseError(`Attendu ')' après les paramètres`, line);
    }
    this.advance();

    let returnType: DataType | undefined;
    if (this.check('COLON')) {
      this.advance();
      returnType = this.parseDataType();
    }

    this.skipNewlines();

    if (!this.check('KEYWORD', 'DEBUT')) {
      throw new ParseError(`Attendu 'DEBUT' dans la fonction`, line);
    }
    this.advance();
    this.skipNewlines();

    const body: StatementNode[] = [];
    while (!this.check('KEYWORD', 'FINFONCTION') && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) body.push(stmt);
      this.skipNewlines();
    }

    if (!this.check('KEYWORD', 'FINFONCTION')) {
      throw new ParseError(`Attendu 'FINFONCTION' pour fermer la fonction`, line);
    }
    this.advance();

    return {
      type: 'FunctionDeclaration',
      name,
      params,
      returnType,
      body,
      line,
    };
  }

  private parseFunctionCall(): FunctionCallNode {
    const line = this.currentToken.line;
    const name = this.currentToken.value;
    this.advance();

    if (!this.check('LPAREN')) {
      throw new ParseError(`Attendu '(' après le nom de fonction '${name}'`, line);
    }
    this.advance();

    const args: ExpressionNode[] = [];
    if (!this.check('RPAREN')) {
      args.push(this.parseExpression());
      while (this.check('COMMA')) {
        this.advance();
        args.push(this.parseExpression());
      }
    }

    if (!this.check('RPAREN')) {
      throw new ParseError(`Attendu ')' après les arguments de '${name}'`, line);
    }
    this.advance();

    return {
      type: 'FunctionCall',
      name,
      arguments: args,
      line,
    };
  }

  private parseReturnStatement(): ReturnStatementNode {
    const line = this.currentToken.line;
    this.advance(); // Skip RETOURNER

    const value = this.parseExpression();

    return {
      type: 'ReturnStatement',
      value,
      line,
    };
  }

  private parseExpression(): ExpressionNode {
    return this.parseLogicalOr();
  }

  private parseLogicalOr(): ExpressionNode {
    let left = this.parseLogicalAnd();

    while (this.check('KEYWORD', 'OU')) {
      const line = this.currentToken.line;
      this.advance();
      const right = this.parseLogicalAnd();
      left = {
        type: 'BinaryExpression',
        operator: 'OU',
        left,
        right,
        line,
      };
    }

    return left;
  }

  private parseLogicalAnd(): ExpressionNode {
    let left = this.parseComparison();

    while (this.check('KEYWORD', 'ET')) {
      const line = this.currentToken.line;
      this.advance();
      const right = this.parseComparison();
      left = {
        type: 'BinaryExpression',
        operator: 'ET',
        left,
        right,
        line,
      };
    }

    return left;
  }

  private parseComparison(): ExpressionNode {
    let left = this.parseAdditive();

    while (this.currentToken.type === 'COMPARISON') {
      const line = this.currentToken.line;
      const operator = this.currentToken.value;
      this.advance();
      const right = this.parseAdditive();
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
        line,
      };
    }

    return left;
  }

  private parseAdditive(): ExpressionNode {
    let left = this.parseMultiplicative();

    while (this.currentToken.type === 'OPERATOR' && (this.currentToken.value === '+' || this.currentToken.value === '-')) {
      const line = this.currentToken.line;
      const operator = this.currentToken.value;
      this.advance();
      const right = this.parseMultiplicative();
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
        line,
      };
    }

    return left;
  }

  private parseMultiplicative(): ExpressionNode {
    let left = this.parsePower();

    while (
      (this.currentToken.type === 'OPERATOR' && (this.currentToken.value === '*' || this.currentToken.value === '/')) ||
      this.check('KEYWORD', 'MOD') ||
      this.check('KEYWORD', 'DIV')
    ) {
      const line = this.currentToken.line;
      const operator = this.currentToken.value;
      this.advance();
      const right = this.parsePower();
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right,
        line,
      };
    }

    return left;
  }

  private parsePower(): ExpressionNode {
    let left = this.parseUnary();

    while (this.currentToken.type === 'OPERATOR' && this.currentToken.value === '^') {
      const line = this.currentToken.line;
      this.advance();
      const right = this.parseUnary();
      left = {
        type: 'BinaryExpression',
        operator: '^',
        left,
        right,
        line,
      };
    }

    return left;
  }

  private parseUnary(): ExpressionNode {
    if (this.check('KEYWORD', 'NON')) {
      const line = this.currentToken.line;
      this.advance();
      const operand = this.parseUnary();
      return {
        type: 'UnaryExpression',
        operator: 'NON',
        operand,
        line,
      };
    }

    if (this.currentToken.type === 'OPERATOR' && this.currentToken.value === '-') {
      const line = this.currentToken.line;
      this.advance();
      const operand = this.parseUnary();
      return {
        type: 'UnaryExpression',
        operator: '-',
        operand,
        line,
      };
    }

    return this.parsePrimary();
  }

  private parsePrimary(): ExpressionNode {
    const line = this.currentToken.line;

    // Number
    if (this.currentToken.type === 'NUMBER') {
      const value = parseFloat(this.currentToken.value);
      this.advance();
      return { type: 'NumericLiteral', value, line };
    }

    // String
    if (this.currentToken.type === 'STRING') {
      const value = this.currentToken.value;
      this.advance();
      return { type: 'StringLiteral', value, line };
    }

    // Boolean
    if (this.check('KEYWORD', 'VRAI')) {
      this.advance();
      return { type: 'BooleanLiteral', value: true, line };
    }
    if (this.check('KEYWORD', 'FAUX')) {
      this.advance();
      return { type: 'BooleanLiteral', value: false, line };
    }

    // Parenthesized expression
    if (this.check('LPAREN')) {
      this.advance();
      const expr = this.parseExpression();
      if (!this.check('RPAREN')) {
        throw new ParseError(`Attendu ')' pour fermer la parenthèse`, line);
      }
      this.advance();
      return expr;
    }

    // Identifier or function call
    if (this.currentToken.type === 'IDENTIFIER') {
      const name = this.currentToken.value;
      this.advance();

      // Function call
      if (this.check('LPAREN')) {
        this.advance();
        const args: ExpressionNode[] = [];
        if (!this.check('RPAREN')) {
          args.push(this.parseExpression());
          while (this.check('COMMA')) {
            this.advance();
            args.push(this.parseExpression());
          }
        }
        if (!this.check('RPAREN')) {
          throw new ParseError(`Attendu ')' après les arguments de '${name}'`, line);
        }
        this.advance();
        return { type: 'FunctionCall', name, arguments: args, line };
      }

      // Array access
      if (this.check('LBRACKET')) {
        this.advance();
        const index = this.parseExpression();
        if (!this.check('RBRACKET')) {
          throw new ParseError(`Attendu ']' pour fermer l'accès au tableau`, line);
        }
        this.advance();
        return {
          type: 'ArrayAccess',
          array: { type: 'Identifier', name, line },
          index,
          line,
        };
      }

      return { type: 'Identifier', name, line };
    }

    throw new ParseError(`Expression inattendue: '${this.currentToken.value}'`, line);
  }

  private check(type: TokenType, value?: string): boolean {
    if (this.currentToken.type !== type) return false;
    if (value !== undefined && this.currentToken.value !== value) return false;
    return true;
  }

  private advance(): Token {
    const token = this.currentToken;
    this.pos++;
    if (this.pos < this.tokens.length) {
      this.currentToken = this.tokens[this.pos];
    }
    return token;
  }

  private skipNewlines(): void {
    while (this.currentToken.type === 'NEWLINE') {
      this.advance();
    }
  }

  private skipToNextLine(): void {
    while (!this.isAtEnd() && this.currentToken.type !== 'NEWLINE') {
      this.advance();
    }
    this.skipNewlines();
  }

  private isAtEnd(): boolean {
    return this.currentToken.type === 'EOF';
  }
}
