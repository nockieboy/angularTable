angular.module('myApp', []).controller('userCtrl', function($scope) {
$scope.orderByField = 'id';
$scope.reverseSort = false;
$scope.fName = '';
$scope.lName = '';
$scope.times = 0;
$scope.country = '';
$scope.curEntry = 0;
$scope.users = [
{id:1, fName:'Hege', lName:"Pege", times:4, country:"Sweden" },
{id:2, fName:'Kim',  lName:"Pim", times:5, country:"Korea" },
{id:3, fName:'Sal',  lName:"Smith", times:8, country:"USA" },
{id:4, fName:'Jack', lName:"Jones", times:0, country:"UK" },
{id:5, fName:'John', lName:"Doe", times:0, country:"USA" },
{id:6, fName:'Corinne',lName:"Pan", times:1, country:"UK" }
];
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
    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName;
    $scope.times = $scope.users[id-1].times;
    $scope.country = $scope.users[id-1].country;
  }
};

$scope.deleteUser = function(id) {
  if ((id-1) == Object.keys($scope.users).length) {
    $scope.users.pop();
  } else {
    $scope.users.splice((id-1),1);
  }
};

$scope.saveUser = function() {
    $scope.users[$scope.curEntry].fName = $scope.fName;
    $scope.users[$scope.curEntry].lName = $scope.lName;
    $scope.users[$scope.curEntry].times = $scope.times;
    $scope.users[$scope.curEntry].country = $scope.country;
    $scope.fName = '';
    $scope.lName = '';
    $scope.times = 0;
    $scope.country = '';
};

$scope.newUser = function() {
  $scope.users.push({
    id:Object.keys($scope.users).length+1,
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
  $scope.myJsonString = JSON.stringify($scope.users);
  alert ($scope.myJsonString);
};

});
