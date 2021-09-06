const express = require("express"); //requiring express
const app = express(); //executing express
const path = require("path"); //gets the current path 
const { cwd } = require("process");
app.set("view engine", "ejs")
app.set("views", (path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));
const { v4: getID } = require('uuid');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const date = new Date().toDateString();
let userComments = [
    {
        id: getID(),
        username: "Samip",
        said: "Hi my name is Samip",
        postedOn: date
    },
    {
        id: getID(),
        username: "Lenin",
        said: "I make wonderful ramen",
        postedOn: date
    },
    {
        id: getID(),
        username: "Hattori",
        said: "Ding Ding Ding",
        postedOn: date
    },
    
    
]

app.get("/", (req, res) => {
    res.render("dashboard.ejs",{userComments});
    
});
app.get("/edit", (req, res) => {
    res.render("edit.ejs");
    
});

app.get("/new", (req, res) => {
    res.render("createNewPost.ejs");
    
});
app.post("/new", (req, res) => {
    const { username, says } = req.body;
    console.log(req.body);
    userComments.push({ username, said:says, id: getID(), postedOn: date });
    res.redirect("/");
})

app.listen(3000, () => {
  console.log("Server running ?");
});
