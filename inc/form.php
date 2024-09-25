<?php
$firstname = '';
$lastname = '';
$email = '';

$errors = [
    'firstnameError' => '',
    'lastnameError' => '',
    'emailError' => '',
];

if (isset($_POST['submit'])) {
    $firstname = isset($_POST['firstname']) ? $_POST['firstname'] : '';
    $lastname = isset($_POST['lastname']) ? $_POST['lastname'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    if (empty($firstname)) {
        $errors['firstnameError'] = 'يرجى إدخال الاسم الأول';
    }
    if (empty($lastname)) {
        $errors['lastnameError'] = 'يرجى إدخال الاسم الأخير';
    }
    if (empty($email)) {
        $errors['emailError'] = 'يرجى إدخال البريد الإلكتروني';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['emailError'] = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!array_filter($errors)) {
        $firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
        $lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);

        $sql = "INSERT INTO users (firstname, lastname, email) VALUES ('$firstname', '$lastname', '$email')";

        if (mysqli_query($conn, $sql)) {
            header('Location:'. $_SERVER['PHP_SELF']);
            exit();
        } else {
            echo 'Error: ' . mysqli_error($conn);
        }
    }
}

