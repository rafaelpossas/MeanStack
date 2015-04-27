app.factory('mvCourse',function($resource,$q,$routeParams){

  var CourseResource = $resource('/api/courses/:_id',{_id:"@id"},{
    update: {method: 'PUT', isArray:false,params:{_id:'@id'}}
  });

  CourseResource.prototype.removeTagFromArray = function(tag,tags){
    var index = 0;
    tags.forEach(function(currentTag){
      if(currentTag === tag){
        tags.splice(index,1);
        index--;
      }
      index++;
    });
    return tags;
  }

  CourseResource.prototype.updateCourse = function(c){
    var dfd = $q.defer();
    angular.extend(this,c);
    this.$update({_id:$routeParams.id},function(){
      dfd.resolve();
    },function(res){
      dfd.reject(res.data.reason);
    });
  }

  return CourseResource;
});
