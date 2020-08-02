<?php

define('APP_ROOT', __DIR__);

require_once APP_ROOT . '/core/config.php';
require_once APP_ROOT . '/core/functions.php';

header('Content-Type: application/json; charset=utf-8');


$request_method = strtolower($_SERVER['REQUEST_METHOD']);

if (!in_array($request_method, ['get', 'post', 'put'])) {
    display_api_error(405, 'This request method is not allowed.', 405);
}

require_once APP_ROOT . "/core/handlers/{$request_method}.php";
$handler_func = "handle_{$request_method}";

// Everything's ok, run the handler
$api_result = $handler_func();

echo json_encode($api_result);