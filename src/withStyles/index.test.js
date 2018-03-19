/**
 * @jest-environment node
 */

import React from 'react';
import withStyles from './index';
import {renderToString} from 'react-dom/server';
import CriticalCSSProvider from '../CriticalCSSProvider';
import StyleRegistry from '../StyleRegistry';

const TestComponent = () => (<div/>);

describe('withStyles', () => {

  it('should register stylesheets', () => {
    const TestComponentStyles = 'body {color: red}';
    const styleRegistry = new StyleRegistry();
    const TestComponentWithStyles = withStyles(TestComponentStyles)(TestComponent);
    const root = (
      <CriticalCSSProvider registry={styleRegistry}>
        <TestComponentWithStyles/>
      </CriticalCSSProvider>
    );
  
    renderToString(root);
  
    const criticalCSS = styleRegistry.getCriticalCSS();
  
    expect(criticalCSS).toEqual(TestComponentStyles);
  });
  
});
