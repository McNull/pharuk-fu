// Code goes here

var app = angular.module('app', ['movies']);


app.controller('MainController', function($scope, movieResource) {

  movieResource.query({
    skip: 1,
    take: 10
  }, function(movies) {
    $scope.movies = movies;
  });
  
});