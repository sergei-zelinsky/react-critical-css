/**
 * @jest-environment node
 */

import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
import PropTypes from 'prop-types';
import CriticalCSSProvider from '../CriticalCSSProvider';
import StyleRegistry from '../StyleRegistry';

class TestComponentWithContext extends Component {
  static contextTypes = {
    registerStyles: PropTypes.func
  };

  componentWillMount(){
    const {onComponentWillMount} = this.props;
    onComponentWillMount(this.context);
  }

  render(){
    return (
      <div>Test Component With Context</div>
    );
  }
}

function renderRootComponent(styleRegistry, onMountCallback){
  return renderToString(
    <CriticalCSSProvider registry={styleRegistry}>
      <TestComponentWithContext
        onComponentWillMount={onMountCallback}
      />
    </CriticalCSSProvider>
  );
}

it('children can access context created by CriticalCSSProvider', () => {
  const styleRegistry = new StyleRegistry();

  renderRootComponent(styleRegistry, (context) => {
    expect(context).not.toBeFalsy()
  });
});

it('should pass right context to the children', () => {
  const mockedRegisterStylesFn = jest.fn();
  const mockedStyleRegistry = {
    registerStyles: mockedRegisterStylesFn
  };

  renderRootComponent(mockedStyleRegistry, (context) => {
    expect(context).toEqual({
      registerStyles: mockedRegisterStylesFn
    });
  })
});

it('registerStyles should be a function', () => {
  const styleRegistry = new StyleRegistry();

  renderRootComponent(styleRegistry, (context) => {
    expect(typeof context.registerStyles === 'function').toBe(true);
  })
});
