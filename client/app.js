/**
 * main js
 * */
var bridgedb = angular.module('bridgedb', ['ui.router', 'satellizer', 'toaster']);

/** configure existing services */
bridgedb.config(function ($stateProvider, $urlRouterProvider, $authProvider) {
 $authProvider.loginUrl = 'http://localhost:8089/auth/verify';
	/**
         * @default Home
         */
    $urlRouterProvider.otherwise('home');

    /** @define states */
    $stateProvider
        /** Home states */
        .state('home', {
            url: '/home',


            templateUrl: 'views/home.html',
            controller: 'authCtrl'


        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'


            // onEnter:function()
            // {
            //     console.log("call")
            // }




        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
						controller:'signupCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
						controller:'projectCtrl',
						// onEnter:function(){
						// 	alert("Inside controller");
						// }
        })
				.state('project', {
            url: '/project',
            templateUrl: 'views/project.html',
						controller:'projectCtrl',
						onEnter:function(){
							alert("Inside controller");
						}
        })
				/**
				*  Satellizer config
			 */
				$authProvider.github({
						url: 'http://localhost:8089/auth/github',
						clientId: '638c69d1fdbd49dc61e8',
						redirectUri: 'http://localhost:8089/#/profile'

				});



});
