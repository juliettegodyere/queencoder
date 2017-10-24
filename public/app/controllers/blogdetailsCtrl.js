// public/js/controllers/ArticleCtrl.js
angular.module('DetailsController', [])
.controller('detailsCtrl', function($scope,Blog,$routeParams) {

  $scope.topic = "Juliette Nkwor : my Code, my Design, my Way!";
  $scope.slug = " Doing the actual coding.";
    // console.log($scope.items);
    //$scope.getPostsDetails = getPostsDetails;
    //$scope.items = {};
    //get the id to query the db and retrieve the correct superhero
    //var self = this;
    var id = $routeParams.id; 
   function init(){
    getPostsDetails();
  }
  init();

  function getPostsDetails() {
    console.log(id);
    Blog.editItem(id).then(function(data){
        console.log(data);
        // alert(JSON.stringify(posts));
        $scope.items = data;

    });
  };
});