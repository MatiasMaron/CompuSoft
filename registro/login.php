<?php
session_start();
include("conexion.php");

if (isset($_POST['login'])) {
    if (strlen($_POST['email']) >= 1 && strlen($_POST['password']) >= 1) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);

        // Consulta para verificar las credenciales del usuario
        $consulta = "SELECT * FROM datos WHERE email='$email' AND contrasena='$password'";
        $resultado = mysqli_query($conex, $consulta);

        if ($resultado && mysqli_num_rows($resultado) > 0) {
            // El usuario ha iniciado sesión correctamente
            // luego de verificar las credenciales y antes de establecer la sesion se hace una consulta para
            // obtener el nombre del usuario y se asigna a la variable nombre_usuario
            $usuario = mysqli_fetch_assoc($resultado);
            $nombre_usuario = $usuario['nombre'];
            // Guarda el nombre de usuario en la sesion
            $_SESSION['nombre_usuario'] = $nombre_usuario;
            // Redirige a la pagina de la tienda despues del inicio de sesion exitoso
            echo json_encode(['nombre_usuario' => $nombre_usuario, 'redirect' => true]);
            exit();
        } else {
            // Credenciales incorrectas
            echo '<h3 class="error">Correo o contraseña incorrectos</h3>';
        }
    } else {
        // Campos no completados
        echo '<h3 class="error">Completa todos los campos</h3>';
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Incio Sesion</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <form method="post">

        <h2>CompuSoft</h2>
        <p>Inicia sesion en tu cuenta</p>

        <div class="input-wrapper">
            <input type="email" name="email" placeholder="Correo" required>
            <img class="input-icon" src="images/email.svg" alt="">
        </div>

        <div class="input-wrapper">
            <input type="password" name="password" placeholder="Contraseña" required>
            <img class="input-icon" src="images/password.svg" alt="">
        </div>

        <input class="btn" type="submit" name="login" value="Iniciar Sesion">

        <div class="register">
            <p class="msg">No tienes una cuenta? <a class="btn-login" href="index.php">Registrate aqui</a></p>
        </div>

    </form>

    <?php
            include("registrar.php");
    ?>
</body>
</html>