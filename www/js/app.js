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
      StatusBar.styleBlackTranslucent();
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

  .state('registration', {
    url: '/registration',
    templateUrl: 'templates/registration.html',
    controller: 'RegistrationCtrl'
  })

  .state('app.edit-profile', {
    url: '/edit-profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-edit.html',
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

  .state('app.chat-group', {
    url: '/chat-group',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat-group.html',
        controller: 'ChatGroupCtrl'
      }
    }
  })

  .state('app.coaches', {
    url: '/coaches',
    views: {
      'menuContent': {
        templateUrl: 'templates/coaches.html',
        controller: 'CoachesCtrl'
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

  .state('app.charts', {
    url: '/charts',
    views: {
      'menuContent': {
        templateUrl: 'templates/charts.html',
        controller: 'ChartsCtrl'
      }
    }
  })

  .state('app.competition-create', {
    url: '/competition-create',
    views: {
      'menuContent': {
        templateUrl: 'templates/competition-create.html',
        controller: 'CompetitionCreateCtrl'
      }
    }
  })

  .state('app.competition-detail', {
    url: '/competition-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/competition-create.html',
        controller: 'CompetitionDetailCtrl'
      }
    }
  })

  .state('app.testing', {
    url: '/testing',
    views: {
      'menuContent': {
        templateUrl: 'templates/testing.html',
        controller: 'TestingCtrl'
      }
    }
  })


  .state('app.testing-create', {
    url: '/testing-create',
    views: {
      'menuContent': {
        templateUrl: 'templates/testing-create.html',
        controller: 'TestingCreateCtrl'
      }
    }
  })

  .state('app.testing-detail', {
    url: '/testing-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/testing-create.html',
        controller: 'TestingDetailCtrl'
      }
    }
  })


  .state('app.athletes-coaching', {
    url: '/athletes-coaching',
    views: {
      'menuContent': {
        templateUrl: 'templates/athletes-coaching.html',
        controller: 'AthletesCoachingCtrl'
      }
    }
  })

  .state('app.athletes-coaching-detail', {
    url: '/athletes-coaching-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/athletes-coaching-detail.html',
        controller: 'AthletesCoachingDetailCtrl'
      }
    }
  })

  .state('app.training-diary', {
    url: '/training-diary',
    views: {
      'menuContent': {
        templateUrl: 'templates/training-diary.html',
        controller: 'TrainingDiaryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});