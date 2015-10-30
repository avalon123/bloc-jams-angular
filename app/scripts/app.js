var blocJames = angular.module('blocJams', ['ui.router']);

blocJames.controller('landingcontroller',function($scope){
  $scope.sometext = "Turn the music up";
});

blocJames.config(function($stateProvider, $locationProvider) {

     $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
     $stateProvider.state('landing', {
         url: 'landing',
         controller: 'landingcontroller',
         templateUrl: 'C:/Users/excalibur/bloc/bloc-jams-angular/app/templates/landing.html'
     });
     
     $stateProvider.state('album', {
         url: 'album',
         controller: 'Album.controller',
         templateUrl: 'C:/Users/excalibur/bloc/bloc-jams-angular/app/templates/album.html'
     });
     
     $stateProvider.state('collection', {
         url: 'collection',
         controller: 'collection.controller',
         templateUrl: 'C:/Users/excalibur/bloc/bloc-jams-angular/app/templates/collection.html'
     });

 });

