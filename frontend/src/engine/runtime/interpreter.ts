// Real Interpreter for French Algorithm Language
// This actually executes the AST - NO simulation!

import {
  ProgramNode,
  StatementNode,
  ExpressionNode,
  VariableDeclarationNode,
  FunctionDeclarationNode,
  DataType,
} from '../ast/types';
import { ExecutionError, SemanticError, TypeError as AlgoTypeError } from '../errors/errorHandler';

export type RuntimeValue = number | string | boolean | RuntimeValue[] | null;

export interface Variable {
  name: string;
  type: DataType;
  value: RuntimeValue;
}

export interface ExecutionContext {
  memory: Map<string, Variable>;
  functions: Map<string, FunctionDeclarationNode>;
  output: string[];
  currentLine: number;
  isRunning: boolean;
  isPaused: boolean;
  stepMode: boolean;
}

export interface ExecutionCallbacks {
  onOutput: (text: string) => void;
  onMemoryUpdate: (memory: Map<string, Variable>) => void;
  onLineChange: (line: number) => void;
  onInput: (variableName: string) => Promise<string>;
  onStep?: () => Promise<void>;
  onError: (error: ExecutionError | SemanticError | AlgoTypeError) => void;
  onComplete: () => void;
}

export class Interpreter {
  private context: ExecutionContext;
  private callbacks: ExecutionCallbacks;
  private returnValue: RuntimeValue = null;
  private shouldReturn: boolean = false;

  constructor(callbacks: ExecutionCallbacks) {
    this.callbacks = callbacks;
    this.context = this.createContext();
  }

  private createContext(): ExecutionContext {
    return {
      memory: new Map(),
      functions: new Map(),
      output: [],
      currentLine: 0,
      isRunning: false,
      isPaused: false,
      stepMode: false,
    };
  }

  async execute(program: ProgramNode, stepMode: boolean = false): Promise<void> {
    this.context = this.createContext();
    this.context.stepMode = stepMode;
    this.context.isRunning = true;
    this.shouldReturn = false;
    this.returnValue = null;

    try {
      // Initialize variables
      for (const varDecl of program.variables) {
        this.declareVariable(varDecl);
      }

      // Register functions
      for (const func of program.functions) {
        this.context.functions.set(func.name, func);
      }

      // Execute main body
      for (const stmt of program.body) {
        if (!this.context.isRunning) break;
        if (this.shouldReturn) break;
        await this.executeStatement(stmt);
      }

      this.callbacks.onComplete();
    } catch (error) {
      if (error instanceof ExecutionError || error instanceof SemanticError || error instanceof AlgoTypeError) {
        this.callbacks.onError(error);
      } else {
        this.callbacks.onError(new ExecutionError(
          `Erreur inattendue: ${(error as Error).message}`,
          this.context.currentLine
        ));
      }
    } finally {
      this.context.isRunning = false;
    }
  }

  stop(): void {
    this.context.isRunning = false;
  }

  pause(): void {
    this.context.isPaused = true;
  }

  resume(): void {
    this.context.isPaused = false;
  }

  private declareVariable(decl: VariableDeclarationNode): void {
    let initialValue: RuntimeValue = null;

    switch (decl.dataType) {
      case 'ENTIER':
        initialValue = 0;
        break;
      case 'REEL':
        initialValue = 0.0;
        break;
      case 'BOOLEEN':
        initialValue = false;
        break;
      case 'CHAINE':
      case 'CARACTERE':
        initialValue = '';
        break;
      case 'TABLEAU':
      case 'LISTE':
        initialValue = decl.arraySize ? new Array(decl.arraySize).fill(0) : [];
        break;
      default:
        initialValue = null;
    }

    this.context.memory.set(decl.name, {
      name: decl.name,
      type: decl.dataType,
      value: initialValue,
    });

    this.callbacks.onMemoryUpdate(new Map(this.context.memory));
  }

  private async executeStatement(stmt: StatementNode): Promise<void> {
    if (!this.context.isRunning || this.shouldReturn) return;

    this.context.currentLine = stmt.line;
    this.callbacks.onLineChange(stmt.line);

    // Wait for step if in step mode
    if (this.context.stepMode && this.callbacks.onStep) {
      await this.callbacks.onStep();
    }

    // Wait while paused
    while (this.context.isPaused && this.context.isRunning) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (!this.context.isRunning) return;

    switch (stmt.type) {
      case 'Assignment':
        await this.executeAssignment(stmt);
        break;
      case 'PrintStatement':
        await this.executePrint(stmt);
        break;
      case 'ReadStatement':
        await this.executeRead(stmt);
        break;
      case 'IfStatement':
        await this.executeIf(stmt);
        break;
      case 'WhileLoop':
        await this.executeWhile(stmt);
        break;
      case 'ForLoop':
        await this.executeFor(stmt);
        break;
      case 'FunctionCall':
        await this.evaluateExpression(stmt);
        break;
      case 'ReturnStatement':
        this.returnValue = await this.evaluateExpression(stmt.value);
        this.shouldReturn = true;
        break;
    }
  }

  private async executeAssignment(stmt: StatementNode & { type: 'Assignment' }): Promise<void> {
    const value = await this.evaluateExpression(stmt.value);

    if (stmt.target.type === 'ArrayAccess') {
      const arrayName = stmt.target.array.name;
      const index = await this.evaluateExpression(stmt.target.index);
      
      const variable = this.context.memory.get(arrayName);
      if (!variable) {
        throw new SemanticError(`Variable '${arrayName}' non déclarée`, stmt.line);
      }

      if (!Array.isArray(variable.value)) {
        throw new AlgoTypeError(`'${arrayName}' n'est pas un tableau`, stmt.line);
      }

      const idx = Math.floor(index as number);
      if (idx < 0 || idx >= variable.value.length) {
        throw new ExecutionError(`Index ${idx} hors limites pour le tableau '${arrayName}'`, stmt.line);
      }

      variable.value[idx] = value;
    } else {
      const varName = stmt.target.name;
      const variable = this.context.memory.get(varName);

      if (!variable) {
        throw new SemanticError(`Variable '${varName}' non déclarée`, stmt.line);
      }

      // Type checking
      this.checkTypeCompatibility(variable.type, value, varName, stmt.line);
      variable.value = value;
    }

    this.callbacks.onMemoryUpdate(new Map(this.context.memory));
  }

  private checkTypeCompatibility(expectedType: DataType, value: RuntimeValue, varName: string, line: number): void {
    switch (expectedType) {
      case 'ENTIER':
        if (typeof value !== 'number') {
          throw new AlgoTypeError(`La variable '${varName}' attend un ENTIER`, line);
        }
        break;
      case 'REEL':
        if (typeof value !== 'number') {
          throw new AlgoTypeError(`La variable '${varName}' attend un REEL`, line);
        }
        break;
      case 'BOOLEEN':
        if (typeof value !== 'boolean') {
          throw new AlgoTypeError(`La variable '${varName}' attend un BOOLEEN`, line);
        }
        break;
      case 'CHAINE':
      case 'CARACTERE':
        if (typeof value !== 'string') {
          throw new AlgoTypeError(`La variable '${varName}' attend une CHAINE`, line);
        }
        break;
    }
  }

  private async executePrint(stmt: StatementNode & { type: 'PrintStatement' }): Promise<void> {
    const values: string[] = [];
    
    for (const arg of stmt.arguments) {
      const value = await this.evaluateExpression(arg);
      values.push(this.formatValue(value));
    }

    const output = values.join(' ');
    this.context.output.push(output);
    this.callbacks.onOutput(output);
  }

  private formatValue(value: RuntimeValue): string {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'VRAI' : 'FAUX';
    if (Array.isArray(value)) return '[' + value.map(v => this.formatValue(v)).join(', ') + ']';
    return String(value);
  }

  private async executeRead(stmt: StatementNode & { type: 'ReadStatement' }): Promise<void> {
    const varName = stmt.variable.name;
    const variable = this.context.memory.get(varName);

    if (!variable) {
      throw new SemanticError(`Variable '${varName}' non déclarée`, stmt.line);
    }

    const input = await this.callbacks.onInput(varName);
    
    // Parse input based on variable type
    let value: RuntimeValue;
    switch (variable.type) {
      case 'ENTIER':
        value = parseInt(input, 10);
        if (isNaN(value)) {
          throw new AlgoTypeError(`Entrée invalide pour ENTIER: '${input}'`, stmt.line);
        }
        break;
      case 'REEL':
        value = parseFloat(input);
        if (isNaN(value)) {
          throw new AlgoTypeError(`Entrée invalide pour REEL: '${input}'`, stmt.line);
        }
        break;
      case 'BOOLEEN':
        value = input.toUpperCase() === 'VRAI' || input === '1' || input.toLowerCase() === 'true';
        break;
      default:
        value = input;
    }

    variable.value = value;
    this.callbacks.onMemoryUpdate(new Map(this.context.memory));
  }

  private async executeIf(stmt: StatementNode & { type: 'IfStatement' }): Promise<void> {
    const condition = await this.evaluateExpression(stmt.condition);
    
    if (this.isTruthy(condition)) {
      for (const s of stmt.thenBlock) {
        if (!this.context.isRunning || this.shouldReturn) break;
        await this.executeStatement(s);
      }
    } else if (stmt.elseBlock) {
      for (const s of stmt.elseBlock) {
        if (!this.context.isRunning || this.shouldReturn) break;
        await this.executeStatement(s);
      }
    }
  }

  private async executeWhile(stmt: StatementNode & { type: 'WhileLoop' }): Promise<void> {
    let iterations = 0;
    const maxIterations = 100000; // Prevent infinite loops

    while (this.context.isRunning && !this.shouldReturn) {
      const condition = await this.evaluateExpression(stmt.condition);
      if (!this.isTruthy(condition)) break;

      for (const s of stmt.body) {
        if (!this.context.isRunning || this.shouldReturn) break;
        await this.executeStatement(s);
      }

      iterations++;
      if (iterations > maxIterations) {
        throw new ExecutionError(`Boucle infinie détectée (> ${maxIterations} itérations)`, stmt.line);
      }
    }
  }

  private async executeFor(stmt: StatementNode & { type: 'ForLoop' }): Promise<void> {
    const start = await this.evaluateExpression(stmt.start);
    const end = await this.evaluateExpression(stmt.end);
    const step = stmt.step ? await this.evaluateExpression(stmt.step) : 1;

    if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
      throw new AlgoTypeError(`Les bornes de la boucle POUR doivent être des nombres`, stmt.line);
    }

    // Check if variable exists, if not create it temporarily
    let variable = this.context.memory.get(stmt.variable);
    if (!variable) {
      variable = { name: stmt.variable, type: 'ENTIER', value: start };
      this.context.memory.set(stmt.variable, variable);
    }

    const iterations = Math.abs((end - start) / step) + 1;
    if (iterations > 100000) {
      throw new ExecutionError(`Boucle trop longue (> 100000 itérations)`, stmt.line);
    }

    if (step > 0) {
      for (let i = start; i <= end && this.context.isRunning && !this.shouldReturn; i += step) {
        variable.value = i;
        this.callbacks.onMemoryUpdate(new Map(this.context.memory));

        for (const s of stmt.body) {
          if (!this.context.isRunning || this.shouldReturn) break;
          await this.executeStatement(s);
        }
      }
    } else {
      for (let i = start; i >= end && this.context.isRunning && !this.shouldReturn; i += step) {
        variable.value = i;
        this.callbacks.onMemoryUpdate(new Map(this.context.memory));

        for (const s of stmt.body) {
          if (!this.context.isRunning || this.shouldReturn) break;
          await this.executeStatement(s);
        }
      }
    }
  }

  private async evaluateExpression(expr: ExpressionNode): Promise<RuntimeValue> {
    switch (expr.type) {
      case 'NumericLiteral':
        return expr.value;

      case 'StringLiteral':
        return expr.value;

      case 'BooleanLiteral':
        return expr.value;

      case 'Identifier': {
        const variable = this.context.memory.get(expr.name);
        if (!variable) {
          throw new SemanticError(`Variable '${expr.name}' non déclarée`, expr.line);
        }
        return variable.value;
      }

      case 'ArrayAccess': {
        const array = this.context.memory.get(expr.array.name);
        if (!array) {
          throw new SemanticError(`Tableau '${expr.array.name}' non déclaré`, expr.line);
        }
        if (!Array.isArray(array.value)) {
          throw new AlgoTypeError(`'${expr.array.name}' n'est pas un tableau`, expr.line);
        }
        const index = await this.evaluateExpression(expr.index);
        const idx = Math.floor(index as number);
        if (idx < 0 || idx >= array.value.length) {
          throw new ExecutionError(`Index ${idx} hors limites`, expr.line);
        }
        return array.value[idx];
      }

      case 'BinaryExpression': {
        const left = await this.evaluateExpression(expr.left);
        const right = await this.evaluateExpression(expr.right);
        return this.evaluateBinaryOp(expr.operator, left, right, expr.line);
      }

      case 'UnaryExpression': {
        const operand = await this.evaluateExpression(expr.operand);
        return this.evaluateUnaryOp(expr.operator, operand, expr.line);
      }

      case 'FunctionCall':
        return await this.executeFunction(expr.name, expr.arguments, expr.line);

      default:
        throw new ExecutionError(`Type d'expression non supporté: ${(expr as any).type}`, (expr as any).line);
    }
  }

  private evaluateBinaryOp(op: string, left: RuntimeValue, right: RuntimeValue, line: number): RuntimeValue {
    // String concatenation
    if (op === '+' && (typeof left === 'string' || typeof right === 'string')) {
      return String(left) + String(right);
    }

    // Arithmetic operations
    if (typeof left === 'number' && typeof right === 'number') {
      switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/':
          if (right === 0) throw new ExecutionError('Division par zéro', line);
          return left / right;
        case '^': return Math.pow(left, right);
        case 'MOD': return left % right;
        case 'DIV': return Math.floor(left / right);
      }
    }

    // Comparison operations
    switch (op) {
      case '=': return left === right;
      case '<>':
      case '!=': return left !== right;
      case '<': return (left as number) < (right as number);
      case '>': return (left as number) > (right as number);
      case '<=': return (left as number) <= (right as number);
      case '>=': return (left as number) >= (right as number);
    }

    // Logical operations
    switch (op) {
      case 'ET': return this.isTruthy(left) && this.isTruthy(right);
      case 'OU': return this.isTruthy(left) || this.isTruthy(right);
    }

    throw new ExecutionError(`Opérateur '${op}' non supporté`, line);
  }

  private evaluateUnaryOp(op: string, operand: RuntimeValue, line: number): RuntimeValue {
    switch (op) {
      case '-':
        if (typeof operand !== 'number') {
          throw new AlgoTypeError(`L'opérateur '-' attend un nombre`, line);
        }
        return -operand;
      case 'NON':
        return !this.isTruthy(operand);
      default:
        throw new ExecutionError(`Opérateur unaire '${op}' non supporté`, line);
    }
  }

  private isTruthy(value: RuntimeValue): boolean {
    if (value === null) return false;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') return value.length > 0;
    return true;
  }

  private async executeFunction(name: string, args: ExpressionNode[], line: number): Promise<RuntimeValue> {
    // Built-in functions
    switch (name.toUpperCase()) {
      case 'ABS': {
        const val = await this.evaluateExpression(args[0]);
        return Math.abs(val as number);
      }
      case 'RACINE':
      case 'SQRT': {
        const val = await this.evaluateExpression(args[0]);
        return Math.sqrt(val as number);
      }
      case 'ENTIER':
      case 'ENT': {
        const val = await this.evaluateExpression(args[0]);
        return Math.floor(val as number);
      }
      case 'ARRONDI': {
        const val = await this.evaluateExpression(args[0]);
        return Math.round(val as number);
      }
      case 'LONGUEUR':
      case 'LEN': {
        const val = await this.evaluateExpression(args[0]);
        if (typeof val === 'string') return val.length;
        if (Array.isArray(val)) return val.length;
        throw new AlgoTypeError(`LONGUEUR attend une chaîne ou un tableau`, line);
      }
      case 'ALEATOIRE':
      case 'RANDOM': {
        if (args.length === 0) return Math.random();
        if (args.length === 1) {
          const max = await this.evaluateExpression(args[0]);
          return Math.floor(Math.random() * (max as number));
        }
        const min = await this.evaluateExpression(args[0]);
        const max = await this.evaluateExpression(args[1]);
        return Math.floor(Math.random() * ((max as number) - (min as number) + 1)) + (min as number);
      }
      case 'PUISSANCE':
      case 'POW': {
        const base = await this.evaluateExpression(args[0]);
        const exp = await this.evaluateExpression(args[1]);
        return Math.pow(base as number, exp as number);
      }
      case 'SIN': {
        const val = await this.evaluateExpression(args[0]);
        return Math.sin(val as number);
      }
      case 'COS': {
        const val = await this.evaluateExpression(args[0]);
        return Math.cos(val as number);
      }
      case 'TAN': {
        const val = await this.evaluateExpression(args[0]);
        return Math.tan(val as number);
      }
      case 'LOG': {
        const val = await this.evaluateExpression(args[0]);
        return Math.log(val as number);
      }
      case 'EXP': {
        const val = await this.evaluateExpression(args[0]);
        return Math.exp(val as number);
      }
    }

    // User-defined functions
    const func = this.context.functions.get(name);
    if (!func) {
      throw new SemanticError(`Fonction '${name}' non définie`, line);
    }

    // Create new scope for function
    const savedMemory = new Map(this.context.memory);
    const savedShouldReturn = this.shouldReturn;
    this.shouldReturn = false;
    this.returnValue = null;

    // Bind parameters
    for (let i = 0; i < func.params.length; i++) {
      const param = func.params[i];
      const argValue = i < args.length ? await this.evaluateExpression(args[i]) : null;
      this.context.memory.set(param.name, {
        name: param.name,
        type: param.dataType || 'UNKNOWN',
        value: argValue,
      });
    }

    // Execute function body
    for (const stmt of func.body) {
      if (!this.context.isRunning || this.shouldReturn) break;
      await this.executeStatement(stmt);
    }

    const result = this.returnValue;

    // Restore scope
    this.context.memory = savedMemory;
    this.shouldReturn = savedShouldReturn;

    return result;
  }

  getMemory(): Map<string, Variable> {
    return new Map(this.context.memory);
  }
}
