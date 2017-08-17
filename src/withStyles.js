import React, {Component} from 'react';
import PropTypes from 'prop-types';

const withStyles = (styles) => (WrappedComponent) => {
  return class extends Component{

    static contextTypes = {
      registerStyles: PropTypes.func
    };

    componentWillMount = () => {
      const {registerStyles} = this.context;
      if (typeof window === 'undefined'){
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
