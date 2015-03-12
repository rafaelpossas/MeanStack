angular.module('app').factory('mvUser',function($resource){
	var UserResource = $resource('/api/users/:id',{_id:'@id'},{
		update: {method: 'PUT',isArray: false}
	});

	UserResource.prototype.isAdmin = function(){
		var isAdmin = this.roles && this.roles.indexOf('admin') > -1;
		return isAdmin;
	}

	return UserResource;
});