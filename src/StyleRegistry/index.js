const SYMBOLS = {
  REGISTRY: Symbol('@style-registry/registry'),
  TRANSFORM_FN: Symbol('@style-registry/transform-fn')
};

const RULES_SEPARATOR = '';

const DEFAULT_TRANSFORM_FN = _ => _;

class StyleRegistry {

  constructor(transformFn = DEFAULT_TRANSFORM_FN){
    this[SYMBOLS.TRANSFORM_FN] = transformFn;
  }

  [SYMBOLS.REGISTRY] = [];

  get registry(){
    return this[SYMBOLS.REGISTRY];
  }

  get transformFn(){
    return this[SYMBOLS.TRANSFORM_FN];
  }

  registerStyles = (...styles) => {

    styles.forEach(style => {
      
      const shouldStyleBeRegistered = (
        !!style && this.registry.indexOf(style) === -1
      );
  
      if (shouldStyleBeRegistered){
        const transformedStyle = this.transformFn(style);

        this.registry.push(transformedStyle);
      }
    })

  };

  getCriticalCSS = () => this.registry.join(RULES_SEPARATOR);
}

export default StyleRegistry;
