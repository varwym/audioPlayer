export const itemMixins = {
    data() {
        return {
            height: "50px"
        }
    },
    methods: {
        setHeight() {
            this.height = `${this.$refs.img.offsetHeight - 5}px`;
        }  
    },
    mounted() {
        window.addEventListener("resize", this.setHeight);
        this.$refs.img.onload = function () {
            this.setHeight();
        }.bind(this)
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHeight);
    }
}