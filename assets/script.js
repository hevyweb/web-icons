var webIcons = angular.module('webIcons',  []);

webIcons.service('categories', function(){
    var url = location.href.substring(0, location.href.lastIndexOf('/'))+'/categories';
    
    this.categories = {
        get: function(){
            
        },
        add: function(newCategory){
            $http.post(url, {
                'category': newCategory
            }).then(function(response){
                console.log(response);
            });
        },
        edit: function(){
            
        },
        delete: function(){
            
        }
    };
});

webIcons.controller('main', function($scope, $http, categories){
    $http.get('data/categories.json').then(function(response){
        $scope.categories = response.data;
    });
    
    $http.get('data/icons.json').then(function(response){
        $scope.icons = response.data;
    });

    $scope.addNewCategory = function(newCategory){
        if (newCategory != ''){
            for (var n = 0; n<$scope.categories.length; n++){
                if (newCategory == $scope.categories[n]){
                    this.error('The category "' + newCategory + '" already exists.');
                    return;
                }
            }
            $scope.categories.push(newCategory);
            console.log(categories);
            document.forms['addNewCategoryForm'].reset();
        } else {
            this.error('Please enter category name.');
        }
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
    
    $scope.error = function(message){
        alert(message);
    };
    
});