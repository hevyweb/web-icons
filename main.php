<?php

set_include_path(__DIR__ . DIRECTORY_SEPARATOR . 'src/');
spl_autoload_extensions('.php');
spl_autoload_register();


if (!empty($_GET['controller'])){
    $controllerName = ucfirst($_GET['controller']);
    $controller = new $controllerName();
    $method = getMethodUponRequest();
    if (method_exists($controller, $method)){
        call_user_func(array($controller, $method));
    } else {
        throw new Exception('Page not found', 404);
    }
}


function getMethodUponRequest(){
    switch (strtolower($_SERVER['REQUEST_METHOD'])){
        case 'get':
            return 'get';
        case 'post':
            return 'add';
        case 'put':
            return 'edit';
        case 'delete':
            return 'delete';
        default:
            throw new Exception('Page not found', 404);
    }
}
