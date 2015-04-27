app.controller('mvCourseCtrl',function($scope,mvCourse,$routeParams,mvUser){

  $scope.course = mvCourse.get({_id:$routeParams.id},function(course){
    $scope.title = $scope.course.title;
    $scope.featured = $scope.course.featured;
    var currentDate = $scope.course.published.substring(0,10).split('-').join('/');
    $scope.published = new Date(currentDate);
    //$('input[type=date]').val($scope.published);
    $scope.tags = $scope.course.tags;
    $scope.currentTag = '';
  });

  $scope.init = function(){
    console.log(mvUser.isAdmin());
  }

  $scope.removeTag = function(tag){
    $scope.tags = mvCourse.removeTagFromArray(tag,$scope.tags);
  };

  $scope.addTag = function(){
    if($scope.currentTag.trim()!== ''){
      if($scope.tags.indexOf($scope.currentTag) > -1){
        $('#tagInput').addClass('has-error');
        $('.help-block').html('Tag já existente')
      }else{
        $scope.tags.push($scope.currentTag);
        $scope.currentTag = '';
        $('#tagInput').removeClass('has-error');
        $('.help-block').html('')
      }

    }else{
      $('#tagInput').addClass('has-error');
      $('.help-block').html('Não é possível adicionar um tag em branco')
    }


  }

  $scope.saveCourse = function(){
    var updatedCourseData =
    {
      title: $scope.title,
      tags: $scope.tags,
      featured: $scope.featured,
      published: $scope.published
    };
    $scope.course.updateCourse(updatedCourseData);
  }

});