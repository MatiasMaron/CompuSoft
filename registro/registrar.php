<?php

include("conexion.php");

if (isset($_POST['register'])) {
    if (
        /* Se colocan las propiedades de los formularios que se nombran como argumentos */
        strlen($_POST['name']) >= 1 &&
        strlen($_POST['email']) >= 1 &&
        strlen($_POST['direction']) >= 1 &&
        strlen($_POST['phone']) >= 1 &&
        strlen($_POST['password']) >= 1
       ) {
            /* Aca se empieza a definir que estas variables tomen esa cierta parte del Post */
            $name = trim($_POST['name']);
            $email = trim($_POST['email']);
            $direction = trim($_POST['direction']);
            $phone = trim($_POST['phone']);
            $password = trim($_POST['password']);
            $fecha = date("d/m/y");
            /* y aca se hace la consulta para insertar en la tabla los datos de arriba */
            $consulta = "INSERT INTO datos(nombre, email, direccion, telefono, contrasena, fecha)
                VALUES('$name', '$email', '$direction', '$phone', '$password', '$fecha')";
            $resultado = mysqli_query($conex, $consulta);
            /* Si el resultado es correcto y viene toda la informacion se indica que el registro salio bien */
            if ($resultado){
             ?>
                <h3 class="success" >Tu registro se a completado!</h3>
             <?php
            } else{
             /* En caso que el registro tenga un error se indica al usuario*/
             ?>
                <h3 class="error" >Ocurrio un error</h3>
             <?php   
            }
        } else{
            ?>
                <h3 class="error" >LLena todos los campos!</h3>
            <?php   
        }
}
?>