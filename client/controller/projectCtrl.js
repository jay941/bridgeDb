angular.module('bridgedb')
.controller('projectCtrl', function ($scope, $location, $http,loginService,$stateParams) {
     $scope.projectName1 = "";
        $scope.projectName = "";
        $scope.param=$stateParams.param;
  var data={
      key:$scope.param
  }

     $scope.user=$scope.param;
     console.log('data',data)
        
$http.post('http://localhost:8090/retrive',data).success(function (data) {

            console.log(data);
            $scope.projectName1 = data;
            // $location.path('project')  ;

        })
 $scope.createProject = function (projectName) {
 var x = {
                pro: $scope.projectName,
                key:$scope.param


            }
               console.log('project',x)



            $http.post('http://localhost:8090/project', x).success(function (data1) {
                console.log(data1);

            $http.post('http://localhost:8090/retrive',data).success(function (data12) {

            console.log(data12);
            $scope.projectName1 = data12;
            // $location.path('project')  ;


       });
            });
 };
 $scope.project=function(){
     $location.path('project')  ;
 }
    })
 .directive('navHeader', function() {
return {
            templateUrl: 'views/navHeader.html'
        };
    });
