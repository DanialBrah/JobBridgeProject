<?php

require_once("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  $confirm_password = $_POST['confirm_password'];
  $role = $_POST['role'];
  $admin_key = $_POST['admin_key'];

  // Validate form data
  if (strlen($username) < 5) {
    echo "Username should have at least 5 characters.";
    exit;
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format.";
    exit;
  }
  if ($password !== $confirm_password) {
    echo "Passwords do not match.";
    exit;
  }
  if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $password)) {
    echo "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    exit;
  }
  if ($role === 'admin' && $admin_key !== 'adm_K3y_2024_$ecur3_Ex4mpl3_9876543210') {
    echo "Invalid Admin Key.";
    exit;
  }

  // Hash the password
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);

  // Insert into database
  $sql = "INSERT INTO user (username, email, password, role, admin_key) VALUES ('$username', '$email', '$hashed_password', '$role', '$admin_key')";

  if (mysqli_query($conn, $sql)) {
    // Redirect to the success page
    header('Location: ../index.html');
    exit;
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  mysqli_close($conn);
} else {
  echo "Invalid request method.";
}
?>
