const express = require("express");
const app = express();
const hb = require("express-handlebars");
const projects = require("./data.json");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "main",
        projects,
        helpers: {
            exclaim(text) {
                return text + "!!!!";
            },
            highlight(x) {
                return;
                // console.log("it worked ", x);
            }
        }
    });
});

app.get("/projects/:project", (req, res) => {
    // console.log(projects);
    const project = req.params.project;
    const selectedProject = projects.find(item => item.directory == project);
    if (!selectedProject) {
        return res.sendStatus(404);
    }
    res.render("description", {
        layout: "main",
        selectedProject,
        projects,
        helpers: {
            highlight(x) {
                // console.log(x, selectedProject.directory);
                return x === selectedProject.directory;
            }
        }
    });
});

// app.listen(8080, () => console.log("port 8080 listening"));
app.listen(process.env.PORT || 8080, () =>
    console.log("port 8080 up and running")
);
