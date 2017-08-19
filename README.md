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
import {withStyles} from 'react-critical-css'; // import 'withStyles'
import s from './index.css'; // import your styles, `s` should contain a string with style rules (see example webpack config below)

class App extends Component {
  // ...
  
  render(){
    return (
      <div>App component example</div>
    );
  }
}

// wrap App component with 'withStyles'

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
```

## API

### StyleRegistry [Class]

#### Public API:
- **registerStyles** - adds styles into internal registry
- **getCriticalCSS** - returns critical stylesheets which has been registered through `registerStyles` previously 

#### Usage
```js
import {StyleRegistry} from 'react-critical-css';

// ...

const styleRegistry = new StyleRegistry();

// ..

styleRegistry.registerStyles('body {color: red}');  // <- register stylesheets

// ...

const criticalCSS = styleRegistry.getCriticalCSS() // <- retrieve critical CSS

```

### CriticalCSSProvider [React Component]

Passes context with registerStyles function through the React tree. 

#### Props
- **registry** - instance of StyleRegistry or other registry which supports the same API

### withStyles [Decorator]

Returns HOC which registers passed stylesheets.

#### Arguments of `withStyles`

- **styles** - string with CSS

#### Arguments of `withStyles(styles)`

- **Component** - React Component 

#### Usage

```js
// ...
import {withStyles} from 'react-critical-css';
import s from 'path/to/css/file';

// ...

class MyComponent extends Component {
  // ...
}

export default withStyles(s)(MyComponent);
```

or using `decorators`

```js
// ...
import {withStyles} from 'react-critical-css';
import s from 'path/to/css/file';

// ...

@withStyles(s)
class MyComponent extends Component {
  // ...
}

export default MyComponent;
```

