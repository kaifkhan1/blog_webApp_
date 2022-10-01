
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose");

const homeStartingContent = "Write Your Heart Out.. ❤️❤️❤️  ";
const aboutContent = "Crafted with love by Kaif Khan.. 😄😄😄.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/blogDB');

const posts = [];


const blogSchema = {
  title : String,
  content : String
};

const Blog = mongoose.model(
  "Blog",
  blogSchema
);

app.get("/",function(req,res){

  Blog.find({},function(err,posts){
    res.render("home",{
      homeContent : homeStartingContent,
      posts : posts
    });
  });
});


app.get('/about',function(req,res){

  res.render("about",{about : aboutContent});

});

app.get('/contact',function(req,res){

  res.render("contact",{contact : contactContent});

});

app.get('/compose',function(req,res){

  res.render('compose');


})

app.post('/compose',function(req,res){


  const title = req.body.postTitle;
  const body = req.body.postArea;

  const blog = new Blog({
    title : title,
    content : body
  });

  blog.save(function(err){
    if(!err){
      res.redirect('/');
    }
  });

  // const post = {

  //   title : req.body.postTitle,
  //   body : req.body.postArea

  // };

});

app.get('/posts/:postId',function(req,res){

  let postID = req.params.postId;

  Blog.findOne({_id:postID},function(err,foundPost){
    if(!err){
      res.render('post',{postTitle:foundPost.title , postBody : foundPost.content});
    }
  })


  // posts.forEach(function(post){

  //   const storedTitle = post.title;
  //   const storedBody = post.body;


  //   if(  _.lowerCase(requiredTitle) ===    _.lowerCase(storedTitle)){

  //     res.render('post',{postTitle : storedTitle , postBody : storedBody});
  //   }s
  // });

});



// app.del("/delete/:postId", function(req, res, next) {
//   let postID = req.params.postTitle;
//   Blog.deleteOne({title : postID},function(err, output) {
//     if (err) {
//       return next(err);
//     }
//     res.send(output === 1 ? { msg: "success" } : { msg: "error" });
//   });
// });
  







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
