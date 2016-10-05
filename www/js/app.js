// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',

        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'

  })
  .state('forgot-password', {
    url: '/forgot-password',

        templateUrl: 'templates/forgot-password.html',
        controller: 'ForgotPasswordCtrl'

  })
  .state('app.edit-profile', {
    url: '/edit-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/edit-profile.html',
        controller: 'EditProfileCtrl'
      }
    }
  })
  .state('app.blog', {
    url: '/blog',
    views: {
      'menuContent': {
        templateUrl: 'templates/blog.html',
        controller: 'BlogCtrl'
      }
    }
  })
  .state('app.registration', {
    url: '/registration',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration.html',
        controller: 'RegistrationCtrl'
      }
    }
  })
  .state('app.blogdetail', {
    url: '/blog-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/blog-detail.html',
        controller: 'BlogDetailCtrl'
      }
    }
  })
  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
      }
    }
  })
  .state('app.chatdetail', {
    url: '/chat-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })
  .state('app.competition', {
      url: '/competition',
      views: {
        'menuContent': {
          templateUrl: 'templates/competition.html',
          controller: 'CompetitionCtrl'
        }
      }
    })
  .state('app.athletes-coached', {
      url: '/athletes-coached',
      views: {
        'menuContent': {
          templateUrl: 'templates/athletes-coach.html',
          controller: 'AthletesCoachedCtrl'
        }
      }
    })
  .state('app.athletes-coached-detail', {
      url: '/athletes-coached-detail',
      views: {
        'menuContent': {
          templateUrl: 'templates//athletes-coach-detail.html',
          controller: 'AthletesCoachedDetailCtrl'
        }
      }
    })


  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile');
});
