// const express = require("express");
// const app = express();
// const hb = require("express-handlebars");
//
// const teachers = require("./data.json");
//
// console.log(teachers);
//
// //this configures exress to use express-handlebars
// app.engine("handlebars", hb());
// app.set("view engine", "handlebars");
//
// app.use(express.static("./projects"));
//
// app.get("/", (req, res) => {
//     res.render("home", {
//         layout: "main",
//         //data we're sending to our 'home' template
//         cohort: "Allspice",
//         //sending an array of objects to mu home template
//         teachers
//     });
// });
//
// app.get("/about", (req, res) => {
//     res.render("about", {
//         layout: "main",
//         emojies: ["la", "li", "lu", "💁🏼‍♂️"],
// helpers: {
//     exclaim(text) {
//         return text + '!!!!';
//     }
// }
//     });
// });
//
// app.listen(8080, () => console.log("port 8080 listening"));
