angular.module('bridgedb')
    .controller('projectCtrl', function($scope, $location, $http) {
       
        $scope.projectName1 = "";
        $scope.projectName = "";
        //  alert('in project controller');
        $scope.data = function(projectName) {

            $scope.projectName1 = $scope.projectName;

           
            var x = {
                    pro : $scope.projectName
                }
               
           
            $http({
                method: "POST",
                url: "http://localhost:8089/project",
                data: x,
                headers: {
                    "Content-type": 'application/json'
                }
            }).
            success(function(data, status, headers, config) {
             
                console.log(data);
                $location.path('project')  ;
                 
            });
        }
       
    })
