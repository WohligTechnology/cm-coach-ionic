angular.module('starter.controllers', ['checklist-model'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout) {
  $ionicModal.fromTemplateUrl('templates/modal/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
})

.controller('ForgotPasswordCtrl', function ($scope, $ionicModal, $timeout) {

})

.controller('ProfileCtrl', function ($scope, $ionicScrollDelegate) {
  $scope.profileData = {
    name: 'Sachin',
    surname: 'Tendulkar',
    image: 'http://2.bp.blogspot.com/-TgdKBlUGk90/T0PhPlFOf8I/AAAAAAAAAVc/jijEQ8u1uUg/s1600/387430_257363124319593_257347670987805_670782_1318978483_n.jpg',
    yearsCoaching: 2,
    email: 'sachin@gmail.com',
    gender: 'Male',
    contact: '+919098765324',
    dob: '24th April, 1973',
    country: 'UK',
    credentials: 'Level 4',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, turpis at auctor interdum, enim neque placerat diam, ac faucibus sem elit in sapien. Vivamus sodales et libero ac consectetur. Curabitur hendrerit lacus nisi, eget euismod felis gravida vitae. Nullam faucibus maximus eros, non facilisis magna tincidunt quis. Ut suscipit fringilla quam eu scelerisque. Proin orci lacus, condimentum eget urna at, aliquam pellentesque mauris. Aenean rutrum diam tortor, sed finibus nibh condimentum ac. Sed et blandit arcu.',
    coachingFocus: ['Sprinting', 'Hurdles'],
    specialisations: ['Children in Athletics', 'First aid']
  };

  $scope.read = false;

  $scope.readMore = function () {
    $scope.read = !$scope.read;
    $ionicScrollDelegate.resize();
  };

})

.controller('BlogCtrl', function ($scope) {
  $scope.data = [{
    title: 'The Strongest Woman I’ve Ever Known',
    image: 'http://d2gd8qsu8uml9u.cloudfront.net/uploads/AP_4657469935821-680x384.jpg',
    date: '4th October 2015',
    rating: '4.5'
  }, {
    title: 'What You Dont Know About: Being a GM',
    image: 'http://d2gd8qsu8uml9u.cloudfront.net/uploads/AP_234024109023-680x340.jpg',
    date: '3rd November 2015',
    rating: '3.5'
  }];

})

.controller('BlogDetailCtrl', function ($scope) {

})

.controller('ChatCtrl', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/modal-chat.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.newChat = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
})

.controller('ChatDetailCtrl', function ($scope) {

})

.controller('CompetitionCtrl', function ($scope, $ionicModal) {


})

.controller('CompetitionCreateCtrl', function ($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/modal/modal-add-athlete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.addAthlete = function () {
    $scope.modal.show();
  };

})

.controller('CompetitionDetailCtrl', function ($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/modal/modal-add-athlete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.addAthlete = function () {
    $scope.modal.show();
  };

})


.controller('RegistrationCtrl', function ($scope, $state, $ionicPopup) {

  $scope.formData = {};
  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Hill/Fell Running', 'Cross Country'
  ];
  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.submit = function (data) {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<p>Do you agree to the Coach Mentor Terms of Service and Privacy Policy?</p>',
      title: 'Terms & Conditions',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          console.log(data);
          $state.go('app.profile');
        }
      }]
    });
  };
})

.controller('EditProfileCtrl', function ($scope, $state) {
  $scope.formData = {
    name: 'Sachin',
    surname: 'Tendulkar',
    image: 'http://2.bp.blogspot.com/-TgdKBlUGk90/T0PhPlFOf8I/AAAAAAAAAVc/jijEQ8u1uUg/s1600/387430_257363124319593_257347670987805_670782_1318978483_n.jpg',
    yearsCoaching: 2,
    email: 'sachin@gmail.com',
    gender: 'Male',
    contact: '+919098765324',
    dob: new Date(),
    country: 'UK',
    credentials: 'Level 4',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, turpis at auctor interdum, enim neque placerat diam, ac faucibus sem elit in sapien. Vivamus sodales et libero ac consectetur. Curabitur hendrerit lacus nisi, eget euismod felis gravida vitae. Nullam faucibus maximus eros, non facilisis magna tincidunt quis. Ut suscipit fringilla quam eu scelerisque. Proin orci lacus, condimentum eget urna at, aliquam pellentesque mauris. Aenean rutrum diam tortor, sed finibus nibh condimentum ac. Sed et blandit arcu.',
    coachingFocus: ['Sprinting', 'Hurdles'],
    specialisations: ['Children in Athletics', 'First aid']
  };
  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Hill/Fell Running', 'Cross Country'
  ];
  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.submit = function (data) {
    console.log(data);
    $state.go('app.profile');
  };
})

.controller('AthletesCoachingCtrl', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/modal-coach.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.athleteCoaching = [{
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    acceptedDate: '13 May, 2016',
    renewalDate: '12 June, 2016',
    subscriptionType: 'Monthly'
  }, {
    name: 'John',
    surname: 'Damon',
    image: 'img/img-placeholder.png',
    acceptedDate: '17 August, 2016',
    renewalDate: '16 August, 2017',
    subscriptionType: 'Annual'
  }];
})

.controller('AthletesCoachingDetailCtrl', function ($scope, $ionicModal) {

  $scope.athleteCoaching = {
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    acceptedDate: '13 May, 2016',
    renewalDate: '12 June, 2016',
    subscriptionType: 'Monthly',
    location: 'UK',
    age: '22',
    sports: [
      'Cycling',
      'Running'
    ],
    events: [
      'UK Marathon 2016',
      'Triathlon 2016'
    ]
  };


})

;