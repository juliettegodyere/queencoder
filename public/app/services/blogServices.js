// public/js/services/BlogService.js
var app = angular.module('BlogService', []).factory('Blog',['$q', '$timeout', '$http', function($q, $timeout, $http) {

	return {
        headers :{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        // call to get all blogs
        getItem : function() {
            return $http.get('/api/blogPost');
        },
         getIPublishedItem : function() {
            return $http.get('/api/blogPostPublished');
        },
    
        // call to create posts
        postItem : function(data) {
            return $http.post("/api/blogPost", data);
        },

         deleteItem : function(postId) {
            console.log(postId);
            return $http.delete("/api/blogPost/"+postId);
        },
         editItem : function(postId) {
            return $http.get("/api/blogPost/"+postId);
        },
         detail : function(postId) {
            return $http.get("/api/blogPostPublished/"+postId);
        },
        updateItem : function(postId,post) {
            return $http.put("/api/blogPost/"+postId, post);
        },
        publishItem : function(postId,post) {
            return $http.put("/api/blogPostPublished/"+postId, post);
        },
         contactItem : function(data) {
            return $http.post("/emailLink/getContacts/", data);
        },

        // loginUser : function(data){
        //     console.log(data);
        //     return $http.post("/api/account", data);
        // },

        // getLoginDetails : function(){
        //     return $http.get("/api/checklogindetaild");
        // }
    }

}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

