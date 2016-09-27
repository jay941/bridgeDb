angular.module('bridgedb')
    .controller('projectCtrl', function ($scope, $location, $http) {

        $scope.projectName1 = "";
        $scope.projectName = "";


       
$http.get('http://localhost:8090/retrive').success(function (data) {
                console.log(data)
                // $location.path('project')  ;
                printData(data);
            });

            function printData(data) {
                $scope.projectName1 = data
            }
            
    



        $scope.data = function (projectName) {
            var final = {};
            var x = { pro: $scope.projectName }
            $http.post('http://localhost:8090/project', x).success(function (data) {
                final = data;
                // $location.path('project')  ;
                printData(data);
            });

            function printData(data) {
                $scope.projectName1 = data

            }

        }

    })
