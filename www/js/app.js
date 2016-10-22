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

  .state('app.athlete-detail', {
    url: '/athlete-detail',
    views: {
      'menuContent': {
        templateUrl: 'templates/athlete-detail.html',
        controller: 'AthleteDetailCtrl'
      }
    }
  })

  .state('app.athletes-request', {
    url: '/athletes-request',
    views: {
      'menuContent': {
        templateUrl: 'templates/athletes-request.html',
        controller: 'AthletesRequestCtrl'
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
})

.filter('ageConvert', function () {
  function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function monthDiff(d1, d2) {
    if (d1 < d2) {
      var months = d2.getMonth() - d1.getMonth();
      return months <= 0 ? 0 : months;
    }
    return 0;
  }
  return function (birthdate) {
    var age = calculateAge(birthdate);
    if (age === 0)
      return monthDiff(birthdate, new Date()) + ' months';
    return age + ' years';
  };
})


.filter('truncate', function () {
  return function (text, length, end) {
    if (isNaN(length)) {
      length = 10;
    }

    if (end === undefined) {
      end = '...';
    }

    if (text.length <= length || text.length - end.length <= length) {
      return text;
    } else {
      return String(text).substring(0, length - end.length) + end;
    }
  };
})

.directive('readMore', function ($filter, $ionicScrollDelegate) {
  return {
    restrict: 'A',
    scope: {
      text: '=readMore',
      labelExpand: '@readMoreLabelExpand',
      labelCollapse: '@readMoreLabelCollapse',
      limit: '@readMoreLimit'
    },
    transclude: true,
    template: '<span ng-transclude ng-bind-html="text"></span><a href="javascript:;" class="read-more" ng-click="toggleReadMore()" ng-bind="label"></a>',
    link: function (scope /*, element, attrs */ ) {

      var originalText = scope.text;
      scope.applyLimit = false;
      if (scope.text.length >= scope.limit) {
        scope.applyLimit = true;
      }

      scope.label = scope.labelExpand;

      scope.$watch('expanded', function (expandedNew) {
        if (expandedNew) {
          scope.text = originalText;
          scope.label = scope.labelCollapse;
        } else {
          scope.text = $filter('truncate')(originalText, scope.limit, '...');
          scope.label = scope.labelExpand;
        }
      });

      scope.toggleReadMore = function () {
        scope.expanded = !scope.expanded;
        $ionicScrollDelegate.resize();
      };

    }
  };
})

;