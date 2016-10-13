angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.rCalendar'])

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
    country: 'United Kingdom',
    coachingLimit: 50,
    askingPrice: 100,
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

.controller('BlogDetailCtrl', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal/modal-add-athlete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.shareAthlete = function () {
    $scope.modal.show();
  };

})

.controller('ChatCtrl', function ($scope, $ionicModal, $state) {
  $ionicModal.fromTemplateUrl('templates/modal/modal-chat.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalChat = modal;
  });
  $scope.newChat = function () {
    $scope.modalChat.show();
  };

  $ionicModal.fromTemplateUrl('templates/modal/modal-group-chat.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalGroup = modal;
  });
  $scope.newGroupChat = function () {
    $scope.modalGroup.show();
  };

  $scope.closeModal = function () {
    $scope.modalGroup.hide();
    $scope.modalChat.hide();
  };

  $scope.startChat = function () {
    $state.go('app.chatdetail');
    $scope.modalChat.hide();
  };
})

.controller('ChatDetailCtrl', function ($scope, $ionicScrollDelegate, $timeout) {

  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };

  $scope.sendMessage = function () {

    if ($scope.data.message !== '' && $scope.data.message) {
      console.log($scope.data.message);
      $scope.messages.push({
        userId: 'me',
        text: $scope.data.message,
        time: $scope.timeStamp()
      });

      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);
    }

  };

  $scope.chatTap = function (m) {
    m.showTime = true;
    $timeout(function () {
      m.showTime = false;
    }, 4000);
  };
  $scope.openKb = function () {
    cordova.plugins.Keyboard.open();
  };

  $scope.data = {};
  $scope.messages = [{
    userId: 'he',
    text: 'Hello! Welcome to Coach Mentor!',
    time: $scope.timeStamp()
  }];

})

.controller('ChatGroupCtrl', function ($scope, $ionicScrollDelegate, $timeout) {

  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };

  $scope.sendMessage = function () {

    if ($scope.data.message !== '' && $scope.data.message) {
      console.log($scope.data.message);
      $scope.messages.push({
        userId: 'me',
        text: $scope.data.message,
        time: $scope.timeStamp()
      });

      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);
    }

  };

  $scope.chatTap = function (m) {
    m.showTime = true;
    $timeout(function () {
      m.showTime = false;
    }, 4000);
  };
  $scope.openKb = function () {
    cordova.plugins.Keyboard.open();
  };

  $scope.data = {};
  $scope.messages = [{
    userId: 'he',
    name: 'Sachin',
    surname: 'Sachin',
    text: 'Hello! Welcome to Coach Mentor!',
    time: $scope.timeStamp()
  }];

})

.controller('CompetitionCtrl', function ($scope, $ionicModal) {
  $scope.data = [{
    name: 'Nike Marathon London',
    startDate: '14 January, 2017',
    endDate: '15 January, 2017',
    keyCompetition: true,
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }]
  }, {
    name: 'Puma Marathon Manchester',
    startDate: '14 January, 2017',
    endDate: '15 January, 2017',
    keyCompetition: false,
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }]
  }];
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

  $scope.data = {
    name: 'Nike Marathon London',
    startDate: new Date("January 14, 2017 11:13:00"),
    endDate: new Date("January 15, 2017 11:13:00"),
    keyCompetition: true,
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }, {
      name: 'Samuel Trump',
      img: 'img/img-placeholder.png'
    }],
  };

})


.controller('TestingCtrl', function ($scope, $ionicModal) {
  $scope.data = [{
    name: '800M Running',
    startDate: '14 January, 2017',
    endDate: '15 January, 2017',
    details: '',
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }],
  }, {
    name: '5KM Cycling',
    startDate: '14 January, 2017',
    endDate: '15 January, 2017',
    details: '',
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }],
  }];

})

.controller('ChartsCtrl', function ($scope, $ionicModal) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
})

.controller('TrainingDiaryCtrl', function ($scope, $ionicModal) {

  $scope.calendar = {};
  $scope.changeMode = function (mode) {
    $scope.calendar.mode = mode;
  };

  $scope.calendar.eventSource = [{
    id: 1,
    type: 'competition',
    title: 'Run Happy Marathon',
    startTime: new Date("October 14, 2016 11:00:00"),
    endTime: new Date("October 14, 2016 23:15:00"),
    allDay: false
  }, {
    id: 1,
    type: 'testing',
    title: 'London Cycling Tour',
    startTime: new Date("October 16, 2016 11:13:00"),
    endTime: new Date("October 16, 2016 14:13:00"),
    allDay: false
  }];

  $scope.onEventSelected = function (event) {
    // console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    console.log(event);
  };

  $scope.onViewTitleChanged = function (title) {
    $scope.viewTitle = title;
  };

  $scope.today = function () {
    $scope.calendar.currentDate = new Date();
  };

  $scope.isToday = function () {
    var today = new Date(),
      currentCalendarDate = new Date($scope.calendar.currentDate);

    today.setHours(0, 0, 0, 0);
    currentCalendarDate.setHours(0, 0, 0, 0);
    return today.getTime() === currentCalendarDate.getTime();
  };

})

.controller('TestingCreateCtrl', function ($scope, $ionicModal) {

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

  $scope.data = {
    name: '300M Running',
    startDate: new Date("January 14, 2017 11:13:00"),
    endDate: new Date("January 15, 2017 11:13:00"),
    details: '300M Running on Ronal Ground',
    assignedAthletes: [{
      name: 'Van Gough',
      img: 'img/img-placeholder.png'
    }, {
      name: 'Samuel Trump',
      img: 'img/img-placeholder.png'
    }],
  };

})


.controller('RegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices) {

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

  $scope.gender = [{
    name: 'Select',
    value: ''
  }, {
    name: 'Male',
    value: 'Male'
  }, {
    name: 'Female',
    value: 'Female'
  }];

  $scope.credentials = [{
    name: 'Select',
    value: ''
  }, {
    name: 'Level 1',
    value: 'Level 1'
  }, {
    name: 'Level 2',
    value: 'Level 2'
  }, {
    name: 'Level 3',
    value: 'Level 3'
  }, {
    name: 'Level 4',
    value: 'Level 4'
  }];

  $scope.countries = MyServices.getCountries();

})

.controller('EditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter) {
  $scope.formData = {
    name: 'Sachin',
    surname: 'Tendulkar',
    image: 'http://2.bp.blogspot.com/-TgdKBlUGk90/T0PhPlFOf8I/AAAAAAAAAVc/jijEQ8u1uUg/s1600/387430_257363124319593_257347670987805_670782_1318978483_n.jpg',
    yearsCoaching: 2,
    email: 'sachin@gmail.com',
    gender: 'Male',
    contact: '+919098765324',
    dob: new Date(),
    country: 'United Kingdom',
    coachingLimit: 50,
    askingPrice: 100,
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

  $scope.dummyPassword = '12345678';

  $scope.submit = function (data) {
    console.log(data);
    $state.go('app.profile');
  };

  $scope.gender = [{
    name: 'Select',
    value: ''
  }, {
    name: 'Male',
    value: 'Male'
  }, {
    name: 'Female',
    value: 'Female'
  }];

  $scope.countries = MyServices.getCountries();

  $ionicModal.fromTemplateUrl('templates/modal/modal-password.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPassword = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal/modal-price.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPrice = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal/modal-coaching-limit.html', {
    id: 3,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalLimit = modal;
  });
  $scope.changePassword = function () {
    $scope.modalPassword.show();
  };
  $scope.changePrice = function () {
    $scope.modalPrice.show();
  };
  $scope.changeLimit = function () {
    $scope.modalLimit.show();
  };
  $scope.closeModal = function () {
    $scope.modalPassword.hide();
    $scope.modalPrice.hide();
    $scope.modalLimit.hide();
  };

  $scope.rangePrice = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 500) {
      $scope.formData.askingPrice = intVal;
    }
  };

  $scope.rangeLimit = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 200) {
      $scope.formData.coachingLimit = intVal;
    }
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
    location: 'United Kingdom',
    age: '22',
    sports: [
      'Cycling',
      'Running'
    ],
    events: [
      'United Kingdom Marathon 2016',
      'Triathlon 2016'
    ]
  };

})

;