import React, { useEffect } from 'react';
import flowchart from 'flowchart.js';
import { FlowdiagramProps, Element } from './types';

const outputElements = (elements: Element[], type: string): string[] => {
  return elements.map(item => {
    return `${item.id}=>${type}: ${item.label}:$onClickHandler`;
  });
};

let chart: any = null;

export const Flowdiagram = (props: FlowdiagramProps) => {
  const { conditions, operations, config, styles, onClick } = props;

  const onClickHandler = (mouseEvent: MouseEvent, item: any) => {
    if (onClick) {
      onClick(item, mouseEvent);
    }
  };
  (window as any).onClickHandler = onClickHandler;

  useEffect(() => {
    if (chart && chart.clean) {
      chart.clean();
    }

    const conds = outputElements(conditions, 'condition');
    const ops = outputElements(operations, 'operation');

    const condsConnections = conditions.map(item => {
      const yes = `${item.id}(yes, ${item.connections.yes.position})->${item.connections.yes.id}`;
      const no = `${item.id}(no, ${item.connections.no.position})->${item.connections.no.id}`;
      return yes + '\n' + no;
    });

    const opsConnections = operations.map(item => {
      const direction = item.connection ? 'right' : 'bottom';
      const end = item.connection ? item.connection.id : 'end';
      return `${item.id}(${direction})->${end}`;
    });

    chart = flowchart.parse(`
      start=>start: ${config?.startText || 'start'}:$onClickHandler
      end=>end: ${config?.endText || 'end'}:$onClickHandler

      ${conds.join('\n')}
      ${ops.join('\n')}

      ${conditions.length > 0 ? `start(bottom)->${conditions[0].id}` : ''}
      ${condsConnections.join('\n')}
      ${opsConnections.join('\n')}
    `);

    chart.drawSVG('canvas', {
      'line-width': config?.lineWidth || 2,
      'line-length': config?.lineLength || 50,
      'text-margin': 10,
      'font-size': 14,
      'font-color': 'black',
      'line-color': 'black',
      'element-color': 'black',
      'arrow-end': 'classic-wide-long',
      scale: 1,
      // style symbol types
      symbols: styles,
    });
  }, [conditions, operations, config, styles]);

  return <div id="canvas"></div>;
};
