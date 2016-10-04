angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('ProfileCtrl', function($scope) {

  })
  .controller('BlogCtrl', function($scope) {

  })
  .controller('BlogDetailCtrl', function($scope) {

  })
  .controller('ChatCtrl', function($scope) {

  })
  .controller('ChatDetailCtrl', function($scope) {

  })
  .controller('CompetitionCtrl', function($scope) {

  })
  .controller('EditProfileCtrl', function($scope) {

  })
  .controller('AthletesCoachedCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal/modal-coach.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
    $scope.modal.hide();
    };
  })
  .controller('AthletesCoachedDetailCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal/modal-coach.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
  })

;
