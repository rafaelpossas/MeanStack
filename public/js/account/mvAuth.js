angular.module('app').factory('mvAuth',function($http,mvIdentity,$q,mvUser){
	return {
		authenticateUser: function (username,password){
			var dfd = $q.defer();
			$http.post('/login',{username:username,password:password}).then(function(response) {
				if(response.data.success === true){
					var user = new mvUser();
					angular.extend(user,response.data.user);
					mvIdentity.currentUser = user;
					sessionStorage.user = JSON.stringify(response.data.user);
					$http.defaults.headers.common['roles'] = sessionStorage.user === undefined ? "":JSON.stringify(JSON.parse(sessionStorage.user).roles);
					dfd.resolve(true);
				}else{
					dfd.resolve(false)
				}
			});
			return dfd.promise;
		},
		createUser: function(newUserData){
			var newUser = new mvUser(newUserData);
			var dfd = $q.defer();

			newUser.$save().then(function(){
				mvIdentity.currentUser = newUser;
				dfd.resolve();
			},function(response){
				dfd.reject(response.data.reason)
			});
			return dfd.promise;
		},
		logoutUser: function(){
			var dfd = $q.defer();
			$http.post('/logout', {logout: true}).then(function() {
				mvIdentity.currentUser = undefined;
				delete sessionStorage.user;
				dfd.resolve();
			});
			return dfd.promise;
		}
	}
});