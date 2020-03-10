import { Connection, Node } from './types';
import { ONCLICK_HANDLER_NAME, NAME_FOR_MISSING_CONNECTION } from './constants';

export const outputNodes = (nodes: Node[]): string => {
  const output = nodes.map(node => {
    const link = ':$' + ONCLICK_HANDLER_NAME;
    const flowstate = node.state ? `|${node.state}` : '';
    return `${node.id}=>${node.type}: ${node.label}${flowstate}${link}`;
  });

  return output.join('\n');
};

const writeConnection = (
  id: string,
  connection?: Connection | null,
  key?: string
): string => {
  if (!connection) {
    return '';
  }
  const prefix = key ? `${key}, ` : '';
  return `${id}(${prefix}${connection.position})->${connection.id}`;
};

export const outputConnections = (nodes: Node[]): string => {
  const output = nodes
    .flatMap(node => {
      switch (node.type) {
        case 'start':
        case 'end':
        case 'operation':
        case 'inputoutput':
        case 'subroutine':
          return writeConnection(node.id, node.connection);
        case 'condition': {
          const yes = writeConnection(node.id, node.connections.yes, 'yes');
          const no = writeConnection(node.id, node.connections.no, 'no');
          return [yes, no];
        }
        case 'parallel': {
          const path1 = writeConnection(
            node.id,
            node.connections.path1,
            'path1'
          );
          const path2 = writeConnection(
            node.id,
            node.connections.path2,
            'path2'
          );
          const path3 = writeConnection(
            node.id,
            node.connections.path3,
            'path3'
          );
          return [path1, path2, path3];
        }
        default:
          return '';
      }
    })
    .filter(text => text !== '');

  if (output.length <= 0 && nodes.length > 0) {
    output.push(
      writeConnection(nodes[0].id, {
        id: NAME_FOR_MISSING_CONNECTION,
        position: 'bottom',
      })
    );
  }

  return output.join('\n');
};
