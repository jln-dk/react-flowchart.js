import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Flowchart, Node } from '../.';

const App = () => {
  const nodes: Node[] = [
    {
      type: 'start',
      id: 'start',
      label: 'Start flow',
      connection: {
        id: 'cond1',
        position: 'bottom',
      },
    },
    {
      type: 'condition',
      id: 'cond1',
      label: 'True or false?',
      connections: {
        yes: {
          id: 'dummy',
          position: 'right',
        },
        no: {
          id: 'op1',
          position: 'bottom',
        },
      },
    },
    {
      type: 'operation',
      id: 'op1',
      label: 'Foo operation',
    },
    {
      type: 'inputoutput',
      id: 'dummy',
      label: 'Dummy',
      connection: {
        id: 'end',
        position: 'bottom',
      },
    },
    {
      type: 'end',
      id: 'end',
      label: 'End flow',
    },
  ];

  const config: FlowchartConfig = {
    lineWidth: 3,
    yesText: 'Yes!',
    noText: 'No',
  };

  const styles = {
    condition: {
      fill: 'lightyellow',
    },
    operation: {
      fill: 'lightblue',
      'font-color': 'red',
    },
    inputoutput: {
      fill: 'green',
      'font-color': 'white',
    },
  };

  return (
    <div>
      <h1>Flowchart example</h1>
      <Flowchart nodes={nodes} config={config} styles={styles} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
