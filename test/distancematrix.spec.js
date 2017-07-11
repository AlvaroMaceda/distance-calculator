'use strict';


const expect = require('chai').expect;
const nock   = require('nock');
const request = require('request');
// const util = require('util');


const FAKE_KEY = 'FAKEGoog1eAP1Key';

function encodeData(data) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

describe('Distance Matrix', () => {

    before(function(){
        this.distanceMatrix = require('../app/distancematrix')(FAKE_KEY);
    });

    it('Returns distance between two points', function(done) {

        let origin = 'Lepe';
        let destination = 'Calahorra';

        let data = {
            units: 'metric',
            key: this.key,
            origins: origin,
            destinations: destination
        };

        let distance = 993974;
        let time = 32432;
        let response = {
            "destination_addresses": [
                "26500 Calahorra, La Rioja, España"
            ],
            "origin_addresses": [
                "21440 Lepe, Huelva, España"
            ],
            "rows": [
                {
                    "elements": [
                        {
                            "distance": {
                                "text": "994 km",
                                "value": distance
                            },
                            "duration": {
                                "text": "9h 1 min",
                                "value": time
                            },
                            "status": "OK"
                        }
                    ]
                }
            ],
            "status": "OK"
        };

        let url = encodeData(data);
        nock( this.distanceMatrix.API_URL)
            .get(url)
            .reply(200, response);

        this.distanceMatrix.calculate(origin, destination, function(returnedDistance, returnedTime){
            expect(returnedDistance).to.equal(distance);
            expect(returnedTime).to.equal(time);
            done();
        })

    });

    it('testing nock2', function(done) {

        nock('https://maps.googleapis.com/maps/api/distancematrix/json')
            .get('?units=metric&origins=&destinations=&key=')
            .reply(200, {hola:"caracola"});

        let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=&destinations=&key=';
        request.get({
            url: url,
            json: true
        }, function(err, res, body) {
            expect(res.statusCode).to.equal(200);
            expect(body).to.deep.equal({hola:"caracola"});
            done();
        });
    });

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
