angular.module('app').controller('mvSignupCtrl', function($scope,mvUser,mvNotifier,mvAuth,$location){
	$scope.signup = function(){
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstname: $scope.fname,
			lastname: $scope.lname
		};
		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notify('User account created!');
			$location.path('/');
		}, function(reason){
			mvNotifier.error(reason);
		})
	}
})