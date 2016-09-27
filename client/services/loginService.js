angular.module('bridgedb')
.service('loginService',function($http){

    this.login=function(data){
      alert("in login service");

         // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            $http.post('http://localhost:8089/login', data).success(function (data) {

                console.log(data)
                return data;
            })

    }
})
