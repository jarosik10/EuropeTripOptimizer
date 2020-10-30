import axios from 'axios';

const axiosIstance = axios.create({
    headers: {
        common: {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Content-Type': 'application/json',
        }
    }
});

export default axiosIstance;