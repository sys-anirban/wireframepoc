const expect = require('chai').expect;
const userController = require('../controller/user');
const sinon = require('sinon');
const UserModel = require('../models/user');
const UserDetailsModel = require('../models/userdetails');
const OfficialSchema = require('../models/officialdetails');
const TeamSchema = require('../models/teams');

describe('Test user controller', () => {
  describe('Login method', () => {
    it('should throw error if data base fails', (done) => {
      sinon.stub(UserModel, 'findOne');
      UserModel.findOne.throws();

      const req = {
        body: {
          emailid: 'test@admin.com',
          password: 'abcd1234',
        },
      };
      userController
        .login(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.undefined;
          done();
        })
        .catch(done);
      UserModel.findOne.restore();
    });
  });

  describe('userdetails method', () => {
    it('should throw error if data base fails', (done) => {
      sinon.stub(UserDetailsModel, 'findOne');
      UserDetailsModel.findOne.throws();

      const req = {
        headers: {
          emailid: 'test@admin.com',
        },
      };
      userController
        .userdetails(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.undefined;
          done();
        })
        .catch(done);
      UserDetailsModel.findOne.restore();
    });
  });

  describe('officialdetails method', () => {
    it('should throw error if data base fails', (done) => {
      sinon.stub(OfficialSchema, 'findOne');
      OfficialSchema.findOne.throws();

      const req = {
        headers: {
          emailid: 'test@admin.com',
        },
      };
      userController
        .officialdetails(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.undefined;
          done();
        })
        .catch(done);
      OfficialSchema.findOne.restore();
    });
  });

  describe('Team method', () => {
    it('should throw error if data base fails', (done) => {
      sinon.stub(TeamSchema, 'findOne');
      TeamSchema.findOne.throws();

      const req = {};
      userController
        .teammembers(req, {}, () => {})
        .then((result) => {
          expect(result).to.be.undefined;
          done();
        })
        .catch(done);
      TeamSchema.findOne.restore();
    });
  });
});
