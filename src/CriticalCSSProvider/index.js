import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CriticalCSSProvider extends Component {
  getChildContext() {
    const {registerStyles} = this.props.registry;
    return {
      registerStyles,
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
