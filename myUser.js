angular.module('myApp', ['ngStorage']).controller('userCtrl', function($scope, $localStorage, $sessionStorage) {
$scope.orderByField = 'id';
$scope.reverseSort = false;
$scope.fName = '';
$scope.lName = '';
$scope.times = 0;
$scope.country = '';
$scope.curEntry = 0;
$scope.tempID = -1;

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

$scope.edit = true;
$scope.error = false;

$scope.editUser = function(id) {
  MyUser.popup('popUpDiv');
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

$scope.initDelete = function(id) {
  $scope.tempID = id;
  MyUser.popup('confirmDialogue');
};

$scope.confirmDelete = function() {
  if ($scope.tempID > -1) {
    $scope.deleteUser($scope.tempID);
    tempID = -1;
  } else {
    alert("tempID is not set!");
  }
};

$scope.deleteUser = function(id) {
  if ((id-1) == Object.keys($scope.$storage.users).length) {
    $scope.$storage.users.pop();
  } else {
    $scope.$storage.users.splice((id-1),1);
  }
  // Run through the array and renum the ID numbers
  var arrayLength = $scope.$storage.users.length;
  for (var i = 0; i < arrayLength; i++) {
      $scope.$storage.users[i].id = i + 1;
  }
  MyUser.popup('confirmDialogue');
};

$scope.saveUser = function() {
    MyUser.popup('popUpDiv');
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
  MyUser.popup('popUpDiv');
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

$scope.cancel = function() {
  MyUser.popup('popUpDiv');
  $scope.fName = '';
  $scope.lName = '';
  $scope.times = 0;
  $scope.country = '';
};

$scope.cancelDelete = function() {
  MyUser.popup('confirmDialogue');
};

});

var MyUser = MyUser || {};

MyUser.toggle = function(div_id) {
    var el = document.getElementById(div_id);
    if ( el.style.display == 'none' ) { el.style.display = 'block';}
    else {el.style.display = 'none';}
}

MyUser.blanket_size = function(popUpDivVar) {
    var viewportheight = 0;
    var blanket_height = 0;
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    } else {
        viewportheight = document.documentElement.clientHeight;
    }
    if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
        blanket_height = viewportheight;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }
    var blanket = document.getElementById('blanket');
    blanket.style.height = blanket_height + 'px';
    var popUpDiv = document.getElementById(popUpDivVar);
    var popUpDiv_height = blanket_height/2-200; //200 is half popup's height
    popUpDiv.style.top = popUpDiv_height + 'px';
}

MyUser.window_pos = function (popUpDivVar) {
    var viewportwidth = 0;
    var window_width = 0;
    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerHeight;
    } else {
        viewportwidth = document.documentElement.clientHeight;
    }
    if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
        window_width = viewportwidth;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }
    var popUpDiv = document.getElementById(popUpDivVar);
    window_width = window_width/2 - 500; //200 is half popup's width
    popUpDiv.style.left = window_width + 'px';
}

MyUser.popup = function(windowname) {
    MyUser.blanket_size(windowname);
    MyUser.window_pos(windowname);
    MyUser.toggle('blanket');
    MyUser.toggle(windowname);
}
