var User = require('mongoose').model('User'),
	encryption = require('../utilities/encryption');

exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
      res.send(collection);
    })
};

exports.createUser = function(req,res,next){
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encryption.createSalt();
	userData.hashed_pwd = encryption.hashPwd(userData.salt,userData.password);
	User.create(userData, function(err,user){
		if(err) {
			if(err.toString().indexOf('E11000') >-1){
				err = new Error('Duplicate Username');
			}
			res.status(400);
			return res.send({reason:err.toString()});
		}
		req.logIn(user,function(err){
			if(err) {return next(err);}
			res.send(user);
		})
	})
}
exports.updateUser = function(req,res,next){
	var userUpdates = req.body;
	console.log(req.user);
	if(req.user._id != userUpdates._id && !req.user.hasRole('admin')){
		res.status(403);
		return res.end();
	}
	req.user.firstname = userUpdates.firstname;
	req.user.lastname = userUpdates.lastname;
	req.user.username = userUpdates.username;
	if(userUpdates.password && userUpdates.password.length > 0) {
	  req.user.salt = encryption.createSalt();
	  req.user.hashed_pwd = encryption.hashPwd(req.user.salt, userUpdates.password);
	}
    req.user.save(function(err) {
      if(err) { res.status(400); return res.send({reason:err.toString()});}
      res.send(req.user);
    });

}