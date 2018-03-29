'use strict';

const server = require('../../../lib/server');
const superagent = require('superagent');
const mock = require('../../lib/mock');
const faker = require('faker');

const PORT = process.env.PORT;
const ENDPOINT_SIGNUP = `:${PORT}/api/v1/signup`;

describe('POST /api/v1/signup', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.user.removeAll);

  describe('Valid Requests', () => {
    beforeAll(() => {
      this.mockUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        homeAirport: faker.lorem.word(),
        email: faker.internet.email(),
      };
      return superagent.post(ENDPOINT_SIGNUP)
        .send(this.mockUser)
        .then(res => this.res = res)
        .catch(console.error);
    });

    it('should return a valid 201 CREATED status code', () => {
      expect(this.res.status).toEqual(201);
    });

    it('should return a valid token', () => {
      let tokenParts = this.res.body.split('.');
      let signature = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());
      let token = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

      expect(signature.typ).toEqual('JWT');
      expect(token).toHaveProperty('token');
    });
  });

  describe('Invalid Requests', () => {
    it('should return a 404 NOT FOUND status code', () => {
      this.mockUser = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        homeAirport: faker.lorem.word(),
        email: faker.internet.email(),
      };
      return superagent.post(`:${process.env.PORT}/api/v1/NOTFOUND`)
        .send(this.mockUser)
        .catch(err => expect(err.status).toEqual(404));
    });

    it('should return a 401 NOT AUTHORIZED status code', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/signup`)
        .send({})
        .catch(err => expect(err.status).toEqual(401));
    });

    it('should return a 409 DUPLICATE KEY status when creating a user that already exists', () => {
      return superagent.post(ENDPOINT_SIGNUP)
        .send(this.mockUser)
        .then(() => {
          return superagent.post(ENDPOINT_SIGNUP)
            .send(this.mockUser);
        })
        .catch(err => expect(err.status).toEqual(409));
    });
  });
});
