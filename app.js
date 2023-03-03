//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { has, includes } = require("lodash");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// Global posts are added to this array as they are composed.
let posts = [];

app.set('view engine', 'ejs');

// Enables us to use body-parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Render the starting and composed blog summary on home page.
app.get("/", function (req, res) {
  res.render("home", { 
    startingContent: homeStartingContent, 
    posts: posts,
  });
});

// Render about page with about content.
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

// Render contact page with contact info.
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

// Render compose page.
app.get("/compose", function (req, res) {
  res.render("compose");
});

// Post compose page and gather user input information from compose postTitle & postBody.
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  // Push the post to the posts array.
  posts.push(post);

  // Redirect to root/home page.
  res.redirect("/");

});

// Checks for post title name. If name exists then renders the full post.
app.get("/posts/:postName", function (req, res) {

  // Sets user requested title in url bar to lowercase.
  const requestedTitle = _.lowerCase(req.params.postName);

  // Loops through each post in posts array. Stores post title variable in lowercase. 
  // Check if storedTitle and requestedTitle match for any post. 
  // If matched then console log "Found Match!" and go to post.
  // If doesn't match console log "No Match!"
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle){
      console.log("Found Match!");

      // This renders the post title & content on the post page if a match exists.
      res.render("post", {
        title: post.title,
        content: post.content
        });
    } else {
      console.log("No Match!");
    };
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
