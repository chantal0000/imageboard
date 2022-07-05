// this file will contain all of our Vue code!

import * as Vue from "./vue.js";
import modal from "./modal.js";
// createApp takes an object as argument
// Vue code is connected to index.html #main is telling it where to look
Vue.createApp({
    data() {
        return {
            name: "images",
            images: [],
            imageSelected: null,
            smallestId: null,
            firstPicture: null,
        };
    }, // data ends
    components: {
        modal: modal,
    },
    mounted() {
        fetch("/lowestId")
            .then((resp) => resp.json())
            .then((data) => {
                this.firstPicture = data[0].id;
            });
        //location to ask/check if any img should be retrieved in our database
        //use fetch here
        console.log("my vue app has mounted");
        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("response from images:", data);
                this.images = data;
                this.smallestId = this.images[this.images.length - 1].id;
            });
    },
    methods: {
        setImageSelected(id) {
            this.imageSelected = id;
            console.log("id", id);
        },
        close() {
            this.imageSelected = null;
        },

        handleSubmit(e) {
            console.log("HANDLE SUBMIT");
            const formData = new FormData(e.target);
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    console.log(data);
                    this.images.unshift(data.payload);
                    console.log(this.images);
                })
                .catch((err) => {
                    console.log("err handleSubmit", err);
                });
        },

        loadImages() {
            fetch("/loadImages/" + this.smallestId)
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    // console.log(data);
                    data.forEach((element) => {
                        this.images.push(element);
                    });
                    this.smallestId = this.images[this.images.length - 1].id;
                })
                .catch((err) => {
                    console.log("err in loadImages app.js", err);
                });
        },
    },
}).mount("#main");
