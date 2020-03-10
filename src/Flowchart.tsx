import flowchart from 'flowchart.js';
import React, { useEffect } from 'react';
import { FlowchartProps } from './types';
import { outputNodes, outputConnections } from './utils';
import { CANVAS_ID, ONCLICK_HANDLER_NAME } from './constants';

let chartElement: any = null;

export const Flowchart = (props: FlowchartProps) => {
  const { nodes, config, styles, states, onClick } = props;

  const internalClickHandler = (mouseEvent: MouseEvent, item: any) => {
    if (onClick) {
      onClick(item, mouseEvent);
    }
  };
  (window as any)[ONCLICK_HANDLER_NAME] = internalClickHandler;

  useEffect(() => {
    if (nodes.length <= 0) {
      return;
    }

    if (chartElement && chartElement.clean) {
      chartElement.clean();
    }

    const nodesCode = outputNodes(nodes);
    const connectionsCode = outputConnections(nodes);

    chartElement = flowchart.parse(`
      ${nodesCode}
      ${connectionsCode}
    `);

    chartElement.drawSVG(CANVAS_ID, {
      'line-width': config?.lineWidth || 2,
      'line-length': config?.lineLength || 50,
      'text-margin': config?.textMargin || 10,
      'font-size': config?.fontSize || 14,
      'font-family': config?.fontFamily || 'Helvetica',
      'font-weight': config?.fontWeight || 'normal',
      'font-color': config?.fontColor || 'black',
      'line-color': config?.lineColor || 'black',
      'element-color': config?.elementColor || 'black',
      fill: config?.fill || 'white',
      'yes-text': config?.yesText || 'yes',
      'no-text': config?.noText || 'no',
      'arrow-end': config?.arrowEnd || 'classic-wide-long',
      scale: config?.scale || 1,
      // nodes style
      symbols: styles,
      // flowstate styles
      flowstate: states,
    });
  }, [nodes, config, styles, states]);

  return <div id={CANVAS_ID}></div>;
};
