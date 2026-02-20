// Error handling for French Algorithm Language

export class AlgoError extends Error {
  public line: number;
  public errorType: 'parse' | 'execution' | 'type' | 'semantic';

  constructor(message: string, line: number, errorType: 'parse' | 'execution' | 'type' | 'semantic') {
    super(message);
    this.name = 'AlgoError';
    this.line = line;
    this.errorType = errorType;
  }
}

export class ParseError extends AlgoError {
  constructor(message: string, line: number) {
    super(message, line, 'parse');
    this.name = 'ParseError';
  }
}

export class ExecutionError extends AlgoError {
  constructor(message: string, line: number) {
    super(message, line, 'execution');
    this.name = 'ExecutionError';
  }
}

export class TypeError extends AlgoError {
  constructor(message: string, line: number) {
    super(message, line, 'type');
    this.name = 'TypeError';
  }
}

export class SemanticError extends AlgoError {
  constructor(message: string, line: number) {
    super(message, line, 'semantic');
    this.name = 'SemanticError';
  }
}

export interface ErrorInfo {
  message: string;
  line: number;
  type: 'parse' | 'execution' | 'type' | 'semantic';
  suggestion?: string;
}

export function formatError(error: AlgoError): ErrorInfo {
  let suggestion: string | undefined;

  // Provide helpful suggestions based on error type
  if (error.message.includes('FINSI')) {
    suggestion = "Vérifiez que chaque 'SI' a son 'FINSI' correspondant";
  } else if (error.message.includes('FIN TANT QUE')) {
    suggestion = "Vérifiez que chaque 'TANT QUE' a son 'FIN TANT QUE' correspondant";
  } else if (error.message.includes('FINPOUR')) {
    suggestion = "Vérifiez que chaque 'POUR' a son 'FINPOUR' correspondant";
  } else if (error.message.includes('FINFONCTION')) {
    suggestion = "Vérifiez que chaque 'FONCTION' a son 'FINFONCTION' correspondant";
  } else if (error.message.includes('non déclarée')) {
    suggestion = "Déclarez la variable dans la section VARIABLES avant de l'utiliser";
  } else if (error.message.includes('←')) {
    suggestion = "Utilisez '←' (ou '<-') pour l'affectation";
  } else if (error.message.includes('AFFICHER')) {
    suggestion = "Syntaxe: AFFICHER(expression) ou AFFICHER(expr1, expr2, ...)";
  } else if (error.message.includes('LIRE')) {
    suggestion = "Syntaxe: LIRE(nomVariable)";
  }

  return {
    message: error.message,
    line: error.line,
    type: error.errorType,
    suggestion,
  };
}

export function createErrorMessage(info: ErrorInfo): string {
  let msg = `Erreur ligne ${info.line}: ${info.message}`;
  if (info.suggestion) {
    msg += `\n💡 Conseil: ${info.suggestion}`;
  }
  return msg;
}
