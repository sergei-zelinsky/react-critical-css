class StyleRegistry {
  registry = [];

  registerStyles = (styles) => {
    if (typeof styles !== 'string' || !styles){
      throw new Error('Value passed to registerStyles should be a string');
    }
    this.registry.push(styles);
  };

  getCriticalCSS = () => this.registry.join('');
}

export default StyleRegistry;
