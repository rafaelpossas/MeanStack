var mongoose = require('mongoose'),
  userModel = require('../models/User'),
  courseModel = require('../models/Course');

module.exports = function(config){
  console.log(config.db);
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error',console.error.bind(console,'connection error....'));
  db.once('open',function callback() {
    console.log('multivision db opened!!');
  });
  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
}


