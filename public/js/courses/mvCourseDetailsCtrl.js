app.controller('mvCourseDetailsCtrl',function($scope,mvCourse,$routeParams,$location){

  $scope.course = mvCourse.get({_id:$routeParams.id},function(course){

  });

  $scope.removeTag = function(tag){
    $scope.course.tags = mvCourse.removeTagFromArray(tag,$scope.course.tags);
  };

  $scope.editCourse = function(){
    $location.path('/edit/course/'+$scope.course._id);

  };
});