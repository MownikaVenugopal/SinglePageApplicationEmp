/// <reference path="C:\Users\Mownika\Desktop\SAP Angularjs\SPAAngularjs\SPAAngularjs\Scripts/angular.js" />

var MyApp = angular.module('MyApp', ['ngRoute','EmployeeService']);

MyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/Add', {
                templateUrl: 'Views/Add.html',
                controller: 'AddController'
            }).
            when('/Edit', {
                templateUrl: 'Views/Edit.html',
                controller: 'EditController'
            }).
            when('/Delete', {
                templateUrl: 'Views/Delete.html',
              controller: 'DeleteController'
            }).
            when('/Home', {
                templateUrl: 'Views/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/Home'
            });
}]);

MyApp.controller("AddController", function ($scope, EmpApi) {
    console.log("Inside Add Controller");
    $scope.addEmp = function () {
        console.log("Inside addEmp fun Add Controller");
        var empToAdd = {
            'First Name': $scope.first_name,
            'Last Name': $scope.last_name,
            'Address': $scope.address,
            'Phone Number': $scope.Phone_Number,
            'EmailAdress': $scope.EmailAdress,
            'Comments': $scope.Comments,
            'password': $scope.password,
            'Date Of Birth': $scope.Date_of_Birth,
            'Gender': $scope.Gender
        };
        EmpApi.AddEmployee(empToAdd).then(function (response) {
            alert("User Added");
            $scope.first_name = undefined;
            $scope.last_name = undefined;
            $scope.EmailAdress = undefined;
            $scope.address = undefined;
            $scope.Comments= undefined;
            $scope.phone_number = undefined;
            $scope.Date_of_Birth = undefined;
            $scope.Gender = undefined;
            $scope.password = undefined;
        },function (response) {
            alert("Error in adding");
        });
    }

});
MyApp.controller("EditController", function ($scope, EmpApi) {
    console.log("Inside Edit Controller");
    $scope.selectedItem = "Select Employee";
    $scope.isDeleteItemVisible = false;
    getEmployees();
    function getEmployees() {
        console.log("Inside Get Employees func in Edit controller");
        EmpApi.getEmployees().then(function (emps) {
            console.log("Inside success func in Home Controller");
            $scope.emps = emps.data;
        }, function (error) {
            console.log("Inside error func in Edit Controller");
            $scope.status = "Unable to load data: " + error.message;
        });
    }
    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteitemvisible = true;
        $scope.selectedItem = item.Id;
        $scope.first_name = item.first_name;
        $scope.address = item.address;
        $scope.phone_number = item.Phone_Number;
        $scope.Comments = item.Comments;
      }
    $scope.updateEmp = function () {
        var empToUpdate = {
            'First Name': $scope.first_name,
            'Address': $scope.address,
            'Phone Number': $scope.Phone_Number,
            'Comments': $scope.Comments
        };
        EmpApi.EditEmployee(empToUpdate).then(function (response) {
            aler('User Updated');
            $scope.first_name = undefined;
            $scope.address = undefined;
            $scope.phone_number = undefined;
            $scope.Comments = undefined;
        }, function (response) {
            $scope.status = "Unable to update Employee : " + error.message;
        });
    }

});
MyApp.controller("DeleteController", function ($scope) {
    console.log("Inside Delete Controller");
    $scope.message = "in update delete view";
});
MyApp.controller("HomeController", function ($scope, EmpApi) {
    console.log("Inside Home Controller");
    //$scope.message = "in update delete view";
    getEmployees();
    function getEmployees() {
        console.log("Inside Get Employees func in Home controller");
        EmpApi.getEmployees().then(function (emps) {
            console.log("Inside success func in Home Controller");
            $scope.emps = emps.data;
        },function (error) {
            console.log("Inside error func in Home Controller");
            $scope.status = "Unable to load data: " + error.message;
        });
    }
});