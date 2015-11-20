var blocJames = angular.module('blocJams', ['ui.router']);
//ctrls
blocJames.controller('landing.controller',function($scope){
  $scope.sometext = "Turn the music up";
});

blocJames.controller('collection.controller',function($scope){
    $scope.albums =albumPicasso;
    
});

blocJames.controller('album.controller',function($scope,Audio,DataUpdate,SongPlayer){ 
    //initialize..
    DataUpdate.datafuc(0);
    $scope.albums =albumPicasso;
    $scope.player = SongPlayer;
    $scope.audio = Audio;
    $scope.player.isplaying= 0;
    $scope.player.playbar($scope.player.isplaying);
    $scope.player.playerSrc($scope.player.isplaying);
    // get the index..
    $scope.getSong = function(){
        $scope.player.isplaying = this.$index;
        DataUpdate.datafuc($scope.player.isplaying);
        $scope.player.playbar($scope.player.isplaying);
    }
});

//services
blocJames.factory('Audio', ['$document',function($document){

    var audio=$document[0].createElement('audio');
    return audio;
}]);


blocJames.factory('DataUpdate', function($rootScope,$filter){
    var albums = albumPicasso;
    var data = {
        datafuc: function(index){
        $rootScope.songName = albums.songs[index].name;
        $rootScope.songTime = $filter('Time')(albums.songs[index].length);
    }
    };
    return data;

});

blocJames.factory('SongPlayer', ['Audio','DataUpdate',function(Audio,DataUpdate){
    var currentAlbum = albumPicasso;
    var player={
        len: currentAlbum.songs.length,
        playbar: function(index){
        player.playerSrc(index);
        DataUpdate.datafuc(index);
        player.play();
        player.playing=true;
    },
    playerSrc :function(index){
        var url = currentAlbum.songs[index].audioUrl;
        Audio.src=url;
    },
    play:function(index){
        if(player.playing){
            player.stop();
        }
        Audio.play();
        player.playing=true;
    },
    stop: function(){
        if(player.playing){
            Audio.pause();
        }
        player.playing=false;
    },
    previousSong: function(index){
        console.log(player.isplaying);
        console.log(player.len);
        if(player.isplaying==0){
            player.isplaying = player.len -1;
        }else{
            player.isplaying -= 1;
        }
        player.playbar(player.isplaying);
    },
    nextSong: function(index){
        console.log(player.isplaying);
        if(player.isplaying==(player.len-1)){
            player.isplaying=0;}
        else{
            player.isplaying+=1;
        }
        player.playbar(player.isplaying);
    }
};
    return player;
}]);
//directives
blocJames.directive('slider',function($document,$interval){
    return{
         restrict: 'AE',
         replace: true,
         scope: {
                 player: '=',
                 audio: '='
                },
         template: "<div ng-click='adjustBar($event)'>"
        +'<div class="fill" style="{{seekBarFillWidth}}"></div>'
        +'<div class="thumb" style="{{seekBarThumbLeft}}"></div>'
        +'<div class="current-time" ng-init="playTime=0">{{playTime|Time}}</div>'
        +'</div>',
         link: function(scope, element, attributes) {
             console.log(scope.audio);
             scope.playedFill = function(){
                 var playedRatio = scope.audio.currentTime/scope.audio.duration*100;
                 scope.seekBarFillWidth ='width:'+ playedRatio+'%';
                 scope.seekBarThumbLeft ='left:'+playedRatio+'%';
                 scope.playTime =scope.audio.currentTime;
             };
             
             scope.adjustBar = function(eve){
                 var event=window.event||eve;
                 console.log(event);
                 var progressX = event.clientX - $document[0].querySelector('.seek-bar').getBoundingClientRect().left;
                 console.log(progressX);
//                 console.log($document[0].querySelector('.seek-bar').clientWidth);
                 var barwidth = parseInt($document[0].querySelector('.seek-bar').clientWidth);
//                 console.log(barwidth);
                 scope.audio.currentTime = progressX/barwidth*scope.audio.duration;
                 
             };            
             
             scope.audio.addEventListener('timeupdate',function(){
                scope.$apply(scope.playedFill());
                 console.log(scope.playTime);
                 console.log(scope.seekBarFillWidth);
            });
    
                 
             
    }
    };    
});

blocJames.directive('volume',function($document,$interval){
    return{
         restrict: 'AE',
         replace: true,
         scope: {
                 player: '=',
                 audio: '='
                },
         template: "<div ng-click='volumeCtrl($event)'>"
        +'<div class="fill" style="{{volumeFillWidth}}"></div>'
        +'<div class="thumb" style="{{volumeThumbLeft}}"></div>'
        +'</div>',
         link: function(scope, element, attributes) {
             console.log(scope.audio.volume);
             scope.audio.volume = 0.8;
             scope.volumeCtrl = function(ev){
                 var event = window.event||ev;
                 var volumeX = event.clientX - $document[0].querySelectorAll('.seek-bar')[1].getBoundingClientRect().left;
                 console.log(volumeX);
                 var volumeRatio = volumeX/($document[0].querySelectorAll('.seek-bar')[1].clientWidth);
                 scope.audio.volume = volumeRatio;
                 scope.volumeFillWidth ='width:'+ 100*volumeRatio+'%';
                 scope.volumeThumbLeft ='left:'+100*volumeRatio+'%';
                 
             };
             
    }
    };    
});
//filter
blocJames.filter('Time', function(){
    return function(timeInSeconds){
        var secs = Number.parseFloat(timeInSeconds);
        var wholesecs = Math.floor(secs);
        var mins = Math.floor(wholesecs/60);
        var remainsecs = wholesecs%60;
        var output = mins + ' : ' + remainsecs;
        return output;
    }

});
//config
blocJames.config(function($stateProvider, $locationProvider,$urlRouterProvider) {

     $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
//    $urlRouterProvider
//        .otherwise('index');
//    
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

