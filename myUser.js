angular.module('myApp', ['ngStorage']).controller('userCtrl', function($scope, $localStorage, $sessionStorage) {
$scope.orderByField = 'id';
$scope.reverseSort = false;
$scope.fName = '';
$scope.lName = '';
$scope.times = 0;
$scope.country = '';
$scope.curEntry = 0;

$scope.$storage = $localStorage.$default({
	users: [
	{id:1, fName:'Hege', lName:"Pege", times:4, country:"Sweden" },
	{id:2, fName:'Kim',  lName:"Pim", times:5, country:"Korea" },
	{id:3, fName:'Sal',  lName:"Smith", times:8, country:"USA" },
	{id:4, fName:'Jack', lName:"Jones", times:0, country:"UK" },
	{id:5, fName:'John', lName:"Doe", times:0, country:"USA" },
	{id:6, fName:'Corinne',lName:"Pan", times:1, country:"UK" }
	]
});
/*
$scope.users = [
{id:1, fName:'Hege', lName:"Pege", times:4, country:"Sweden" },
{id:2, fName:'Kim',  lName:"Pim", times:5, country:"Korea" },
{id:3, fName:'Sal',  lName:"Smith", times:8, country:"USA" },
{id:4, fName:'Jack', lName:"Jones", times:0, country:"UK" },
{id:5, fName:'John', lName:"Doe", times:0, country:"USA" },
{id:6, fName:'Corinne',lName:"Pan", times:1, country:"UK" }
];
*/
$scope.edit = true;
$scope.error = false;

$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.edit = true;
    $scope.fName = '';
    $scope.lName = '';
    $scope.times = 0;
    $scope.country = '';
    } else {
    $scope.edit = false;
    $scope.curEntry = id-1;
    $scope.fName = $scope.$storage.users[id-1].fName;
    $scope.lName = $scope.$storage.users[id-1].lName;
    $scope.times = $scope.$storage.users[id-1].times;
    $scope.country = $scope.$storage.users[id-1].country;
  }
};

$scope.deleteUser = function(id) {
  if ((id-1) == Object.keys($scope.$storage.users).length) {
    $scope.$storage.users.pop();
  } else {
    $scope.$storage.users.splice((id-1),1);
  }
};

$scope.saveUser = function() {
    $scope.$storage.users[$scope.curEntry].fName = $scope.fName;
    $scope.$storage.users[$scope.curEntry].lName = $scope.lName;
    $scope.$storage.users[$scope.curEntry].times = $scope.times;
    $scope.$storage.users[$scope.curEntry].country = $scope.country;
    $scope.fName = '';
    $scope.lName = '';
    $scope.times = 0;
    $scope.country = '';
};

$scope.newUser = function() {
  $scope.$storage.users.push({
    id:Object.keys($scope.$storage.users).length+1,
    fName:$scope.fName,
    lName:$scope.lName,
    times:$scope.times,
    country:$scope.country
  });
  $scope.fName = '';
  $scope.lName = '';
  $scope.times = 0;
  $scope.country = '';
};

$scope.export = function() {
  $scope.myJsonString = JSON.stringify($scope.$storage.users);
  alert ($scope.myJsonString);
};

});
