// var adminurl = "http://coachmentor.wohlig.com/api/";
var adminurl = "http://wohlig.io/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var user = {};
angular.module('starter.services', [])
  .factory('MyServices', function ($http, $filter) {
    var requestCredentials;

    var userProfile = $.jStorage.get("userProfile");
    if (!userProfile) {
      userProfile = {};
    } else {
      requestCredentials = {
        accessToken: $.jStorage.get("userProfile").accessToken[0],
        accessType: "Coach"
      };
    }

    var returnval = {};

    return {
      getCountries: function (callback) {
        $http({
          url: "json/countries.json",
          method: 'GET',
        }).success(callback);
      },

      setUser: function (data) {
        _.assignIn(userProfile, data);
        $.jStorage.set("userProfile", userProfile);
        requestCredentials = {
          accessToken: $.jStorage.get("userProfile").accessToken[0],
          accessType: "Coach"
        };
      },

      getUser: function () {
        return userProfile;
      },

      getStatic: function (formData, callback) {
        $http({
          url: adminurl + 'ConfigTwo/getOne',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      registerCoach: function (formData, callback) {
        $http({
          url: adminurl + 'Coach/registerCoach',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      login: function (formData, callback) {
        $http({
          url: adminurl + 'Coach/coachLogin',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      editProfile: function (formData, callback) {
        $http({
          url: adminurl + 'Coach/updateCoachProfile',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      getProfile: function (formData, callback) {
        $http({
          url: adminurl + 'Coach/getCoachProfile',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      changePassword: function (formData, callback) {
        $http({
          url: adminurl + 'Coach/resetPasswordCoach',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      searchAthlete: function (formData, i, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'athlete/search',
          method: 'POST',
          data: formData
        }).success(function (data) {
          callback(data, i);
        });
      },

      getAthletePlans: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http.post(adminurl + 'athlete/getAthletePlans', formData).success(function (data) {
          callback(data);
        });
      },

      saveComment: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http.post(adminurl + 'trainingPlan/saveComment', formData).success(function (data) {
          callback(data);
        });
      },

      saveCompetition: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Competition/save',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      updateCompetition: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Competition/updateCompetition',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      deleteCompetition: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Competition/delete',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      getOneCompetition: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Competition/findOne',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      searchCompetition: function (formData, i, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Competition/search',
          method: 'POST',
          data: formData
        }).success(function (data) {
          callback(data, i);
        });
      },

      saveTest: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Test/save',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      updateTest: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Test/updateTest',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      deleteTest: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Test/delete',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      getOneTest: function (formData, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Test/findOne',
          method: 'POST',
          data: formData
        }).success(callback);
      },
      searchTest: function (formData, i, callback) {
        formData = _.merge(formData, requestCredentials);
        $http({
          url: adminurl + 'Test/search',
          method: 'POST',
          data: formData
        }).success(function (data) {
          callback(data, i);
        });
      },

    };
  });
