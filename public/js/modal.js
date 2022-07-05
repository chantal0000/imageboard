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
        <button id="button-close" @click="close"></button>
       <div id="box-right">
        <h3>title: {{img.title}}</h3>
        <h3>user: {{img.username}}</h3>
        <h3>description: {{img.description}}</h3>
       </div> 
       <div id="box-left"> 
        <img id="selectedImg" v-bind:src="img.url">
       </div> 

    </div>
      `,
};

export default modal;
