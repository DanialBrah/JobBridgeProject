<?php

require_once('config.php');

// Function to sanitize input
function sanitize($input) {
  return htmlspecialchars(strip_tags(trim($input)));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = sanitize($_POST['email']);
  $password = sanitize($_POST['password']);
  $role = sanitize($_POST['gridRadios']);

  // Query to select user information based on the provided email
  $sql = "SELECT email, password, role FROM user WHERE email = '$email'";
  $result = mysqli_query($conn, $sql);
  $validity = false;

  if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $passwordMatch = password_verify($password, $row['password']);
    $roleMatch = ($row['role'] === $role);

    if ($passwordMatch && $roleMatch) {
      $validity = true;
    }
  }

  if ($validity) {
    echo "<script>alert('Login successful!'); window.location.href='../{$role}.html';</script>";
  } else {
    echo "<script>alert('Login failed! Please check your credentials and try again.'); window.location.href='../index.html';</script>";
  }

  $conn->close();
}

?>
