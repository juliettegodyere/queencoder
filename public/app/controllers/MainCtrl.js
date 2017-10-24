angular.module('MainController', ['authServices'])
.controller( "MainCtrl", function($http, $location,$timeout,Auth, $rootScope){

    var app = this;
    app.loadme = false;

    $rootScope.$on('$routeChangeStart',function(){
        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            console.log("User is logged in");
            Auth.loggedInUserName().then(function(data){
                app.username = data.data.username;
                app.userEmail = data.data.email;
                console.log(data.data.username);
                app.loadme = true;
            });
        }else{
        console.log('Success:User is Not logged In');
        app.isLoggedIn = false;
        app.username = '';
        app.loadme = true;
        }
   });

    this.doLogin = function(logindata){
        app.loading = true;
        app.errorMsg = false;
        Auth.login(app.logindata).then(function(data){
            if(data.data.success){
                app.loading = false;
                app.successMsg = data.data.message + '...Redirecting';
                $timeout(function(){
                    $location.path('/dashboard');
                    app.logdata = '';
                    app.successMsg = false;
                },2000);
            }else{
                app.loading = false;
                app.errorMsg = data.data.message;
            }
           
        });
    }

    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
        $location.path('/');
        }, 2000);
    }
});