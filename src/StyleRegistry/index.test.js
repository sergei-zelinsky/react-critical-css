import StyleRegistry from './index';

it('should throw an error when try to register nothing', () => {
  const styleRegistry = new StyleRegistry();

  expect(() => styleRegistry.registerStyles()).toThrow();
});

it('should throw an error when try to register empty string', () => {
  const styleRegistry = new StyleRegistry();

  expect(() => styleRegistry.registerStyles('')).toThrow();
});

it('should throw an error when try to register not a string', () => {
  const styleRegistry = new StyleRegistry();

  expect(() => styleRegistry.registerStyles(null)).toThrow();
  expect(() => styleRegistry.registerStyles({})).toThrow();
  expect(() => styleRegistry.registerStyles(false)).toThrow();
  expect(() => styleRegistry.registerStyles(true)).toThrow();
  expect(() => styleRegistry.registerStyles(undefined)).toThrow();
  expect(() => styleRegistry.registerStyles(_ => _)).toThrow();
  expect(() => styleRegistry.registerStyles(/test/gi)).toThrow();
  expect(() => styleRegistry.registerStyles({css: 'body {color: red}'})).toThrow();

});

it('should return correct critical css', () => {
  const testCSS = 'body {color: red}';
  const styleRegistry = new StyleRegistry();

  styleRegistry.registerStyles(testCSS);

  const criticalCSSOne = styleRegistry.getCriticalCSS();

  expect(criticalCSSOne).toEqual(testCSS);

  styleRegistry.registerStyles(testCSS);

  const criticalCSSTwo = styleRegistry.getCriticalCSS();

  expect(criticalCSSTwo).toEqual(`${testCSS}${testCSS}`);
});
