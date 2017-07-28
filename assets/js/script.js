var myapp=angular.module('Platzi',[]);
var connections=[];
myapp.controller('BaseCtrl',function($scope,$http){

  $scope.textArray=[];
  $scope.sendMessage=function(){
  io.socket.post('/texts',{text:$scope.text,name:$scope.name},function(data){
    $scope.textArray.push(data);
    $scope.text="";
    $scope.$apply();
    return true;
  });
 }
  
  io.socket.get('/texts',function(data){
    $scope.textArray=data;
    $scope.$apply();
    return true;
  });

  io.socket.on('texts',function(event){
    switch(event.verb){
      case'created':
      $scope.textArray.push(event.data);
      $scope.$apply();
      break;
    }
  });

   io.socket.on('disconnect', function(){
      console.log('Lost connection to server');
  });


  io.socket.get('/emoji',function(data){
  	$scope.emojis=data;
  	$scope.$apply();
  });

  io.socket.on('emoji',function(event){
  	switch(event.verb){
  		case'created':
  		$scope.emojis.push(event.data);
  		$scope.$apply();
  		break;
  	}
  }); 

/* 
  
var emojis =[
  {
    id:1,
    text:':P'
  },
  {s
    id:2,
    text:':)'
  },
  {
    id:3,
    text:':-)'
  },
  {
    id:4,
    text:':('
  },
  ];
  $scope.emojis=emojis;*/
});