const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is funny",
  },
  {
    id: uuid(),
    username: "Amy",
    comment: "u are cool",
  },
  {
    id: uuid(),
    username: "Raymond",
    comment: "lets gooo",
  },
  {
    id: uuid(),
    username: "Vanessa",
    comment: "oogie boogie bing chilling",
  },
  {
    id: uuid(),
    username: "Marshall",
    comment: "lol",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  console.log(req.body);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`OK, here are your ${qty} ${meat}`);
});

app.listen(3000, () => {
  console.log("ON PORT 3000!");
});
