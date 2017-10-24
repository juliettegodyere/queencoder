// public/js/controllers/ArticleCtrl.js
angular.module('ArticleController', ['ngSanitize'])
.controller('articleCtrl', function($scope, Blog, $location) {

  var app = this;  
   $scope.topic = "Juliette Nkwor : my Code, my Design, my Way!";
   $scope.slug = " Doing the actual coding.";
  // $scope.url   = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_6okv4zxVfCbZUzbHleqBYr8ZErkGq5wRYfPDsZqSLXOx5iO';  
  function init(){
      getAllPublishedPosts();
  }
  init();
  

  function getAllPublishedPosts() {
    Blog.getIPublishedItem().then(function(posts){
        console.log(posts.data);
        // alert(JSON.stringify(posts));
        $scope.posts = posts.data;

    });
  };
     
//    function details(postId){
//    	 Blog.editItem(postId).then(function(post){
//       $scope.post = post.data;
//       // alert(JSON.stringify(post.data));
//       console.log($scope.post);
//         getAllPost();
//     });

//    }  
   $scope.selectTab = function(selectedId){
   console.log(selectedId);
   Blog.editItem(selectedId).then(function(post){
    console.log(post);     
    $scope.articles = post.data.title;
    console.log($scope.articles);
    // $scope.body = post.body;
    // $scope.createdAt = post.data.createdAt;
    // $scope.publishedBy = post.data.publishedBy;
    //$location.path( "/detail/");
   })
   //console.log(post);   
      // $scope.tab = setTab;
      // var id = $scope.tab;
      //  console.log($scope.tab)
      //  $location.path( "/detail/");
      //  details(id);
};

// this.getPostById = function(postId){
//   Blog.editItem(postId).then(function(post){
//     app.post = post.data;
//     // alert(JSON.stringify(post.data));
//      console.log(post);
//       getAllPost();
//   });

// }
    
    // $scope.isSelected = function(checkTab){
    //   return $scope.tab === checkTab;
    // };
});