var Course = require('mongoose').model('Course');

exports.getCourses = function(req,res){
  Course.find({}).exec(function(err,collection){
    res.send(collection);
  })
};

exports.getCourseById = function(req,res){
  Course.findOne({_id:req.params.id}).exec(function(err,course){
    res.send(course);
  });
}

exports.updateCourse = function(req,res,next){
  //var course = new Course(req.body);

  Course.findOneAndUpdate({_id:req.params.id},req.body,function(err,c){
    if(err){ res.status(400);return res.send({reason: err.toString()});}
    res.send(c);
  });
}