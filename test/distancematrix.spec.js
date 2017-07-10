'use strict';


const expect = require('chai').expect;
const nock   = require('nock');


const util = require('util');

describe('Distance Matrix', () => {

    it('testing nock', function(done) {

        let request = require('request');

        nock('http://google.es')
            .get('/foo')
            .reply(200, 'some message');

        request.get({
            url: 'http://google.es/foo',
            headers: {
            }
        }, function(err, res, body) {
            expect(res.statusCode).to.equal(200);
            expect(body).to.equal('some message');
            done();
        });

    });

});
