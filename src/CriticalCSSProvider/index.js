import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CriticalCSSProvider extends Component {
  getChildContext() {
    const {registry} = this.props;
    return {
      registerStyles: (styles) => registry.registerStyles(styles),
    }
  }
  render(){
    return this.props.children;
  }
}

CriticalCSSProvider.propTypes = {
  registry: PropTypes.shape({
    registerStyles: PropTypes.func.isRequired
  })
};

CriticalCSSProvider.childContextTypes = {
  registerStyles: PropTypes.func.isRequired,
};

export default CriticalCSSProvider;
