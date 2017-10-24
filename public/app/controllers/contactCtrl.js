var app = angular.module('contactController', ['ngSanitize'])
.controller('contactCtrl', function($scope, Blog) {
  
    var app = this;
    $scope.topic = "Juliette Nkwor : my Code, my Design, my Way!";
    $scope.slug = " Doing the actual coding.";

  this.contactData = function(logData){
    app.loading = true;
    app.errorMsg = false;
    Blog.contactItem(app.logData).then(function(data){
      if(data.data.success == false && data.data.message=="Fields Empty"){
        app.loading = false;
        app.errorMsg = "Hey! Name, Email, and Message fields can not be empty";
        app.logData = "";
        return false;
      }else if(data.data.success){
        app.loading = false;
        app.successMsg = data.data.message;
        app.logData = "";
      }
      else{
        app.loading = false;
        app.errorMsg = data.data.message;
        app.logData = "";
        return false;
      }      
    });
  }
    
});
