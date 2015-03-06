angular.module('app',['ngResource','ngRoute','ngCookies']);



angular.module('app').config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode({enabled: true,requireBase: false});
	$routeProvider
	.when("/",{ templateUrl: '/partials/main',controller: 'mvMainCtrl'})
	.when("/admin/users",{ templateUrl: '/partials/admin/user-list',controller: 'mvUserListCtrl'})
	.when("/signup",{ templateUrl: '/partials/account/signup',controller: 'mvSignupCtrl'});
});
