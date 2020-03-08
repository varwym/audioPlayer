import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials=true;

const discoverRequest = {
    //首页轮播
    getBanner: () => {
        return axios.get('/banner?type=1')
    },
    //推荐歌单
    getSongList: (num) => {
        if (num) 
            return axios.get(`/personalized?limit=${num}`)
        return axios.get('/personalized')
    },
    getSongDetail: (id) => {
        return axios.get(`/playlist/detail?id=${id}`)
    },
    getRankList:() => {
        return axios.get('/toplist/detail')
    },
    getSong: (id) => {
        return axios.get(`/song/url?id=${id}`)
    },
    getCatlist: () => {
        return axios.get('/playlist/catlist')
    },
    getHotlist: () => {
        return axios.get('/playlist/hot');
    },
    getDayRecommend: () => {
        return axios.get('/recommend/songs')
    },
    getRelated: (id) => {
        return axios.get(`/related/playlist?id=${id}`)
    },
    getPlaylist: (cat, updateTime) => {
        return axios.get(`/top/playlist?cat=${cat}&limit=30&before=${updateTime ? updateTime : ""}`)
    }
}
const videoRequest = {
    //视频分组
    getVideoGroup: () => {
        return axios.get('/video/group/list')
    },
    //查询分组下视频列表
    getVideoList: (id) => {
        return axios.get(`/video/group?id=${id}`)
    }
}
const loginRequest = {
    //登录获取cookie
    goLogin:(params) => {
        return axios.get(`/login/cellphone?phone=${params.phoneNumber}&password=${params.password}`)
    },
    //获取登录状态
    getStatus:() => {
        return axios.get('/login/status')
    }
}

export {
    discoverRequest,
    videoRequest,
    loginRequest
}