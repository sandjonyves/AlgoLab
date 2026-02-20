// AST Node Types for French Algorithm Language

export type ASTNodeType =
  | 'Program'
  | 'VariableDeclaration'
  | 'Assignment'
  | 'BinaryExpression'
  | 'UnaryExpression'
  | 'Identifier'
  | 'NumericLiteral'
  | 'StringLiteral'
  | 'BooleanLiteral'
  | 'ArrayLiteral'
  | 'ArrayAccess'
  | 'IfStatement'
  | 'WhileLoop'
  | 'ForLoop'
  | 'FunctionDeclaration'
  | 'FunctionCall'
  | 'ReturnStatement'
  | 'PrintStatement'
  | 'ReadStatement'
  | 'Block';

export type DataType = 'ENTIER' | 'REEL' | 'BOOLEEN' | 'CHAINE' | 'CARACTERE' | 'TABLEAU' | 'LISTE' | 'UNKNOWN';

export interface BaseNode {
  type: ASTNodeType;
  line: number;
  column?: number;
}

export interface ProgramNode extends BaseNode {
  type: 'Program';
  name: string;
  variables: VariableDeclarationNode[];
  body: StatementNode[];
  functions: FunctionDeclarationNode[];
}

export interface VariableDeclarationNode extends BaseNode {
  type: 'VariableDeclaration';
  name: string;
  dataType: DataType;
  arraySize?: number;
}

export interface AssignmentNode extends BaseNode {
  type: 'Assignment';
  target: IdentifierNode | ArrayAccessNode;
  value: ExpressionNode;
}

export interface BinaryExpressionNode extends BaseNode {
  type: 'BinaryExpression';
  operator: string;
  left: ExpressionNode;
  right: ExpressionNode;
}

export interface UnaryExpressionNode extends BaseNode {
  type: 'UnaryExpression';
  operator: string;
  operand: ExpressionNode;
}

export interface IdentifierNode extends BaseNode {
  type: 'Identifier';
  name: string;
}

export interface NumericLiteralNode extends BaseNode {
  type: 'NumericLiteral';
  value: number;
}

export interface StringLiteralNode extends BaseNode {
  type: 'StringLiteral';
  value: string;
}

export interface BooleanLiteralNode extends BaseNode {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface ArrayLiteralNode extends BaseNode {
  type: 'ArrayLiteral';
  elements: ExpressionNode[];
}

export interface ArrayAccessNode extends BaseNode {
  type: 'ArrayAccess';
  array: IdentifierNode;
  index: ExpressionNode;
}

export interface IfStatementNode extends BaseNode {
  type: 'IfStatement';
  condition: ExpressionNode;
  thenBlock: StatementNode[];
  elseBlock?: StatementNode[];
}

export interface WhileLoopNode extends BaseNode {
  type: 'WhileLoop';
  condition: ExpressionNode;
  body: StatementNode[];
}

export interface ForLoopNode extends BaseNode {
  type: 'ForLoop';
  variable: string;
  start: ExpressionNode;
  end: ExpressionNode;
  step?: ExpressionNode;
  body: StatementNode[];
}

export interface FunctionDeclarationNode extends BaseNode {
  type: 'FunctionDeclaration';
  name: string;
  params: { name: string; dataType?: DataType }[];
  returnType?: DataType;
  body: StatementNode[];
}

export interface FunctionCallNode extends BaseNode {
  type: 'FunctionCall';
  name: string;
  arguments: ExpressionNode[];
}

export interface ReturnStatementNode extends BaseNode {
  type: 'ReturnStatement';
  value: ExpressionNode;
}

export interface PrintStatementNode extends BaseNode {
  type: 'PrintStatement';
  arguments: ExpressionNode[];
}

export interface ReadStatementNode extends BaseNode {
  type: 'ReadStatement';
  variable: IdentifierNode;
}

export interface BlockNode extends BaseNode {
  type: 'Block';
  statements: StatementNode[];
}

export type ExpressionNode =
  | BinaryExpressionNode
  | UnaryExpressionNode
  | IdentifierNode
  | NumericLiteralNode
  | StringLiteralNode
  | BooleanLiteralNode
  | ArrayLiteralNode
  | ArrayAccessNode
  | FunctionCallNode;

export type StatementNode =
  | AssignmentNode
  | IfStatementNode
  | WhileLoopNode
  | ForLoopNode
  | FunctionCallNode
  | ReturnStatementNode
  | PrintStatementNode
  | ReadStatementNode;
