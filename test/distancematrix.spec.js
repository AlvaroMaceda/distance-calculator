'use strict';

const expect = require('chai').expect;
const nock   = require('nock');
const request = require('request');

const FAKE_KEY = 'FAKEGoog1eAP1Key';

describe('Distance Matrix', () => {

    before(function(){
        this.distanceMatrix = require('../app/distancematrix')(FAKE_KEY);
    });

    it('Returns distance between two points', function(done) {

        let origin = 'Lepe';
        let destination = 'Calahorra';

        let queryData = {
            units: 'metric',
            key: this.distanceMatrix.key,
            origins: origin,
            destinations: destination
        };

        let distance = 993974;
        let distanceText = "994 km";
        let duration = 32432;
        let durationText = "9h 1 min";

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
                                "text": distanceText,
                                "value": distance
                            },
                            "duration": {
                                "text": durationText,
                                "value": duration
                            },
                            "status": "OK"
                        }
                    ]
                }
            ],
            "status": "OK"
        };

        let url = '/';
        nock( this.distanceMatrix.API_HOST)
            .get(this.distanceMatrix.API_URL)
            .query(queryData)
            .reply(200, response);


        this.distanceMatrix.calculate(origin, destination, function(distanceData){
            expect(distanceData.distance).to.equal(distance);
            expect(distanceData.distanceText).to.equal(distanceText);
            expect(distanceData.duration).to.equal(duration);
            expect(distanceData.durationText).to.equal(durationText);
            done();
        })

    });


});
