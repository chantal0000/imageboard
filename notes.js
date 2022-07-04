//______________________________________PART 1___________________________________________

// // HTML

// <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <title>Image Board</title>
//     <link rel="stylesheet" href="/css/style.css">
// </head>
// <body>
//     <h1>My Imageboard</h1>
// <!-- this container is for our Vue Instance! -->
//     <div id="main">
//         <h2>Hi {{name}}! Vue is awesome?</h2>
//         <h2>10 * 8 = {{10*8}}</h2>
//         <h2>Name is {{name.toUpperCase()}}</h2>
//         <!-- conditional rendering/ if statement -->
//         <!-- in app.js visible: true therefore you can see h3 -->
//         <h3 v-if="visible">yay you can see me!</h3>
//         <!-- else statment -->
//         <h3 v-else>"visible" is falsey</h3>
//         <!-- looping -->
//         <h2>Cities:</h2>
//         <ul v-if="cities.length">
//             <!-- v-bind:key refers to id in app.js object -->
//             <li v-for="city in cities" v-bind:key="city.id" @click="myFirstFunction(city.name)">
//                 {{city.name}} is in {{city.country}}
//             </li>
//         </ul>
//     </div>

//     <script src="/js/app.js" type="module" crossorigin="use-credentials"></script>
// </body>
// </html>

//______________________________________PART 3___________________________________________
//componants
// mini vue instance

// html -> <first-component></first-component> -> you can name it anything, no camelCase in html

//______________________________________PART 4___________________________________________
// pagination
// we want a set of tweets/ info like 50 and then at the end again 50, not all of them because it would take to
// render all of them

// query part 1 select LIMIT 10 or any number you want
// ANOTHER QUERY offset appraoch, count how many img on screen
// OTHER APPROACH (if you want to use delete feature):
//

// COMMENTS: when modal opens you can add comments, comment &username
