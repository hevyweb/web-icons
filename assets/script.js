var webIcons = angular.module('webIcons',  []);

webIcons.service('categoryService', function($http){
    var url = location.href + 'categories';
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

  // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
    
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        
    this.add = function(newCategory){
        $http.post(url, {'category': newCategory});
    };
    
    this.edit = function(categories){
        $http.put(url, JSON.stringify({'categories': categories}));
    };
});

webIcons.controller('main', function($scope, $http, categoryService){
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
            categoryService.add(newCategory);
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
    
    $scope.changeCategories = function(input, index) {
        $scope.tempCategories[index] = input;
    };
    
    $scope.completeEdition = function(){
        $scope.categories = $scope.tempCategories;
        categoryService.edit($scope.categories);        
    };
    
    $scope.startEdition =  function(){
        $scope.tempCategories = $scope.categories.concat([]);
    };
    
    $scope.deleteCategory = function(index){
        $scope.categories.splice(index,1);
        $scope.tempCategories.splice(index,1);
    };
});