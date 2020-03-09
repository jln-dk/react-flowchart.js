import { Connection, Node } from './types';
import { ONCLICK_HANDLER_NAME } from './constants';

export const outputNodes = (nodes: Node[]): string => {
  return nodes
    .map(node => {
      const link = ':$' + ONCLICK_HANDLER_NAME;
      const flowstate = node.state ? `|${node.state}` : '';
      return `${node.id}=>${node.type}: ${node.label}${flowstate}${link}`;
    })
    .join('\n');
};

const writeConnection = (
  node: Node,
  connection?: Connection | null,
  key?: string
): string => {
  if (connection) {
    const prefix = key ? `${key}, ` : '';
    return `${node.id}(${prefix}${connection.position})->${connection.id}`;
  }
  return '';
};

export const outputConnections = (nodes: Node[]): string => {
  return nodes
    .map(node => {
      switch (node.type) {
        case 'start':
        case 'end':
        case 'operation':
        case 'inputoutput':
        case 'subroutine':
          return writeConnection(node, node.connection);
        case 'condition': {
          const yes = writeConnection(node, node.connections.yes, 'yes');
          const no = writeConnection(node, node.connections.no, 'no');
          return yes + '\n' + no;
        }
        case 'parallel': {
          const path1 = writeConnection(node, node.connections.path1, 'path1');
          const path2 = writeConnection(node, node.connections.path2, 'path2');
          const path3 = writeConnection(node, node.connections.path3, 'path3');
          return path1 + '\n' + path2 + '\n' + path3;
        }
        default:
          return '';
      }
    })
    .join('\n');
};
