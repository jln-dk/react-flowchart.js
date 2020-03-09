import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Flowchart } from '../src';

describe('Flowchart', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Flowchart nodes={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
