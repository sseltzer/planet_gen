const tests = [
  './Unit.suite.js',
  './Integration.suite.js'
];

tests.map((test) => {
  describe(`Running test suite ${test}`, () => { require(test); });
});
