<?php

require_once("config.php");

// Function to sanitize input
function sanitize($input) {
  return htmlspecialchars(strip_tags(trim($input)));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = sanitize($_POST['username']);
  $email = sanitize($_POST['email']);
  $password = sanitize($_POST['password']);
  $confirm_password = sanitize($_POST['confirm_password']);
  $role = sanitize($_POST['role']);
  $admin_key = sanitize($_POST['admin_key']);

  // Validate form data
  if (strlen($username) < 5) {
    echo "<script>alert('Username should have at least 5 characters.'); window.location.href='../register.html';</script>";
    exit;
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Invalid email format.'); window.location.href='../register.html';</script>";
    exit;
  }
  if ($password !== $confirm_password) {
    echo "<script>alert('Passwords do not match.'); window.location.href='../register.html';</script>";
    exit;
  }
  if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $password)) {
    echo "<script>alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'); window.location.href='../register.html';</script>";
    exit;
  }
  if ($role === 'admin' && $admin_key !== 'adm_K3y_2024_$ecur3_Ex4mpl3_9876543210') {
    echo "<script>alert('Invalid Admin Key.'); window.location.href='../register.html';</script>";
    exit;
  }

  // Hash the password
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);

  // Insert into database
  $sql = "INSERT INTO user (username, email, password, role, admin_key) VALUES ('$username', '$email', '$hashed_password', '$role', '$admin_key')";

  if (mysqli_query($conn, $sql)) {
    // Redirect to the success page
    echo "<script>alert('Registration successful!'); window.location.href='../index.html';</script>";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  mysqli_close($conn);
} else {
  echo "Invalid request method.";
}

?>
