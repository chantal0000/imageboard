const modal = {
    data() {
        return {
            title: "",
            description: "",
            user: "",
            img: {},
        };
    },
    props: ["selected-img"],

    mounted() {
        console.log("modal component mounted");
        console.log("this.selectedImg", this.selectedImg);
        //here fetch machen
        fetch(`/img/${this.selectedImg}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.img = data;
                console.log("response images", data);
            });
    },
    methods: {
        close() {
            console.log("i want to let app.js know it should do sth");

            this.$emit("close");
        },
    },

    template: `
    <div id="pop-up">
        <button id="button-close" @click="close">X</button>
        <h3>{{img.title}}</h3>
        <h3>{{img.username}}</h3>
        <h3>{{img.description}}</h3>
        
        <h3>{{img.selectedImg}}</h3>
        <img id="selectedImg" v-bind:src="img.url">
       

    </div>
      `,
};

export default modal;
