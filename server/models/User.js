var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: '{PATH} is required',
		unique: true
	},
	firstname: {type: String, required: '{PATH} is required'},
	lastname: {type: String, required: '{PATH} is required'},
	salt: {type: String, required: '{PATH} is required'},
	hashed_pwd: {type: String, required: '{PATH} is required'},
	roles: [String]
});
userSchema.methods = {
	authenticate: function (passwordToMatch){
		var hashed_pwd = encryption.hashPwd(this.salt,passwordToMatch);
		return hashed_pwd === this.hashed_pwd;
	},
	hasRole: function(role){
		if(this.roles.indexOf(role) > -1){
			return true;
		}else{
			return false;
		}
	}
}
var User = mongoose.model('User',userSchema);

exports.createDefaultUsers = function (){
	User.find({}).exec(function(err,collection){
		if (collection.length === 0){
			var salt,hash;
			salt = encryption.createSalt();
			hash = encryption.hashPwd(salt,'1');
			User.create({firstname: 'Rafael', lastname: 'Pôssas',username:'rafaelpossas',salt: salt,hashed_pwd: hash,roles:['admin']});
			salt = encryption.createSalt();
			hash = encryption.hashPwd(salt,'1');
			User.create({firstname: 'Bruna', lastname: 'Veloso',username:'brunaveloso',salt: salt,hashed_pwd: hash,roles:[]});
		}
	})
}
