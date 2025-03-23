const express = require("express");
const app = express();

const path = require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {   id:uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {   
        id:uuidv4(),
        username:"Priti",
        content:"I love travelling"
    },
    {   
        id:uuidv4(),
        username:"priyanshi",
        content:"I love shopping"
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
   let {id} = req.params;
   let post = posts.find((p) => id === p.id);
   console.log(post);
   res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
 });

 app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("edit.ejs", {post});
 });

 app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    console.log(post);
    res.redirect("/posts");
 });

const port = 8080;
app.listen(port, () => {
    console.log(`listening to port: ${port}`);
});