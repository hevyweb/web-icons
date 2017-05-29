<?php

set_include_path(__DIR__ . DIRECTORY_SEPARATOR . 'src/');
spl_autoload_extensions('.php');
spl_autoload_register();


if (!empty($_GET['controller'])){
    $controllerName = ucfirst($_GET['controller']);
    $controller = new $controllerName();
    if (!empty($_GET['action'])) {
        $method = $_GET['action'];
        if (method_exists($controller, $method)){
            call_user_func(array($controller, $method));
            exit;
        }
    }
}

throw new Exception('Page not found', 404);