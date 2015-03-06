var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');
module.exports = function(config){
	console.log(config.db);
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error',console.error.bind(console,'connection error....'));
	db.once('open',function callback() {
		console.log('multivision db opened!!');
	});
}

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	salt: String,
	hashed_pwd: String,
	roles: [String]
});
userSchema.methods = {
	authenticate: function (passwordToMatch){
		var hashed_pwd = encryption.hashPwd(this.salt,passwordToMatch);
		return hashed_pwd === this.hashed_pwd;
	}
}
var User = mongoose.model('User',userSchema);

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
