angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode({enabled: true,requireBase: false});
	$routeProvider.when("/",
	{
		templateUrl: '/views/partials/main.tpl.html',
		controller: 'mvMainCtrl'
	});
});

