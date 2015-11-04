var blocJames = angular.module('blocJams', ['ui.router']);

blocJames.controller('landing.controller',function($scope){
  $scope.sometext = "Turn the music up";
});

blocJames.controller('collection.controller',function($scope){
    $scope.albums =albumPicasso;
    
});
blocJames.controller('album.controller',function($scope){
    $scope.albums =albumPicasso;
    
});
blocJames.config(function($stateProvider, $locationProvider) {

     $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
     $stateProvider.state('landing', {
         url: 'landing',
         controller: 'landing.controller',
         templateUrl: '/templates/landing.html'
     });
     
     $stateProvider.state('album', {
         url: 'album',
         controller: 'album.controller',
         templateUrl: '/templates/album.html'
     });
     
     $stateProvider.state('collection', {
         url: 'collection',
         controller: 'collection.controller',
         templateUrl: '/templates/collection.html'
     });

 });

