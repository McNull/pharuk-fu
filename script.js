// Code goes here

var app = angular.module('app', ['movies', 'ngRoute']);

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'movie-list.ng.html'
  });

  $routeProvider.when('/movie/:id', {
    templateUrl: 'movie-details.ng.html'
  });


  $routeProvider.otherwise({
    redirectTo: '/'
  });

});


app.constant('movieListState', {
    currentPage: 0,
    itemsPerPage: 10
});

app.controller('MovieListController', function($scope, movieResource, $location, movieListState) {

    $scope.pager = movieListState;

    $scope.pager.next = function() {
      $scope.pager.currentPage += 1;
    };

    $scope.pager.prev = function() {
      $scope.pager.currentPage = Math.max($scope.pager.currentPage - 1, 0);
    };

    $scope.$watch('pager.currentPage', function(value, oldValue) {

        movieResource.query({
            skip:  $scope.pager.currentPage * $scope.pager.itemsPerPage,
            take: $scope.pager.itemsPerPage
        }, function(movies) {
            $scope.movies = movies;
        });

    });


    $scope.open = function(movie) {
      $location.path('/movie/' + movie.title);
    };

});

app.controller('MovieDetailsController', function($scope, $route, movieResource) {

  movieResource.get({ 
    title: $route.current.params.id
  }, function(result) {
    $scope.movie = result;
  });

});