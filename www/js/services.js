var adminurl = "http://coachmentor.wohlig.co.in/api/";
// var adminurl = "http://192.168.2.78/api/";
var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
var user = {};
angular.module('starter.services', [])
  .factory('MyServices', function ($http, $filter) {
    var userProfile = $.jStorage.get("userProfile");
    if (!userProfile) {
      userProfile = {};
    }

    var requestCredentials;
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

      registerCoach: function (formData, callback) {
        $http({
          url: adminurl + 'Coach/registerCoach',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      getStatic: function (formData, callback) {
        $http({
          url: adminurl + 'ConfigTwo/getOne',
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
    };
  });
