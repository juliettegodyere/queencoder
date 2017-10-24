

var postModel   = require('../models/blog');

module.exports  = function(router) {

    //Blog Routes
    router.get("/blogPost",getAllPosts);
    router.post("/blogPost",createPost);
    router.delete("/blogPost/:id",deletePost);
    router.get("/blogPost/:id",getPostById);
    router.put("/blogPost/:id",updatePost);

    //Publish Post
    router.get("/blogPostPublished",getAllPublishedPosts);
    router.put("/blogPostPublished/:id",publishPost);

    //Get a single post
    //router.get("/blogPostPublished/:id",getPostDetailsById);

  function getAllPosts(req,res){
    postModel.find({},function(err, posts){
        if(err){
            res.status(500).send(err);
        }else{
          res.json(posts); 
        }
   
    }).sort({createdAt:-1});
  }

  function createPost(req,res){
     console.log(req.body);
    // console.log(req.file)
      var posts = new postModel({
        title:req.body.title,
        publishedby:req.body.publishedby,
        body:req.body.body,
        createdAt:Date.now(),
      }); 
      posts.save(function(err, postObj){
        if(err){
            res.send(err);
        }else{
            res.json(postObj);
            console.log(postObj);
        }
      })
  }

  function deletePost(req,res){
    var postId = req.params.id;
    console.log(postId);
    postModel.findOne({_id:postId}, function(err, postId){
      if(err){
        res.status(500).send(err);
      }else{             
       postId.remove(function(err, id){
          res.json(postId); 
          console.log(id);
       })          
      }       
    })
  }

  function getPostById(req,res){
    var postId = req.params.id;
    postModel.findOne({_id:postId}, function(err, post){
      if(err){
        res.status(500).send(err);
      }else{
        console.log("editing.....")
        res.json(post);
      }
    })
  }

  function updatePost(req,res){
    var postId = req.params.id;
    var post = req.body;
    // console.log(post);
    postModel.findByIdAndUpdate({_id:postId}, 
      {
        title:post.title,
        body:post.body
      },function(err,posts){
      if(err)throw err;
        console.log(posts);
    })
  }

  function publishPost(req,res){
    var postId = req.params.id;
    var post = req.body;
    postModel.findByIdAndUpdate({_id:postId},
      {published:true},function(err,publish){
      if(err)throw err;
      console.log(publish);
    })
  }

  function getAllPublishedPosts(req,res){
    postModel.find({published:true}, function(err, published){
      if(err){
          res.status(500).send(err);
      }else{
              res.json(published); 
      }
    }).sort({createdAt:-1});
  }

    return router;
}


