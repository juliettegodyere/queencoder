var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
    $routeProvider

    .when('/', {
        templateUrl:'app/views/pages/blog.html',
        controller:'articleCtrl',
        controllerAs:'article',
    })
    // .when('/blog', {
    //     templateUrl:'app/views/pages/blog.html',
    //     controller:'articleCtrl',
    //     controllerAs:'article',
    // })
    .when('/article/:id', {
        templateUrl:'app/views/pages/article.html',
        controller:'detailsCtrl',
        //controllerAs:'article',
        authenticated: false
        
    })
    .when('/contact', {
        templateUrl: 'app/views/pages/contact.html',
        authenticated: false,
        controller: 'contactCtrl',
        controllerAs:'contact'
    })
    .when('/about', {
        templateUrl:'app/views/pages/about.html'
    })
    .when('/register', {
        templateUrl:'app/views/pages/users/register.html',
        controller:'regCtrl',
        controllerAs:'register',
        authenticated: false
    })
    .when('/login', {
        templateUrl:'app/views/pages/users/login.html',
        authenticated: false
    })
    .when('/dashboard', {
        templateUrl:'app/views/pages/admin/dashboard.html',
        controller:'blogCtrl',
        controllerAs:'blog',
        //authenticated: true
    })
    .when('/logout', {
        templateUrl:'app/views/pages/users/logout.html',
        authenticated: true
    })
    .when('/profile', {
        templateUrl:'app/views/pages/users/profile.html',
        authenticated: true
    })

    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
    enabled:true,
    requireBase:false
    });
});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route.authenticated == true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }
            //console.log(next.$$route.authenticated);
        }else if(next.$$route.authenticated == false){
             if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/dashboard');
            }
            //console.log(next.$$route.authenticated);
        }   
        //console.log(next.$$route.authenticated);
    })
}])