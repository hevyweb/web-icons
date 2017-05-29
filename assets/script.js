var webIcons = angular.module('webIcons',  []);

webIcons.service('categoryService', function($http){
    var url = location.href + 'main.php?controller=categories';
    this.add = function(newCategory, $scope){
        $http.post(url + '&action=add', {'category': newCategory}).then(function(responce){
            $scope.categories.push({
                'name': newCategory,
                'id': responce.data
            });
        });
    };
    
    this.edit = function(categories){
        $http.post(url + '&action=edit', JSON.stringify(categories));
    };
});

webIcons.service('iconService', function($http){
    var url = location.href + 'main.php?controller=icons';
    this.ignore = function(code){
        $http.post(url + '&action=delete', {'code': code});
    };
    
    this.edit = function(categories){
        $http.put(url, JSON.stringify(categories));
    };
});

webIcons.controller('main', function($scope, $http, categoryService, iconService, $sce){
    $http.get('data/categories.json').then(function(response){
        $scope.categories = response.data;
    });
    
    $http.get('data/icons.json').then(function(response){
        $scope.icons = response.data;
        $scope.iconCodes = Array.concat.apply([], $scope.icons.map(function(category){
            return Object.keys(category);
        })).map(function(code){
            return parseInt(code);
        });
        $scope.lastIconCode = 0;
        while ($scope.iconCodes.indexOf($scope.lastIconCode)!=-1){
            $scope.lastIconCode++; 
        }
         
    });

    $scope.addNewCategory = function(newCategory){
        if (newCategory != ''){
            for (var n = 0; n<$scope.categories.length; n++){
                if (newCategory == $scope.categories[n]){
                    this.error('The category "' + newCategory + '" already exists.');
                    return;
                }
            }
            categoryService.add(newCategory, $scope);
            document.forms['addNewCategoryForm'].reset();
        } else {
            this.error('Please enter category name.');
        }
    };
    
        $scope.setCurrentCategory = function(currentCategory){
        $scope.currentCat = currentCategory;
    };    
    
    $scope.loadIcons = function(){
        for(var n = 0; n < 100;){
            if ($scope.iconCodes.indexOf($scope.lastIconCode) == -1){
                $scope.newIcons.push($sce.trustAsHtml('&#' + $scope.lastIconCode + ';'));
                n++;
            }
            $scope.lastIconCode++;
        }
    };
    
    $scope.error = function(message){
        alert(message);
    };
    
    $scope.changeCategories = function(input, index) {
        $scope.tempCategories[index] = input;
    };
    
    $scope.completeEdition = function(){
        $scope.categories = $scope.tempCategories;
        categoryService.edit(angular.toJson($scope.categories));        
    };
    
    $scope.startEdition =  function(){
        $scope.tempCategories = $scope.categories.concat([]);
    };
    
    $scope.deleteCategory = function(index){
        $scope.categories.splice(index,1);
        $scope.tempCategories.splice(index,1);
    };
    
    $scope.ignore = function(charCode){
        var code = parseInt(charCode.valueOf().replace(/^\D+/g, ''));
        $scope.iconCodes.push(code);
        $scope.newIcons.splice($scope.newIcons.indexOf(charCode), 1);
        if ($scope.icons[0] == undefined){
            $scope.icons[0] = [];
        }
        $scope.icons[0][code] = charCode;
        var lastIcon = parseInt($scope.newIcons[$scope.newIcons.length -1].valueOf().replace(/^\D+/g, ''));
        $scope.newIcons.push($sce.trustAsHtml('&#' + getNextIcon(lastIcon) + ';'));
        iconService.ignore(code);
    };
    
    $scope.pickIcon =  function(icon){
        $scope.currentIcon = icon;
    };
    
    function getNextIcon(lastIcon){
        do{
            lastIcon++;
            if ($scope.icons[0][lastIcon] == undefined){
                return lastIcon;

            }
        } while (true)
        
    }
    
});