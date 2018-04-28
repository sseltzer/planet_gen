const tests = [
];

tests.map((test) => {
  describe(`Running test suite ${test}`, () => { require(test); });
});
