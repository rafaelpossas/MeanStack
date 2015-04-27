app.controller('mvNavBarLoginCtrl',function($http,mvNotifier,mvIdentity,mvAuth,$location){
    var login = this;
    login.identity = mvIdentity;
    login.signin = function(username,password){
		mvAuth.authenticateUser(username,password).then(function(success){
			if(success){
				mvNotifier.notify('You have successfully signed in');

			}else{
				mvNotifier.notify('Username/Password combination incorrect');
			}
		});

	},
	login.signup = function(){
		$location.path('/signup');
	},
	login.signout = function(){
		mvAuth.logoutUser().then(function(){
			login.username = "";
			login.password = "";
			mvNotifier.notify("You have successfully signed out");
			$location.path('/');
		});

	}
});