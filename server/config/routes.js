var auth = require('./auth'),
	mongoose = require('mongoose'),
  users = require('../controllers/users'),
  courses = require('../controllers/courses'),
	User = mongoose.model('User');
module.exports = function(app){
  	/* Requisição POST para LOGIN */
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

  app.post('/api/users',users.createUser);

  app.get('/api/courses',courses.getCourses);

  app.get('/api/courses/:id',courses.getCourseById)

  app.put('/api/courses/:id',courses.updateCourse)

  app.put('/api/users',users.updateUser);
  app.get('/partials/*', function(req, res) {
    res.render('partials/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.all('/api/*',function(req,res){
     res.sendStatus(404);
  });

  app.get('*', function(req, res) {
    res.render('pages/index', {
      user: req.user
    });
  });

}