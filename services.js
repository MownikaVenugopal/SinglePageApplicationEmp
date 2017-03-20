/// <reference path="C:\Users\Mownika\Desktop\SAP Angularjs\SPAAngularjs\SPAAngularjs\Scripts/angular.js" />


var EmployeeService = angular.module('EmployeeService', []);

EmployeeService.factory('EmpApi', function ($http) {
    
    var urlBase = "http://localhost:52045/api";
    var EmpApi = {};
    EmpApi.getEmployees = function () {
        
        return $http.get(urlBase + '/Employees'); // $http.get() helps to get AJAX call
    };

    EmpApi.AddEmployee = function (emp) {

        
    //    var req=  $http({
    //    method: 'post',
    //    url: urlBase+ '/Employees/',
    //    data: emp
    //});
        return $http.post(urlBase + '/Employees/', emp);
    }   

    //EmpApi.EditEmployee = function (emp) {
    //    var request = $http({
    //        method: 'put',
    //        url: urlBase +'/Employees/',empToUpdate.Id,
    //        data: empToUpdate
    //    });
    //};
    return EmpApi;
});