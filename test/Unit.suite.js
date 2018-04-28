const tests = [
  './unit/app/utilities/Dice.test.js',
];

tests.map((test) => {
  describe(`Running test suite ${test}`, () => { require(test); });
});
