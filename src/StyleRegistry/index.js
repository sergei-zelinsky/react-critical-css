class StyleRegistry {
  registry = [];

  registerStyles = (styles) => this.registry.push(styles);

  getCriticalCSS = () => this.registry.join('\n');
}

export default StyleRegistry;
