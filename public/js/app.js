// this file will contain all of our Vue code!

import * as Vue from "./vue.js";
// createApp takes an object as argument
// Vue code is connected to index.html #main is telling it where to look
Vue.createApp({
    data() {
        return {
            name: "images",
            // visible: false,
            images: [],
        };
    }, // data ends
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
        // this is where we define all of OUR functions
        myFirstFunction: function (images) {
            console.log("myFirstFunction is running", images);
        },
    },
}).mount("#main");
