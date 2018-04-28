const Dice = require('../../../../app/utilities/Dice');

const chai  = require('chai');
const expect = chai.expect;
chai.use(require('chai-things'));

describe(`${__filename}`, () => {
  it('should generate known dice values based on a seed {1d6} {test}', (done) => {
    let d = new Dice('test');
    let expected = [6, 3, 6, 2, 3];
    for (var i = 0; i < expected.length; i++) expect(d.roll().one().d6()).to.be.equal(expected[i]);
    done();
  });

  it('should generate known dice values based on a seed {1d6} {test} {rollCommonName}', (done) => {
    let d = new Dice('test');
    let expected = [6, 3, 6, 2, 3];
    for (var i = 0; i < expected.length; i++) expect(d.rollCommonName('1d6')).to.be.equal(expected[i]);
    done();
  });

  it('should generate known dice values based on a seed {2d6} {test}', (done) => {
    let d = new Dice('test');
    let expected = [9, 8, 5, 4, 8];
    for (var i = 0; i < expected.length; i++) expect(d.roll().two().d6()).to.be.equal(expected[i]);
    done();
  });

  it('should generate known dice values based on a seed {1d6} {test} {rollCommonName}', (done) => {
    let d = new Dice('test');
    let expected = [9, 8, 5, 4, 8];
    for (var i = 0; i < expected.length; i++) expect(d.rollCommonName('2d6')).to.be.equal(expected[i]);
    done();
  });

  it('should generate known dice values based on a seed {3d6} {test}', (done) => {
    let d = new Dice('test');
    let expected = [15, 7, 9, 12, 12];
    for (var i = 0; i < expected.length; i++) expect(d.roll().three().d6()).to.be.equal(expected[i]);
    done();
  });

  it('should generate known dice values based on a seed {1d6} {test} {rollCommonName}', (done) => {
    let d = new Dice('test');
    let expected = [15, 7, 9, 12, 12];
    for (var i = 0; i < expected.length; i++) expect(d.rollCommonName('3d6')).to.be.equal(expected[i]);
    done();
  });

  it('should generate known dice values based on a seed 1d6} {debug}', (done) => {
    let d = new Dice('debug');
    let expected = [6, 4, 4, 6, 1];
    for (var i = 0; i < expected.length; i++) expect(d.roll().one().d6()).to.be.equal(expected[i]);
    done();
  });
});
