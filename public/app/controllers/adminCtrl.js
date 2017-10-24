var app = angular.module('BlogController', ['ngSanitize'])
.controller('blogCtrl', function($scope, Blog, ) {
  //$scope.title        = 'MyBlog';
  var app = this;
  
   //this.blog = {};
//   $scope.getAllPost   = getAllPost;
//   $scope.createPost   = createPost;
//   $scope.deletePost   = deletePost;
//   $scope.getPostById     = getPostById;
//   $scope.updatePost   = updatePost;
//   $scope.published   = published;
  function init(){
    $('#summernote').summernote('code');
    getAllPost();
  }
  init();

  function getAllPost() {
    Blog.getItem().then(function(posts){
        console.log(posts);
        // alert(JSON.stringify(posts));
        $scope.posts = posts.data;

    });
  };
    
  this.createPost = function(post){
    var data = app.post;
    data['body'] = $('#summernote').summernote('code');
    console.log(data);
    Blog.postItem(app.post).then(function(data){
        console.log(data);
        getAllPost();
        app.post = '';
    });
  }
   
  this.deletePost = function (postId){
    console.log(postId)
    Blog.deleteItem(postId).then(function(){
      getAllPost();
    });
    
  }
  this.getPostById = function(postId){
    Blog.editItem(postId).then(function(post){
      app.post = post.data;
      // alert(JSON.stringify(post.data));
       console.log(post);
        getAllPost();
    });

  }
   this.updatePost = function (post){
    // alert(JSON.stringify(post));
    console.log(app.post._id);
    console.log(app.post)
     Blog.updateItem(app.post._id,app.post).then(getAllPost());
     app.post = '';
   }

   this.published = function(postId,post){
          console.log(postId);
          console.log(post);
       Blog.publishItem(postId,post).then(function(post){
        console.log(post);
        app.post = post;
      });
   } 
    
});

