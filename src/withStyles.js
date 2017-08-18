import React, {Component} from 'react';
import PropTypes from 'prop-types';

const __SERVER__ = typeof window === 'undefined';

const withStyles = (styles) => (WrappedComponent) => {
  return class extends Component{

    static contextTypes = {
      registerStyles: PropTypes.func
    };

    componentWillMount = () => {
      const {registerStyles} = this.context;
      if (__SERVER__){
        registerStyles && registerStyles(styles);
      }
    };

    render(){
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  }
};

export default withStyles;
