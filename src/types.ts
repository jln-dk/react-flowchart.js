export type Position = 'top' | 'right' | 'bottom' | 'left';

export interface Connection {
  id: string;
  position: Position;
}

export interface INode {
  id: string;
  label: string;
  state?: string;
}

export interface StartNode extends INode {
  type: 'start';
  connection?: Connection | null;
}

export interface EndNode extends INode {
  type: 'end';
  connection?: Connection | null;
}

export interface OperationNode extends INode {
  type: 'operation';
  connection?: Connection | null;
}

export interface InputOutputNode extends INode {
  type: 'inputoutput';
  connection?: Connection | null;
}

export interface SubroutineNode extends INode {
  type: 'subroutine';
  connection?: Connection | null;
}

export interface ConditionNode extends INode {
  type: 'condition';
  connections: {
    yes?: Connection | null;
    no?: Connection | null;
  };
}

export interface ParallelNode extends INode {
  type: 'parallel';
  connections: {
    path1?: Connection | null;
    path2?: Connection | null;
    path3?: Connection | null;
  };
}

export type Node =
  | StartNode
  | EndNode
  | OperationNode
  | InputOutputNode
  | SubroutineNode
  | ConditionNode
  | ParallelNode;

export interface FlowdiagramConfig {
  lineWidth?: number;
  lineLength?: number;
  textMargin?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontColor?: string;
  lineColor?: string;
  elementColor?: string;
  fill?: string;
  yesText?: string;
  noText?: string;
  arrowEnd?: 'block' | 'classic-wide-long';
  scale?: number;
}

export interface FlowdiagramProps {
  nodes: Node[];
  config?: FlowdiagramConfig;
  styles?: {
    [nodeType: string]: Object;
  };
  states?: {
    [state: string]: Object;
  };
  onClick?: (item: any, mouseEvent: MouseEvent) => void;
}
