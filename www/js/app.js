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
    if (window.cordova) {
      if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#003268");
      }
    }

  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('loading', {
    url: '/loading',
    templateUrl: 'templates/loading.html',
    controller: 'LoadingCtrl'
  })

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

  .state('app.notifications', {
    url: '/notifications',
    views: {
      'menuContent': {
        templateUrl: 'templates/notifications.html',
        controller: 'NotificationsCtrl'
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

  .state('app.analytics', {
    url: '/analytics',
    views: {
      'menuContent': {
        templateUrl: 'templates/analytics.html',
        controller: 'AnalyticsCtrl'
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
  $urlRouterProvider.otherwise('/loading');
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

    if (text) {
      if (text.length <= length || text.length - end.length <= length) {
        return text;
      } else {
        return String(text).substring(0, length - end.length) + end;
      }
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
    template: '<span ng-transclude ng-bind-html="text"></span><a href="javascript:;" class="read-more" ng-click="toggleReadMore()" ng-if="applyLimit" ng-bind="label"></a>',
    link: function (scope /*, element, attrs */ ) {

      var originalText = scope.text;
      scope.applyLimit = false;

      if (scope.text) {
        if (scope.text.length >= scope.limit) {
          scope.applyLimit = true;
        }
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

.directive('autoGrow', function ($window) {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      $scope.attrs = {
        rows: 1,
        maxLines: 999
      };
      for (var i in $scope.attrs) {
        if ($attrs[i]) {
          $scope.attrs[i] = parseInt($attrs[i]);
        }
      }
      $scope.getOffset = function () {
        var style = $window.getComputedStyle($element[0], null),
          props = ['paddingTop', 'paddingBottom'],
          offset = 0;

        for (var i = 0; i < props.length; i++) {
          offset += parseInt(style[props[i]]);
        }
        return offset;
      };
      $scope.autogrowFn = function () {
        var newHeight = 0,
          hasGrown = false;
        if (($element[0].scrollHeight - $scope.offset) > $scope.maxAllowedHeight) {
          $element[0].style.overflowY = 'scroll';
          newHeight = $scope.maxAllowedHeight;
        } else {
          $element[0].style.overflowY = 'hidden';
          $element[0].style.height = 'auto';
          newHeight = $element[0].scrollHeight - $scope.offset;
          hasGrown = true;
        }
        $element[0].style.height = newHeight + 'px';
        return hasGrown;
      };

      $scope.offset = $scope.getOffset();
      $scope.lineHeight = ($element[0].scrollHeight / $scope.attrs.rows) - ($scope.offset / $scope.attrs.rows);
      $scope.maxAllowedHeight = ($scope.lineHeight * $scope.attrs.maxLines) - $scope.offset;

      $element[0].addEventListener('input', $scope.autogrowFn);
      if ($element[0].value !== '') {
        $scope.autogrowFn();
      }
    }

  };
})

.filter('uploadpath', function () {
  return function (input, width, height, style) {
    var other = "";
    if (width && width !== "") {
      other += "&width=" + width;
    }
    if (height && height !== "") {
      other += "&height=" + height;
    }
    if (style && style !== "") {
      other += "&style=" + style;
    }
    if (input) {
      if (input.indexOf('https://') == -1) {
        return imgpath + "?file=" + input + other;
      } else {
        return input;
      }
    }
  };
})

;
