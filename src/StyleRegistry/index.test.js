import StyleRegistry from './index';

const firstCSSTestRule = 'body {background: red}';
const secondCSSTestRule = '.some-class-name {fontWeight: 600}';
const emptyCSSTestRule = '';


describe('StyleRegistry', () => {
  it('should register styles', () => {
    const styleRegistry = new StyleRegistry();

    styleRegistry.registerStyles(firstCSSTestRule);
    styleRegistry.registerStyles(secondCSSTestRule);

    const criticalCss = styleRegistry.getCriticalCSS();

    expect(criticalCss).toBe(
      [
        firstCSSTestRule,
        secondCSSTestRule
      ].join('')
    );
  });

  it('should not register empty styles', () => {
    const styleRegistry = new StyleRegistry();

    styleRegistry.registerStyles(firstCSSTestRule);
    styleRegistry.registerStyles(emptyCSSTestRule);
    styleRegistry.registerStyles(secondCSSTestRule);

    expect(styleRegistry.registry.length).toBe(2);
  
  });
    
  it('should not register the same styles', () => {
    const styleRegistry = new StyleRegistry();

    styleRegistry.registerStyles(firstCSSTestRule);
    styleRegistry.registerStyles(firstCSSTestRule);

    const criticalCss = styleRegistry.getCriticalCSS();

    expect(criticalCss).toEqual(firstCSSTestRule);
  });

  it('should use transformFn for styles transformation', () => {
    const transformFn = str => str.replace(/\s/g, '');
    const styleRegistry = new StyleRegistry(transformFn);

    styleRegistry.registerStyles(firstCSSTestRule);

    const criticalCss = styleRegistry.getCriticalCSS();
    const transformedFirstCSSTestRule = transformFn(firstCSSTestRule);    

    expect(criticalCss).toEqual(transformedFirstCSSTestRule);
  })

});
