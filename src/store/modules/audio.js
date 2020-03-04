class Song {
    constructor(song) {
        this.name = song.name || "";
        this.picUrl = song.picUrl || "";
        this.id = song.id || "";
        this.singer = song.singer || "";
    }
}
const state = {
    song: new Song({}),
    showState: -1,
    playerState: 0,
    isPlay: false,
    songList: null,
    index: null,
    loadPercentage: 0
}

const getters = {
    getPlayState: state => state.isPlay,
    getAudio: state => state.audio
}

const actions = {
    checkPlayerState ({commit}, type) {
        commit(CHECK_PLAYERSTATE, type);
    },
    checkShowState ({commit}, type) {
        commit(CHECK_SHOWSTATE, type);
    },
    checkIndex ({commit}, index) {
        commit(CHECK_INDEX, index);
    },
    startPlayer ({commit}) {
        commit(START_PLAYER);
    },
    pausePlayer ({commit}) {
        commit(PAUSE_PLAYER);
    },
    addSongList ({commit}, params) {
        commit(ADD_SONGLIST, params);
    },
    lastSong ({commit}) {
        commit(LAST_SONG);
    },
    nextSong({commit}) {
        commit(NEXT_SONG);
    }
}

const CHECK_PLAYERSTATE = "CHECK_PLAYERSTATE"; 
const CHECK_SHOWSTATE = "CHECK_SHOWSTATE";
const CHECK_INDEX = "CHECK_INDEX";
const START_PLAYER = "START_PLAYER";
const PAUSE_PLAYER = "PAUSE_PLAYER";
const ADD_SONGLIST = "ADD_SONGLIST";
const LAST_SONG = "LAST_SONG";
const NEXT_SONG = "NEXT_SONG";

const mutations = {
    [CHECK_PLAYERSTATE] (state, type) {
        state.playerState = type;
    },
    [CHECK_SHOWSTATE] (state, type) {
        state.showState = type;
    },
    [CHECK_INDEX] (state, index) {
        state.song = new Song(state.songList[index]);
        state.index = index;
    },
    [START_PLAYER] (state) {
        state.isPlay = true;
    },
    [PAUSE_PLAYER] (state) {
        state.isPlay = false;
    },
    [ADD_SONGLIST] (state, params) {
        if (state.showState === -1) {
            state.showState = 0;
        }
        state.index = params.index;
        state.song = new Song(params.list[params.index]);
        state.songList = params.list;
    },
    [LAST_SONG] (state) {
        if (state.index !== 0) {
            --state.index;
        } else {
            state.index = state.songList.length - 1;
        }
        state.song = new Song(state.songList[state.index]);
    },
    [NEXT_SONG] (state) {
        if (state.index === state.songList.length - 1) {
            state.index = 0;
        } else {
            ++state.index;
        }
        state.song = new Song(state.songList[state.index]);
    }
}
export default {
    state,
    getters, 
    actions, 
    mutations
}