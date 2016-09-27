angular.module('bridgedb')
    .controller('projectCtrl', function($scope, $location, $http) {
       
        $scope.projectName1 = "";
        $scope.projectName = "";
        //  alert('in project controller');
        $scope.data = function(projectName) {
  var final={};
            // $scope.projectName1 = $scope.projectName;

           
            var x = {
                    pro : $scope.projectName
                }
                $http.post('http://localhost:8090/project', x).success(function(data) {
                final=data;
                $location.path('project')  ;
                printData(data);
              
                 
            });

          function printData(data){
              $scope.projectName1=data
          
          }

        }
       
    })
