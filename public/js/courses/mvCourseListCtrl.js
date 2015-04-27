app.controller('mvCourseListCtrl',function($scope,mvCourse){
    $scope.courses = mvCourse.course.query();

/*    $scope.courses.$promise.then(function(result){
      console.log("Resultado retornado");
      console.log(result);
    });*/

    $scope.sortOptions = [{value: "title",text: "Sort by Title"},{value:"published",text:"Sort by Publish Date"}];

    $scope.sortOrder = $scope.sortOptions[0].value;
});