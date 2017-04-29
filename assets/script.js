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
    
    $scope.loadIcons = function(iElement){
        for(var n = 1; n <= 20; n++){
            var div = angular.element('<div class="icon">&#' + n + ';</div>');
            angular.element(document.querySelector('.categoryBody')).append(div);
        }
    };
    
});