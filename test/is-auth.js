const expect = require('chai').expect;
const authMiddleware = require('../middleware/isAuth');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

describe('Test auth Middleware', () => {
  it('should throw 401 error if no auth header present', () => {
    const req = { get: () => null };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'No authorized Header'
    );
  });

  it('should failed if no split of string happens', () => {
    const req = { get: () => 'xyz' };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Could not decode token'
    );
  });

  it('should throw an error if the token is not verified', () => {
    const req = { get: () => 'Bearer XYZ' };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should throw error if not able to decode token', () => {
    const req = { get: () => 'Bearer uehfuibwibuuibcwe' };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Could not decode token'
    );
  });

  it('should return userId if decoded & matched successfully', () => {
    const req = { get: () => 'Bearer uehfuibwibuuibcwe' };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
