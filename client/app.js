/**
 * main js
 * */
var bridgedb = angular.module('bridgedb', ['ui.router']);

/** configure existing services */
bridgedb.config(function ($stateProvider, $urlRouterProvider) {

	/**
         * @default Home
         */
	$urlRouterProvider.otherwise('/home');

	/** @define states */
    $stateProvider
        /** Home states */
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
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
						onEnter:function(){
							alert("Inside controller");
						}
        })
				.state('project', {
            url: '/project?projectName',
            templateUrl: 'views/project.html',
						controller:'projectCtrl',
						onEnter:function(){
							alert("Inside controller");
						}
        })

});



// /**
//  * main js
//  * */
// var bridgedb = angular.module('bridgedb', ['ui.router']);
//
// /** configure existing services */
// bridgedb.config(function ($stateProvider, $urlRouterProvider) {
//
// 	/**
//          * @default Home
//          */
// 	$urlRouterProvider.otherwise('/home');
//
// 	/** @define states */
//     $stateProvider
//         /** Home states */
//         .state('home', {
//             url: '/home',
//
//             templateUrl: 'views/home.html'
//         })
//
//         .state('login', {
//             url: '/login',
//
//             templateUrl: 'views/login.html',
//             controller: 'loginCtrl'
//
//             // onEnter:function()
//             // {
//             //     console.log("call")
//             // }
//
//
//
//         })
//         .state('signup', {
//             url: '/signup',
//
//             templateUrl: 'views/signup.html'
//
//
//
//         })
//         .state('profile', {
//             url: '/profile',
//
//             templateUrl: 'views/profile.html'
//
//
//
//         })
//
// });
