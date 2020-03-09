export type Position = 'top' | 'right' | 'bottom' | 'left';

export interface Connection {
  id: string;
  position: Position;
}

export interface Element {
  id: string;
  label: string;
}

export interface Condition extends Element {
  connections: {
    yes: Connection;
    no: Connection;
  };
}

export interface Operation extends Element {
  connection: Connection | null;
}

export interface FlowdiagramConfig {
  startText?: string;
  endText?: string;
  lineWidth?: number;
  lineLength?: number;
}

export interface FlowdiagramStyles {
  start?: Object;
  end?: Object;
  condition?: Object;
  operation?: Object;
}

export interface FlowdiagramProps {
  conditions: Condition[];
  operations: Operation[];
  config?: FlowdiagramConfig;
  styles?: FlowdiagramStyles;
  onClick?: (item: any, mouseEvent: MouseEvent) => void;
}
