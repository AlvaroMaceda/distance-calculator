function encodeData(data) {
    return Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

const DEFAULT_MODE = 'driving';

class DistanceMatrix {

    #mode;
    #origin;

    constructor(key, mode, origin) {
        this.#mode = mode || DEFAULT_MODE;
        this.#origin = origin;
        this.setKey(key);
    }

    setKey(key) {
        this.key = key;
    }

    // A test to include departure time, but it doesn't matter very much (+-5m max)
    departureTime() {
        const a_monday_at_9_am = '2021-10-11 09:00';
        const departure = new Date(a_monday_at_9_am);
        const secondsSinceEpoch = Math.round(departure.getTime() / 1000);

        return secondsSinceEpoch;
    }

    requestData(origin, destination) {
        return {
            units: 'metric',
            key: this.key,
            origins: origin,
            destinations: destination,
            mode: this.#mode,
            // departure_time: departure_time
        };
    }

    async calculate(origin, destination, callback) {
        // const departure_time = this.departureTime();

        let data = this.requestData(origin || this.#origin, destination);
        let url = this.API_HOST + this.API_URL + '?' + encodeData(data);

        let response = await fetch(url);
        if(!response.ok) throw new Error(response.statusText);

        let body = await response.json();

        if (body.status !== 'OK') throw new Error(body.error_message);

        let distanceData = {};

        if (body.rows[0].elements[0].status === 'OK') {
            distanceData = {
                distance: body.rows[0].elements[0].distance.value,
                distanceText: body.rows[0].elements[0].distance.text,
                duration: body.rows[0].elements[0].duration.value,
                durationText: body.rows[0].elements[0].duration.text
            };
        }

        callback(distanceData);

    }
}
DistanceMatrix.prototype.API_HOST = 'https://maps.googleapis.com';
DistanceMatrix.prototype.API_URL = '/maps/api/distancematrix/json';

export default DistanceMatrix;
