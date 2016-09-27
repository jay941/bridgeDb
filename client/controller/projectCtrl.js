angular.module('bridgedb')

.controller('projectCtrl', function($scope, $location, $http) {
        $scope.projectName1 = "";
        $scope.projectName = "";
        //  alert('in project controller');
        $scope.createProject = function(projectName) {

            $scope.projectName1 = $scope.projectName;

            alert($scope.projectName1);
            var x = {
                    pro: $scope.projectName
                }
                // alert(JSON.stringify(x.pro));
            alert(x.pro);

            // alert($scope.projectData.projectName);
            $http({
                method: "POST",
                url: "http://localhost:8090/project",
                data: x,
                headers: {
                    "Content-type": 'application/json'
                }
            }).
            success(function(data, status, headers, config) {

                console.log(data);
                $location.path('project');
            });
        }
    })
    .directive('navHeader', function() {
        return {
            templateUrl: 'views/navHeader.html'
        };
    });
