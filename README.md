# react-critical-css

Extracts your critical CSS.

## Installation

```
npm install react-critical-css
```

or

```
yarn add react-critical-css
```

## Usage

```js
// ...
import {renderToString} from 'react-dom/server';
import {CriticalCSSProvider, StyleRegistry} from 'react-critical-css'; // <-

// ...

const styleRegistry = new StyleRegistry(); // create new style registry

const appString = renderToString(
    <CriticalCSSProvider registry={styleRegistry}> // <- wrap your App component with CriticalCSSProvider and pass styleRegistry to it
      <App/>
    </CriticalCSSProvider>
);

const criticalCSS = styleRegistry.getCriticalCSS(); // <- extract collected critical CSS

```

#### App component example:

```js
import React, {Component} from 'react';
import {withStyles} from 'react-critical-css'; // import 'withStyles' HOC
import s from './index.css'; // import your styles, `s` should contain a string with style rules (see example webpack config below)

class App extends Component {
  // ...
  
  render(){
    return (
      <div>App component example</div>
    );
  }
}

// wrap App component with 'withStyles' HOC

export default withStyles(s)(App);

```

### Example Webpack configuration for CSS files

```js
// ...

module.exports = {
// ...
  
  module: {
  // ...
    
    rules: [
    // ...
    
    {
        test: /\.css$/,
        loader: 'css-loader',
        // ...
      }
    ]
  }
};
