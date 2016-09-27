angular.module('bridgedb')


.controller('projectCtrl', function($scope, $location, $http) {

        $scope.projectName1 = "";
        $scope.projectName = "";

        $http.get('http://localhost:8090/retrive').success(function(data) {

            console.log(data);
            $scope.projectName1 = data;
            // $location.path('project')  ;

        })


        //  alert('in project controller');
        $scope.createProject = function(projectName) {
            var x = {
                pro: $scope.projectName
            };

            $http.post('http://localhost:8090/project', x).success(function(data) {

                console.log(data);
                printData(data);
                // $location.path('project')  ;

            })
        };

        function printData(data) {
            $scope.projectName1 = data;
        }


    })
    .directive('navHeader', function() {

        return {
            templateUrl: 'views/navHeader.html'
        };
    });
