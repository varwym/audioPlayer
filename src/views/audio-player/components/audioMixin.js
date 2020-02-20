import { discoverRequest } from "../../../store/api.js";
import { mapActions } from "vuex";
import { mapState } from "vuex";
export const audioMixin = {
    methods: {
        playSong(id) {
            discoverRequest.getSong(id)
                .then(res => {
                    if (res.status === 200) {
                        let au = document.querySelector("#audioPlayer");
                        au.src = res.data.data[0].url;
                        au.play();
                        this.startPlayer();
                    }
                })
        },
        
        ...mapActions(["startPlayer"])
    }
}