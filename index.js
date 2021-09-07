const express = require("express"); //requiring express
const { METHODS } = require("http");
const app = express(); //executing express
const path = require("path"); //gets the current path 
const { cwd } = require("process");
const methodOverride = require("method-override");
app.set("view engine", "ejs")
app.set("views", (path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));
const { v4: getID } = require('uuid');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
const date = new Date().toDateString();
let userComments = [
    {
        id: getID(),
        username: "Mark Twain",
        said: `If you tell the truth, you don't have to remember anything.`,
        postedOn: date
    },
    {
        id: getID(),
        username: "Oscar Wilde",
        said: "Always forgive your enemies; nothing annoys them so much.",
        postedOn: date
    },
    {
        id: getID(),
        username: "Friedrich Nietzsche",
        said: "Without music, life would be a mistake.",
        postedOn: date
    },
    {
        id: getID(),
        username: "Friedrich Nietzsche",
        said: "Without music, life would be a mistake.",
        postedOn: date
    },
    
    
]

app.get("/", (req, res) => {
    res.render("dashboard.ejs",{userComments});
    
});
app.post("/", (req, res) => {
    res.render("dashboard.ejs",{userComments});
});

app.get("/edit/:id", (req, res) => {
    const { id } = req.params;
    const comment = userComments.find(c => c.id === id);
    res.render("edit",{comment})
});

app.patch("/edit/:id", (req, res) => {
    const { id,says } = req.params;
    const comment = userComments.find(c => c.id === id);
    const newComment = req.body.says;
    comment.said = newComment;
    res.redirect("/")
});
app.delete("/edit/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const comment = userComments.filter((c) => c.id !== id); //filter from array where id does not match
    userComments = comment;
    res.redirect("/")
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