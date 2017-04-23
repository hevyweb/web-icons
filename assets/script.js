var webIcons = angular.module('webIcons',  []);

webIcons.controller('main', function($scope, $http){
    $http.get('data/categories.json').then(function(response){
        $scope.categories = response.data;
    });
    
    $http.get('data/icons.json').then(function(response){
        $scope.icons = response.data;
    });

    $scope.addNew = function(){
        alert('add new');
    };
    
    $scope.filterByCategory = function(){
       alert('pick category');
    };
    
    $scope.showAll = function(){
        alert('show all');
    };
    
});