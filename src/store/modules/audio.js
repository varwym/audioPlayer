import { discoverRequest } from "../api.js";
class song {
    constructor() {
        
    }
}
const state = {
    showState: 0,
    playerState: 0,
    isPlay: false,
    songList: null,
    index: 0,
    loadPercentage: 0
}

const getters = {
    getPlayState: state => state.isPlay,
    getAudio: state => state.audio
}

const actions = {
    checkShowState ({commit}, type) {
        commit(CHECK_SHOWSTATE, type);
    },
    startPlayer ({commit}) {
        commit(START_PLAYER);
    },
    pausePlayer ({commit}) {
        commit(PAUSE_PLAYER);
    },
    addSongList ({commit}, list) {
        commit(ADD_SONGLIST, list);
    },
    lastSong ({commit}) {
        commit(LAST_SONG);
    },
    nextSong({commit}) {
        commit(NEXT_SONG);
    }
}
const CHECK_SHOWSTATE = "CHECK_SHOWSTATE";
const START_PLAYER = "START_PLAYER";
const PAUSE_PLAYER = "PAUSE_PLAYER";
const ADD_SONGLIST = "ADD_SONGLIST";
const LAST_SONG = "LAST_SONG";
const NEXT_SONG = "NEXT_SONG";

const mutations = {
    [CHECK_SHOWSTATE] (state, type) {
        state.showState = type;
    },
    [START_PLAYER] (state) {
        state.isPlay = true;
    },
    [PAUSE_PLAYER] (state) {
        state.isPlay = false;
    },
    [ADD_SONGLIST] (state, list) {
        state.index = 0;
        state.songList = list;
    },
    [LAST_SONG] (state) {
        if (state.index !== 0) {
            --state.index;
        } else {
            state.index = state.songList.length - 1;
        }
    },
    [NEXT_SONG] (state) {
        if (state.index === state.songList.length - 1) {
            state.index = 0;
        } else {
            ++state.index;
        }
    }
}
export default {
    state,
    getters, 
    actions, 
    mutations
}