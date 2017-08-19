/**
 * @jest-environment node
 */

import React from 'react';
import withStyles from './index';
import {renderToString} from 'react-dom/server';
import CriticalCSSProvider from '../CriticalCSSProvider';
import StyleRegistry from '../StyleRegistry';

const TestComponent = () => (<div/>);

it('should throw an error when missing styles', () => {
  expect(() => withStyles()(TestComponent)).toThrow();
});

it('should throw an error when passing empty string', () => {
  expect(() => withStyles('')(TestComponent)).toThrow();
});

it('should throw an error when not a string', () => {
  expect(() => withStyles(null)(TestComponent)).toThrow();
  expect(() => withStyles(false)(TestComponent)).toThrow();
  expect(() => withStyles(undefined)(TestComponent)).toThrow();
  expect(() => withStyles(_ => _)(TestComponent)).toThrow();
  expect(() => withStyles(/test/gi)(TestComponent)).toThrow();
  expect(() => withStyles({css: 'body {color: red}'})(TestComponent)).toThrow();
});

it('should register stylesheets correctly', () => {
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
