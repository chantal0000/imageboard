const firstComponent = {
    data() {
        return {
            heading: "first component",
            count: 1,
            greetee: "",
        };
    },
    mounted() {
        console.log("first component mounted");
    },
    method: {
        increaseCount() {
            console.log("count user wants to count");
            this.count++;
        },
    },
    template: `<div>
                    <h1>I am your first component</h1>
                    <h2> count is: {{count}} </h2>
                    <button @click="increaseCount"> increase count </button>
                </div>`,
};

// export, tell app.js what it consists of
export default firstComponent;
