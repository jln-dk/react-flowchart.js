import flowchart from 'flowchart.js';
import React, { useEffect } from 'react';
import { FlowdiagramProps } from './types';
import { outputNodes, outputConnections } from './utils';
import { ONCLICK_HANDLER_NAME } from './constants';

let chart: any = null;

export const Flowdiagram = (props: FlowdiagramProps) => {
  const { nodes, config, styles, states, onClick } = props;

  const internalClickHandler = (mouseEvent: MouseEvent, item: any) => {
    if (onClick) {
      onClick(item, mouseEvent);
    }
  };
  (window as any)[ONCLICK_HANDLER_NAME] = internalClickHandler;

  useEffect(() => {
    if (chart && chart.clean) {
      chart.clean();
    }

    const nodesCode = outputNodes(nodes);
    const connectionsCode = outputConnections(nodes);

    console.log(nodesCode);
    console.log(connectionsCode);

    chart = flowchart.parse(`
      ${nodesCode}
      ${connectionsCode}
    `);

    chart.drawSVG('canvas', {
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

  return <div id="canvas"></div>;
};
