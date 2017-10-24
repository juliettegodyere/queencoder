angular.module('userApp', [
    'appRoutes',
    'MainController',
    'BlogController',
    'userController',
    'ArticleController',
    'DetailsController',
    'contactController',
    'userServices',
    'authServices',
    'BlogService'
])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
})