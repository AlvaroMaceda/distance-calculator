'use strict';

import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import distanceMatrix from '../app/distancematrix';

const FAKE_KEY = 'FAKEGoog1eAP1Key';

describe('Distance Matrix', () => {

    before(function(){
        this.distanceMatrix = distanceMatrix(FAKE_KEY);
    });

    afterEach(() => {
        fetchMock.restore();
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

        let url = `${this.distanceMatrix.API_HOST}${this.distanceMatrix.API_URL}?${new URLSearchParams(queryData).toString()}`;
        fetchMock.get(url, response);

        this.distanceMatrix.calculate(origin, destination, function(distanceData){
            expect(distanceData.distance).to.equal(distance);
            expect(distanceData.distanceText).to.equal(distanceText);
            expect(distanceData.duration).to.equal(duration);
            expect(distanceData.durationText).to.equal(durationText);
            done();
        });

    });

    xit('Throws an error when there is an error in the request', function() {

    });

    xit('Throws an error when there is an error code in the response', function() {

    });

    xit('Does not fail if place not found', function() {

    });

});
