angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.calendar', 'ngCordova'])
  // angular.module('starter.controllers', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])

.controller('LoadingCtrl', function ($scope, $ionicModal, $timeout, $state, $rootScope, MyServices, $ionicHistory) {
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

.controller('RegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices, $filter, $ionicLoading, $ionicModal) {

  $scope.formData = {};

  $scope.toggleOthers = function () {
    if ($scope.formData.specialisations.otherVal === true) {
      $scope.formData.specialisationOther = 'Others';
    } else {
      $scope.formData.specialisationOther = '';
    }
  };

  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Race Walking', 'Hill/Fell Running', 'Cross Country', 'Triathlon'
  ];

  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = ['Male', 'Female'];

  $scope.credentials = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

  $scope.onlyAplha = /^[a-zA-Z_]+$/;
  $scope.validTel = /^[+0-9]{10,15}$/;
  $scope.validNum = /^[0-9]+$/;
  $scope.validEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
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
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.registerCoach(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Registration Successful', 2000);
        $state.go('login');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Registration Failed', 2000);
      }
    });
  };

  //Terms Popup
  $scope.termsID = {
    _id: "580cc6877f2ec11727460f1f"
  };
  $scope.privacyID = {
    _id: "580cc67b7f2ec11727460f1c"
  };
  $scope.termsPopup = function (data) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Do you agree to the Coach Mentor <span class="link" ng-click="staticModal(termsID)">Terms of Service</span> and <span class="link" ng-click="staticModal(privacyID)">Privacy Policy</span>?</p>',
      title: 'Terms & Conditions',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.submitData(data);
        }
      }]
    });
  };


  //Terms Modal
  $ionicModal.fromTemplateUrl('templates/modal/static-page.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.staticModal = function (id) {
    $scope.staticData = '';
    $scope.myPopup.close();
    $scope.showLoading('Loading...', 15000);
    MyServices.getStatic(id, function (data) {
      if (data.value === true) {
        $scope.staticData = data.data;
        $scope.hideLoading();
      } else {
        $scope.hideLoading();
        $scope.showLoading('Loading Failed', 2000);
      }
    });
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
})

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout, $ionicHistory, $ionicLoading, MyServices, $state) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();
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
  $scope.validEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
    $scope.showLoading('Please wait...', 15000);
    MyServices.login(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Login Successful', 2000);
        MyServices.setUser(data.data);
        $state.go('app.profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
})

.controller('ProfileCtrl', function ($scope, $ionicScrollDelegate, $ionicHistory, $rootScope, MyServices, $ionicLoading) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();
  $scope.profileData = MyServices.getUser();

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

  //Reload Profile
  $scope.reloadProfile = function () {
    MyServices.getProfile($scope.profileData, function (data) {
      if (data.value === true) {
        MyServices.setUser(data.data);
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.showLoading('Error Updating Profile', 1000);
      }
    });
  };
  $scope.reloadProfile();

  //Profile Incomplete Check
  $scope.profileIncomplete = function () {
    if (!$scope.profileData.experience || !$scope.profileData.expertise || !$scope.profileData.achievements) {
      return true;
    } else {
      return false;
    }
  };
  // console.log($scope.profileData);
  var i = 0;
  var coach = $scope.profileData._id;
  $scope.showCoachNotification = function (coach) {
    $scope.totalItems = undefined;
    $scope.coachnotifications = undefined;
    $scope.currentPage = 1;
    MyServices.getCoachNotification({
      Id: coach,
      page: $scope.currentPage
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value == true) {
          $scope.isAthlete = false;
          $scope.coachnotifications = response.data.results;
          $scope.notificationCount = response.data.unreadcount;
          $scope.maxRow = response.data.count;
          $scope.totalItems = response.data.total;

        } else {
          $scope.coachnotifications = [];
        }
      }

    })
  };

  $scope.showCoachNotification(coach);



})


.controller('EditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter, $ionicLoading, $cordovaFileTransfer, $cordovaCamera) {
  $scope.formData = MyServices.getUser();
  $scope.formData.dob = new Date($scope.formData.dob);
  $scope.dummyPassword = '12345678';

  if ($scope.formData.specialisationOther) {
    $scope.formData.specialisations.otherVal = true;
  }
  //Toggle Other Specialisations
  $scope.toggleOthers = function () {
    if ($scope.formData.specialisations.otherVal === true) {
      $scope.formData.specialisationOther = 'Others';
    } else {
      $scope.formData.specialisationOther = '';
    }
  };

  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Race Walking', 'Hill/Fell Running', 'Cross Country', 'Triathlon'
  ];

  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = ['Male', 'Female'];

  $scope.credentials = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

  $scope.onlyAplha = /^[a-zA-Z_]+$/;
  $scope.validTel = /^[+0-9]{10,15}$/;
  $scope.validNum = /^[0-9]+$/;

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


  //Profile Incomplete Check
  $scope.profileIncomplete = function () {
    if (!$scope.formData.experience || !$scope.formData.expertise || !$scope.formData.achievements) {
      return true;
    } else {
      return false;
    }
  };

  //Password Validator
  $scope.passwordData = {};
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
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
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.editProfile(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        MyServices.setUser(data.data);
        $scope.showLoading('Profile Updated', 2000);
        $state.go('app.profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Please Try Again', 2000);
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
    $scope.showLoading('Please wait...', 15000);
    MyServices.changePassword(formData, function (data) {
      if (data.value === true) {
        $scope.passwordData = {};
        $scope.hideLoading();
        $scope.showLoading('Password Updated', 2000);
        $state.go('app.profile');
        $scope.closeModal();
      } else {
        $scope.hideLoading();
        $scope.showLoading('Please Try Again', 2000);
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

  //Upload Image
  $scope.uploadImage = function (imageURI) {
    $scope.showLoading('Uploading Image...', 10000);
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
        $scope.showLoading('Error', 2000);
      }, function (progress) {
        // constant progress updates
      });
  };

})

.controller('BlogCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allBlog = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
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


  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allBlog = [];
      $scope.showAllBlog(keywordChange);
    } else {
      $scope.showAllBlog(keywordChange);
    }
  };

  //Get All blog
  $scope.showAllBlog = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allBlog = [];
    }
    MyServices.searchBlog({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allBlog.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allBlog.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Blogs', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    // $scope.more.Data = false;
    console.log('Load More');
    $scope.showAllBlog();
  };
})

.controller('BlogDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.formData = {};
  $scope.selectAthlete = {};
  $scope.blogId = $stateParams.id;

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

  $scope.showLoading('Please wait...', 15000);

  //Select Athletes
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
    $scope.getAthlete('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getAthlete = function (search) {
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        $scope.athletes = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  $scope.removeAthlete = function (pos) {
    $scope.formData.athlete.splice(pos, 1);
  };
  //Match Selected
  $scope.matchAthlete = function () {
    $scope.formData.athlete = $scope.selectAthlete.array;
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
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateBlog(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Blog Edited', 2000);
        $state.go('app.blog');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error Editing Blog', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneBlog({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.hideLoading();
        $scope.formData = response.data;
        $scope.selectAthlete.array = $scope.formData.athlete = response.data.athlete;
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the blog?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteBlog(id);
        }
      }]
    });
  };
  $scope.deleteBlog = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteBlog({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Blog Deleted", 2000);
          $state.go('app.blog');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Blog", 2000);
        }
      });
    }
  };

})

.controller('CompetitionCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allCompetition = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
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


  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allCompetition = [];
      $scope.showAllCompetition(keywordChange);
    } else {
      $scope.showAllCompetition(keywordChange);
    }
  };

  //Get All Competiton
  $scope.showAllCompetition = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allCompetition = [];
    }
    MyServices.searchCompetition({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allCompetition.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allCompetition.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Competitions', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    // $scope.more.Data = false;
    console.log('Load More');
    $scope.showAllCompetition();
  };

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the competition?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteCompetition(id);
        }
      }]
    });
  };
  $scope.deleteCompetition = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteCompetition({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.allCompetition = [];
          $scope.showAllCompetition();
          $scope.hideLoading();
          $scope.showLoading("Competition Deleted", 2000);
        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Competition", 2000);
        }
      });
    }
  };
})

.controller('CompetitionCreateCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Create';
  $scope.selectAthlete = {};
  $scope.formData = {
    iskey: false
  };
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  //Select Athletes Modal
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
    $scope.getAthlete('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getAthlete = function (search) {
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        $scope.athletes = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  $scope.removeAthlete = function (pos) {
    $scope.formData.athlete.splice(pos, 1);
  };
  //Match Selected
  $scope.matchAthlete = function () {
    $scope.formData.athlete = $scope.selectAthlete.array;
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
    $scope.showLoading('Please wait...', 15000);
    MyServices.saveCompetition(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Competition Created', 2000);
        $state.go('app.competition');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
})

.controller('CompetitionDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Edit';
  $scope.formData = {};
  $scope.selectAthlete = {};
  $scope.competitionId = $stateParams.id;
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  //Select Athletes
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
    $scope.getAthlete('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getAthlete = function (search) {
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        $scope.athletes = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  $scope.removeAthlete = function (pos) {
    $scope.formData.athlete.splice(pos, 1);
  };
  //Match Selected
  $scope.matchAthlete = function () {
    $scope.formData.athlete = $scope.selectAthlete.array;
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
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateCompetition(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Competition Edited', 2000);
        $state.go('app.competition');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error Editing Competition', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneCompetition({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.formData = response.data;
        $scope.selectAthlete.array = $scope.formData.athlete = response.data.athlete;
        if ($scope.formData.startDate) {
          $scope.formData.startDate = new Date($scope.formData.startDate);
          $scope.formData.endDate = new Date($scope.formData.endDate);
        }
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the competition?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteCompetition(id);
        }
      }]
    });
  };
  $scope.deleteCompetition = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteCompetition({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Competition Deleted", 2000);
          $state.go('app.competition');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Competition", 2000);
        }
      });
    }
  };

})

.controller('TestingCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allTest = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
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

  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allTest = [];
      $scope.showAllTest(keywordChange);
    } else {
      $scope.showAllTest(keywordChange);
    }
  };

  $scope.showAllTest = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allTest = [];
    }
    MyServices.searchTest({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allTest.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allTest.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Test', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    // $scope.more.Data = false;
    console.log('Load More');
    $scope.showAllTest();
  };

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the test?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteTest(id);
        }
      }]
    });
  };
  $scope.deleteTest = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteTest({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.allTest = [];
          $scope.showAllTest();
          $scope.hideLoading();
          $scope.showLoading("Test Deleted", 2000);
        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Test", 2000);
        }
      });
    }
  };
})

.controller('TestingCreateCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Create';
  $scope.selectAthlete = {};
  $scope.formData = {
    iskey: false
  };
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  //Select Athletes Modal
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
    $scope.getAthlete('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getAthlete = function (search) {
    $scope.athletes = [];
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        _.each(data.data.results, function (key) {
            $scope.athletes.push(key.athlete);
          })
          // $scope.athletes = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  $scope.removeAthlete = function (pos) {
    $scope.formData.newathlete.splice(pos, 1);
  };
  //Match Selected
  $scope.matchAthlete = function () {
    $scope.formData.newathlete = $scope.selectAthlete.array;
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
    if (formData.newathlete) {
      formData.athlete = _.map($scope.formData.newathlete, function (key) {
        return key._id;
      });
    }
    $scope.showLoading('Please wait...', 15000);
    MyServices.saveTest(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Test Created', 2000);
        $state.go('app.testing');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
})

.controller('TestingDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Edit';
  $scope.formData = {};
  $scope.selectAthlete = {};
  $scope.testId = $stateParams.id;
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  //Select Athletes
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
    $scope.getAthlete('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getAthlete = function (search) {
    $scope.athletes = [];
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        _.each(data.data.results, function (key) {
            $scope.athletes.push(key.athlete);
          })
          // $scope.athletes = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  $scope.removeAthlete = function (pos) {
    $scope.formData.newathlete.splice(pos, 1);
  };
  //Match Selected
  $scope.matchAthlete = function () {
    $scope.formData.newathlete = $scope.selectAthlete.array;
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
    if (formData.newathlete) {
      formData.athlete = _.map($scope.formData.newathlete, function (key) {
        return key._id;
      });
    }
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateTest(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Test Edited', 2000);
        $state.go('app.testing');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error Editing Test', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneTest({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.formData = response.data;
        $scope.selectAthlete.array = $scope.formData.newathlete = response.data.athlete;
        if ($scope.formData.startDate) {
          $scope.formData.startDate = new Date($scope.formData.startDate);
          $scope.formData.endDate = new Date($scope.formData.endDate);
        }
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the test?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteTest(id);
        }
      }]
    });
  };
  $scope.deleteTest = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteTest({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Test Deleted", 2000);
          $state.go('app.testing');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Test Test", 2000);
        }
      });
    }
  };
})

.controller('AnalyticsCtrl', function ($scope, $ionicModal) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
})




.controller('TrainingDiaryCtrl', function ($scope, $ionicModal, $ionicLoading, uiCalendarConfig, MyServices) {
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

  //Select Athlete
  $ionicModal.fromTemplateUrl('templates/modal/select-athlete.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal1 = modal;
  });
  $scope.openSelect = function () {
    $scope.modal1.show();
    $scope.getAthlete('');
  };

  //Feedback Modal
  $ionicModal.fromTemplateUrl('templates/modal/feedback.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal2 = modal;
  });
  $scope.openModal = function () {
    $scope.modal2.show();
  };

  $scope.closeModal = function () {
    $scope.modal1.hide();
    $scope.modal2.hide();
  };

  //Selector data
  $scope.formData = {};
  $scope.matchName = function (data) {
    $scope.formData.athlete = data;
  };
  $scope.athleteData = [];

  $scope.commentData = {};
  var j = 0;
  $scope.getAthlete = function (search) {
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        $scope.athletes = data.data.results;
      }
    });
  };
  $scope.changeAthlete = function () {
    $scope.athleteData = [];
    MyServices.getAthletePlans({
      _id: $scope.formData.athlete._id
    }, function (data) {
      if (_.isArray(data.data)) {
        $scope.athleteData = data.data;
        parsePlanToCalender(data.data);
      } else {
        $scope.athleteData = [];
      }
    });
  };

  $scope.athletes = [];

  function parsePlanToCalender(Plans) {
    $scope.trainingDiary = [];
    _.each(Plans, function (plan) {
      var startDays = 0;
      _.each(plan.trainingForms, function (form) {
        form.trainingPlan = plan._id;
        var obj = {
          color: form.form.colorCode,
          events: [{
            title: "• " + form.form.name + " - " + plan.name,
            start: moment(plan.startDate).add(startDays, "days").toDate(),
            end: moment(plan.startDate).add(startDays, "days").add(form.duration, 'days').toDate(),
            allDay: true,
            planForm: form,
            colorCode: form.form.colorCode
          }],
        };
        startDays += form.duration;
        if (!_.isEmpty(form.comment)) {
          var obj2 = _.cloneDeep(obj);
          obj2.color = "#444";
          obj2.events[0].title = "Comment: " + form.comment;
          $scope.trainingDiary.push(obj2);
        }
        $scope.trainingDiary.push(obj);
      });
    });
    changePendingForm();
  }

  /* Change View */
  $scope.renderCalendar = function (calendar) {
    $timeout(function () {
      if (uiCalendarConfig.calendars[calendar]) {
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    });
  };

  var m;
  /* alert on eventClick */
  $scope.diaryClick = function (obj) {
    $scope.dayInfo = obj;
    console.log(obj);
    $scope.formInfo = obj.planForm;
    m = moment(obj.end);
    if (obj.planForm.answer && obj.planForm.answer.length > 0) {
      $scope.feedback = obj.planForm.answer;
      $scope.showComment = false;
      $scope.makeDisable = true;
      if (moment().isSameOrAfter(m)) {
        $scope.openModal();
        console.log('Feedback');
      }
    } else {
      $scope.feedback = obj.planForm.answer;
      $scope.showComment = true;
      $scope.commentData.comment = obj.planForm.comment;
      if (moment().isBefore(m)) {
        $scope.openModal();
        console.log('Comment');
      }
    }
    if (obj.planForm.answer.length === 0) {
      if (moment().isSameOrAfter(m)) {
        $scope.showLoading('No Feedback Recived', 2000);
      }
    }
  };

  $scope.dayClick = function (date, jsEvent, view) {
    $scope.clickedDay = date;
  };

  /* Change View */
  $scope.activeView = 'month';
  $scope.changeView = function (view) {
    uiCalendarConfig.calendars.coachDiary.fullCalendar('changeView', view);
    $scope.activeView = view;
  };

  //Navigate Buttons
  $scope.navigate = function (val) {
    uiCalendarConfig.calendars.coachDiary.fullCalendar(val);
  };

  $scope.uiConfig = {
    calendar: {
      firstDay: 1,
      height: 450,
      editable: false,
      eventClick: $scope.diaryClick,
      viewRender: function (view) {
        $scope.viewTitle = view.title;
      }
    }
  };

  /* event sources array*/
  $scope.trainingDiary = [];
  var changePendingForm = function () {
    console.log($scope.trainingDiary);
    $scope.pendingForm = [];
    _.each($scope.trainingDiary, function (events) {
      _.each(events.events, function (obj) {
        if (obj.planForm.answer && obj.planForm.answer.length > 0) {
          $scope.pendingForm.push(obj);
        }
      });

    });
    console.log($scope.pendingForm);
  };

  $scope.submitComment = function () {
    var obj = {};
    obj.trainingPlan = $scope.formInfo.trainingPlan;
    obj.trainingForm = $scope.formInfo._id;
    obj.trainingFormStart = "";
    obj.trainingFormEnd = "";
    obj.comment = $scope.commentData.comment;
    console.log(obj);
    MyServices.saveComment(obj, function (data) {
      $scope.showLoading('Comment Submitted', 2000);
      $scope.changeAthlete();
    });
  };


})

.controller('AthletesCoachingCtrl', function ($scope, $ionicModal, MyServices, $stateParams) {
  $scope.profileData = MyServices.getUser();
  var coachId = $scope.profileData._id;
  var i = 0;
  $scope.search = {
    keyword: ""
  };
  if ($stateParams.keyword) {
    $scope.search.keyword = $stateParams.keyword;
  }
  $scope.changePage = function (page) {
    var goTo = "app.athletes-coaching";
    if ($scope.search.keyword) {
      goTo = "app.athletes-coaching";
    }
    $state.go(goTo, {
      page: page,
      keyword: $scope.search.keyword
    });
  };

  $scope.showAllNotification = function (coachId) {
    MyServices.getAllRequest({
      Id: coachId
    }, function (response) {
      if (response.value == true) {
        $scope.athletes = response.data;
        $scope.requestCount = $scope.athletes.length;
      }
    })
  }
  $scope.showAllNotification(coachId);

  $scope.getMyAthletes = function (keywordChange) {
    $scope.totalItems = undefined;
    $scope.athletecoaching = undefined;
    if (keywordChange) {
      $scope.currentPage = 1;
    }
    MyServices.getMyAthletes({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value) {
          $scope.athletecoaching = response.data.results;
          $scope.totalItems = response.data.total;
          $scope.maxRow = response.data.options.count;
        } else {
          $scope.athletecoaching = [];
        }
      }
    });
  };
  $scope.getMyAthletes();
})

.controller('AthletesRequestCtrl', function ($scope, $ionicModal, MyServices) {
  $scope.profileData = MyServices.getUser();

  $scope.reason = function (notificationId) {
    $scope.Id = notificationId;
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.reasonForRejection"><textarea>',
      title: '<h4>Reject Unsubscription!</h4>',
      subTitle: 'Please enter some reason',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Reject</b>',
        type: 'button-assertive',
        onTap: function (e) {
          $scope.rejectRequest($scope.data.message);
        }
      }, ]
    });
  };

  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };
  var coachId = $scope.profileData._id;
  $scope.showAllNotification = function (coachId) {
    MyServices.getAllRequest({
      Id: coachId
    }, function (response) {
      if (response.value == true) {
        $scope.athletes = response.data;
        $scope.requestCount = $scope.athletes.length;
      }
    })
  }
  $scope.showAllNotification(coachId);

  $scope.rejectRequest = function (requestRejectData) {
    var athleteCoaching = {};
    athleteCoaching._id = $scope.Id;
    athleteCoaching.status = "Rejected";
    athleteCoaching.readRequestStatus = true;
    athleteCoaching.reason = requestRejectData
    $scope.acceptRejectRequest(athleteCoaching, 'reject');
  }

  $scope.acceptRequest = function (Id) {
    var athleteCoaching = {};
    athleteCoaching._id = Id;
    athleteCoaching.status = "Payment Pending";
    athleteCoaching.readRequestStatus = true;
    // athleteCoaching.acceptedDate = moment().format();
    $scope.acceptRejectRequest(athleteCoaching, 'accept');
  }

  $scope.acceptRejectRequest = function (athleteCoaching, data) {
    MyServices.updateAthleteCoaching(athleteCoaching, function (response) {
      if (response.value == true) {
        if (data == 'accept') {
          // toastr.success('Request accepted', 'Thank you');
        } else {
          // $scope.modalInstance.close();
          // toastr.success('Request Rejected', 'Thank you');
        }
        $scope.showAllNotification(coachId);
      }
    })
  }


})

.controller('AthletesCoachingDetailCtrl', function ($scope, $ionicModal, $stateParams, MyServices, $ionicPopup) {
  $scope.unsubscribe = {};
  if ($stateParams.athleteId) {
    $scope.athleteCoaching = undefined;
    MyServices.getOneAthleteCoached({
      athleteId: $stateParams.athleteId
    }, function (response) {
      if (response.value) {
        $scope.athleteCoaching = response.data;
      } else {
        $scope.athleteCoaching = [];
      }
    })
  }
  $scope.reason = function (athleteCoachId, coachID) {
    $scope.unsubscribe._id = athleteCoachId;
    $scope.unsubscribe.coachID = coachID;
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.reasonForRejection"><textarea>',
      title: '<h4>Unsubscription!</h4>',
      subTitle: 'Please enter some reason',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Reject</b>',
        type: 'button-assertive',
        onTap: function (e) {
          $scope.unsubscribe.reason = $scope.data.reasonForRejection;
          $scope.rejectRequest();
        }
      }, ]
    });
  };

  $scope.rejectRequest = function () {
    $scope.unsubscribe.status = "Unsubscribe";
    MyServices.Unsubscribeathlete($scope.unsubscribe, function (response) {
      // if (response.value === true) {
      // } else {
      // }
    })
  }

})

.controller('AthleteDetailCtrl', function ($scope, $ionicModal, $stateParams, MyServices) {
  if ($stateParams.athleteId) {
    $scope.athleteProfile = undefined;
    MyServices.getOneAthleteProfile({
      _id: $stateParams.athleteId
    }, function (response) {
      if (response.value) {
        $scope.athleteProfile = response.data;
      } else {
        $scope.athleteProfile = [];
      }
    })
  };
})

.controller('NotificationsCtrl', function ($scope, $ionicModal, MyServices, $ionicScrollDelegate, $ionicPopup) {
  $scope.profileData = MyServices.getUser();
  // $scope.notifications = [{
  //   name: 'Matt',
  //   surname: 'Chant',
  //   type: 'athleteUnsubscribe'
  // }, {
  //   name: 'Matt',
  //   surname: 'Chant',
  //   type: 'competition'
  // }];



  // console.log($scope.profileData);
  var i = 0;
  var coach = $scope.profileData._id;

  $scope.showCoachNotification = function (coach) {
    $scope.totalItems = undefined;
    $scope.coachnotifications = undefined;
    $scope.currentPage = 1;
    MyServices.getCoachNotification({
      Id: coach,
      page: $scope.currentPage
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value == true) {
          $scope.isAthlete = false;
          $scope.coachnotifications = response.data.results;
          $scope.notificationCount = response.data.unreadcount;
          $scope.maxRow = response.data.count;
          $scope.totalItems = response.data.total;

        } else {
          $scope.coachnotifications = [];
        }
      }

    })
  };

  // $scope.showCoachNotification(coach);

  $scope.readNotification = function () {
    $scope.totalItems = undefined;
    $scope.athletenotifications = undefined;
    $scope.coachnotifications = undefined;
    $scope.currentPage = 1;
    MyServices.readcoachNotification({
      Id: coach,
      page: $scope.currentPage
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value == true) {
          $scope.isAthlete = false;
          $scope.coachnotifications = response.data.results;
          $scope.notificationCount = response.data.unreadcount;
          $scope.maxRow = response.data.options.count;
          $scope.totalItems = response.data.total;
          $scope.showCoachNotification(coach);
        } else {
          $scope.coachnotifications = [];
        }
      }

    })
  }

  $scope.readNotification();

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

  $ionicScrollDelegate.scrollBottom(true);
  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };

  $scope.sendMessage = function () {

    if ($scope.data.message !== '' && $scope.data.message) {
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
    userId: 'me',
    text: 'Hi Matt, how did you find the session?',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Good, I managed to hit my target times, legs are feeling quite tired now.',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Good, I suggest you rehab today ready for tomorrow’s session.',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Stretch, foam roll etc, please refer to rehab programme attached with your Training Plan',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Will do, thanks.',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'James, a question regarding the session on the 27th November, you have set three sets however still struggling with the legs from last week, shall I drop a set or take the reps slower and get it finished?',
    time: $scope.timeStamp()
  }, {
    userId: 'me',
    text: 'Stick with the two sets, get it done in flats. I will adapt your training plan for you.',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Thanks James',
    time: $scope.timeStamp()
  }, {
    userId: 'he',
    text: 'Session complete, have submitted my times in session feedback  ',
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
    text: 'Hello! Welcome to Coach Mentor',
    time: $scope.timeStamp()
  }];

})

;
