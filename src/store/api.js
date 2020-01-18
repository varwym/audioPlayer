import axios from 'axios';
let devServer = 'http://localhost:3000';
axios.defaults.baseURL = 'http://localhost:3000';

const discoverRequest = {
    getBanner: () => {
        return axios.get('/banner?type=1');
    }
}
export {
    discoverRequest
}