angular.module('authServices', [])
.factory('Auth', function($http, AuthToken){

    var authFactory = {};

    authFactory.login = function(callback){
        return $http.post("/users/authenticate", callback).then(function(data){
            //console.log(data.data.token);
            AuthToken.setToken(data.data.token);
            return data;
        });
    };
    authFactory.isLoggedIn = function(){
        if(AuthToken.getToken()){
            return true;
        }else{
            return false;
        }
    };

    //Get the name of the currently logged in user
    authFactory.loggedInUserName = function(){
        if(AuthToken.getToken()){
            return $http.post("/users/loggedInUserName");
        }else{
            $q.reject({message:"User has no token"});
        }
    };

    authFactory.logout = function(){
        console.log("Logout route");
        AuthToken.setToken();				
	};

    return authFactory;

})
.factory('AuthToken', function($window){
    var authTokenFactory = {};

    //AuthToken.setToken(token)
    authTokenFactory.setToken = function(token){
        if(token){
			$window.localStorage.setItem('token', token);
		}else{
			$window.localStorage.removeItem('token');
		}
    };
    //AuthToken.getToken()
    authTokenFactory. getToken = function(){
        return $window.localStorage.getItem('token');	
    };

    return authTokenFactory;
})
.factory('AuthInterceptors', function(AuthToken){
    //A factory that athaches the token to all request
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config){
        var token = AuthToken.getToken();
        if(token){
            config.headers['x-access-token'] = token;
        }

        return config;
    }

    return authInterceptorsFactory;
})