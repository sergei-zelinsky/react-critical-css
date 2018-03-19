import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default typeof window === 'undefined'
  ? (
      styles => (
        WrappedComponent => (
          class extends Component {
            
            static contextTypes = {
              registerStyles: PropTypes.func
            };
        
            componentWillMount = () => {
              const {registerStyles} = this.context;
        
              if (registerStyles){
                registerStyles(styles);
              }
            };
        
            render(){
              return (
                <WrappedComponent
                  {...this.props}
                />
              );
            }
          }
        )
      )
  )
  : (() => _ => _);
