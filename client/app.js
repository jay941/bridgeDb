/**
 * main js 
 * */
var bridgedb = angular.module('bridgedb', ['ui.router', 'satellizer', 'toaster']);

/** configure existing services */
bridgedb.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

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

            templateUrl: 'views/signup.html'



        })
        .state('profile', {
            url: '/profile',

            templateUrl: 'views/profile.html'



        })
    /**
    *  Satellizer config
   */
    $authProvider.github({
        url: 'http://localhost:8088/auth/github',
        clientId: '638c69d1fdbd49dc61e8',
        redirectUri: 'http://localhost:8088/#/profile'

    });



});
