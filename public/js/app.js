// this file will contain all of our Vue code!

import * as Vue from "./vue.js";
import firstComponent from "./first-component.js";
// createApp takes an object as argument
// Vue code is connected to index.html #main is telling it where to look
Vue.createApp({
    data() {
        return {
            images: [],
            user: "",
            title: "",
            // visible: false,
            image: null,
        };
    }, // data ends
    components: {
        firstComponent: firstComponent,
    },
    // function that runs anytime.....
    mounted() {
        //location to ask/check if any img should be retrieved in our database
        //use fetch here
        console.log("my vue app has mounted");
        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response from images:", data);
                this.images = data;
            });
    },
    methods: {
        changeFile(e) {
            this.image = e.target.files[0];
            console.log(this.user);
        },
        handleSubmit(e) {
            // e.preventDefault(); (if you don't use @submit.prevent)
            console.log("HANDLE SUBMIT");
            const formData = new FormData(e.target);

            // formData.append("user", this.user);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    this.images.unshift(data.payload[0]);
                    console.log(data);
                })
                .catch((err) => {
                    console.log("err handleSubmit", err);
                });
            // .then((res) => res.json())
            // .then((data) => {
            //     console.log(data);
            // });
        },
    },
}).mount("#main");
