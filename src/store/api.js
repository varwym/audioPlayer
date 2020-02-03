import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials=true;

const discoverRequest = {
    //首页轮播
    getBanner: () => {
        return axios.get('/banner?type=1');
    }
}
const videoRequest = {
    //视频分组
    getVideoGroup: () => {
        return axios.get('/video/group/list');
    },
    //查询分组下视频列表
    getVideoList: (id) => {
        return axios.get(`/video/group?id=${id}`);
    }
}
export {
    discoverRequest,
    videoRequest
}