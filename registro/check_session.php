<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
session_start();

// Verificar si la sesión está activa
$response = [
   'loggedIn' => isset($_SESSION['nombre_usuario']),
   'username' => isset($_SESSION['nombre_usuario']) ? $_SESSION['nombre_usuario'] : ''
];

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>