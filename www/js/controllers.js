angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.rCalendar', 'ngCordova'])

.controller('LoadingCtrl', function ($scope, $ionicModal, $timeout, $state, $rootScope, MyServices) {
  $scope.loadingData = MyServices.getUser();
  if ($scope.loadingData.accessToken) {
    $state.go('app.profile');
  } else {
    $state.go('login');
  }
})

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $rootScope, MyServices) {
  $scope.profileData = MyServices.getUser();

  // Log out
  $scope.logout = function () {
    $.jStorage.flush();
    $state.go('login');
  };

})

.controller('RegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices, $filter, $ionicLoading) {

  $scope.formData = {};

  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Hill/Fell Running', 'Cross Country', 'Triathlon'
  ];

  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = [{
    name: 'Male',
    value: 'Male'
  }, {
    name: 'Female',
    value: 'Female'
  }];

  $scope.credentials = [{
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

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Password Validator
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordValidate = true;
    if (password && password.length >= 8) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordValidate = false;
    } else {
      $scope.passwordValidate = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 10000);
    MyServices.registerCoach(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Registration Successful!', 2000);
        $state.go('login');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Registration Failed!', 2000);
      }
    });
  };

  //Terms Popup
  $scope.termsPopup = function (formData) {
    var myPopup = $ionicPopup.show({
      template: '<p>Do you agree to the Coach Mentor Terms of Service and Privacy Policy?</p>',
      title: 'Terms of Service',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.submitData(formData);
        }
      }]
    });
  };
})

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout, $ionicHistory, $ionicLoading, MyServices, $state) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
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

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 10000);
    MyServices.login(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Login Successful!', 2000);
        MyServices.setUser(data.data);
        $state.go('app.profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
})

.controller('ProfileCtrl', function ($scope, $ionicScrollDelegate, $ionicHistory, $rootScope, MyServices) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $scope.profileData = MyServices.getUser();
})


.controller('EditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter, $ionicLoading, $cordovaFileTransfer, $cordovaCamera) {
  $scope.formData = MyServices.getUser();
  $scope.formData.dob = new Date($scope.formData.dob);
  $scope.dummyPassword = '12345678';

  if ($scope.formData.specialisationOther) {
    $scope.formData.specialisations.otherVal = true;
  }

  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Hill/Fell Running', 'Cross Country', 'Triathlon'
  ];

  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = [{
    name: 'Male',
    value: 'Male'
  }, {
    name: 'Female',
    value: 'Female'
  }];

  $scope.credentials = [{
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

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Password Validator
  $scope.passwordData = {};
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordValidate = true;
    if (password && password.length >= 8) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordValidate = false;
    } else {
      $scope.passwordValidate = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 10000);
    MyServices.editProfile(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        MyServices.setUser(data.data);
        $scope.showLoading('Profile Updated!', 2000);
        $state.go('app.profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Please Try Again!', 2000);
      }
    });
  };

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  $ionicModal.fromTemplateUrl('templates/modal/password.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPassword = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal/price.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPrice = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal/coaching-limit.html', {
    id: 3,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalLimit = modal;
  });

  // Update Password
  $scope.passwordData = {};
  $scope.changePassword = function () {
    $scope.passwordData.accessToken = $scope.formData.accessToken;
    $scope.modalPassword.show();
  };
  $scope.submitPassword = function (formData) {
    $scope.showLoading('Please wait...', 10000);
    MyServices.changePassword(formData, function (data) {
      if (data.value === true) {
        $scope.passwordData = {};
        $scope.hideLoading();
        $scope.showLoading('Password Updated!', 2000);
        $state.go('app.profile');
        $scope.closeModal();
      } else {
        $scope.hideLoading();
        $scope.showLoading('Please Try Again!', 2000);
      }
    });
  };

  $scope.closeModal = function () {
    $scope.modalPassword.hide();
    $scope.modalPrice.hide();
    $scope.modalLimit.hide();
  };

  //Update Price
  $scope.priceData = {};
  $scope.changePrice = function () {
    $scope.priceData.coachAskingPrice = $scope.formData.coachAskingPrice;
    $scope.modalPrice.show();
  };
  $scope.rangePrice = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 500) {
      $scope.priceData.coachAskingPrice = intVal;
    }
  };
  $scope.submitPrice = function (data) {
    $scope.formData.coachAskingPrice = data.coachAskingPrice;
    $scope.submitData($scope.formData);
  };

  //Update Coaching Limit
  $scope.limitData = {};
  $scope.changeLimit = function () {
    $scope.limitData.coachingLimit = $scope.formData.coachingLimit;
    $scope.modalLimit.show();
  };
  $scope.rangeLimit = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 200) {
      $scope.limitData.coachingLimit = intVal;
    }
  };
  $scope.submitLimit = function (data) {
    $scope.formData.coachingLimit = data.coachingLimit;
    console.log($scope.formData);
    $scope.submitData($scope.formData);
  };

  // Upload Profile Pic
  $scope.selectImage = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function (imageURI) {
      $scope.profileImage = imageURI;
      $scope.uploadImage($scope.profileImage);
    }, function (err) {
      // error
    });
  };

  $scope.uploadImage = function (imageURI) {
    $scope.showLoading('Uploading Image!', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function (result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.formData.profilePic = result.response.data[0];
        $scope.submitData($scope.formData);
      }, function (err) {
        // Error
        $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function (progress) {
        // constant progress updates
      });
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
  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
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
  $ionicModal.fromTemplateUrl('templates/modal/chat.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalChat = modal;
  });
  $scope.newChat = function () {
    $scope.modalChat.show();
  };

  $ionicModal.fromTemplateUrl('templates/modal/group-chat.html', {
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

  $scope.title = 'Add Competition';

  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
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

  $scope.title = 'Edit Competition';


  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
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
    details: 'Lorem ipsum facilisis',
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

.controller('AnalyticsCtrl', function ($scope, $ionicModal) {
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

  $scope.title = 'Create';

  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
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

.controller('TestingDetailCtrl', function ($scope, $ionicModal) {

  $scope.title = 'Edit';
  $ionicModal.fromTemplateUrl('templates/modal/add-athlete.html', {
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

.controller('AthletesCoachingCtrl', function ($scope, $ionicModal) {
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

.controller('AthletesRequestCtrl', function ($scope, $ionicModal) {
  $scope.athleteRequests = [{
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    sports: 'Running, Cycling',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae maiores, cupiditate rerum facere ex velit dignissimos expedita totam dicta saepe, ad sint inventore blanditiis consequuntur possimus dolorem at nisi dolore!',
  }, {
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    sports: 'Running, Cycling',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae maiores, cupiditate rerum facere ex velit dignissimos expedita totam dicta saepe, ad sint inventore blanditiis consequuntur possimus dolorem at nisi dolore!',
  }, ];
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
    sports: 'Cycling, Running',
    events: 'United Kingdom Marathon 2016, Triathlon 2016'
  };

})

.controller('AthleteDetailCtrl', function ($scope, $ionicModal) {

  $scope.athlete = {
    name: 'Matt',
    surname: 'Smith',
    image: 'img/img-placeholder.png',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae maiores, cupiditate rerum facere ex velit dignissimos expedita totam dicta saepe, ad sint inventore blanditiis consequuntur possimus dolorem at nisi dolore!',
    location: 'United Kingdom',
    age: '22',
    sports: 'Cycling, Running',
    events: 'United Kingdom Marathon 2016, Triathlon 2016'
  };

})

.controller('NotificationsCtrl', function ($scope, $ionicModal, $ionicScrollDelegate, $ionicPopup) {
  $scope.notifications = [{
    name: 'Mathew',
    surname: 'Dodge',
    type: 'athleteUnsubscribe'
  }, {
    name: 'Mathew',
    surname: 'Dodge',
    type: 'competition'
  }];

  $scope.reason = function () {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.message"><textarea>',
      title: '<h4>Reject Unsubscription!</h4>',
      subTitle: 'Please enter some reason',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Reject</b>',
        type: 'button-assertive',
        onTap: function (e) {
          console.log($scope.data.message);
        }
      }, ]
    });
  };
})

;
