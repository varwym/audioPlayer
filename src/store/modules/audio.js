import { discoverRequest } from "../api.js";
const state = {
    isPlay: false,
    audio: null,
    songList: null,
    index: 0,
    loadPercentage: 0,
    playId: null,
    songDetail: null
}

const getters = {
    getPlayState: state => state.isPlay,
    getAudio: state => state.audio
}

const actions = {
    startPlayer ({commit}) {
        commit(START_PLAYER);
    },
    pausePlayer ({commit}) {
        commit(PAUSE_PLAYER);
    },
    saveAudio ({commit}, audio) {
        commit(SAVE_AUDIO, audio);
    },
    addSongList ({commit}, list) {
        commit(ADD_SONGLIST, list);
    },
    loadSong ({commit}) {
        
    },
    nextSong() {
        
    }
}

const START_PLAYER = "START_PLAYER";
const PAUSE_PLAYER = "PAUSE_PLAYER";
const SAVE_AUDIO = "SAVE_AUDIO";
const ADD_SONGLIST = "ADD_SONGLIST";

const mutations = {
    [START_PLAYER] (state) {
        state.isPlay = true;
    },
    [PAUSE_PLAYER] (state) {
        state.isPlay = false;
    },
    [SAVE_AUDIO] (state, audio) {
        state.audio = audio;
    },
    [ADD_SONGLIST] (state, list) {
        state.index = 0;
        state.songList = list;
    }
}
export default {
    state,
    getters, 
    actions, 
    mutations
}