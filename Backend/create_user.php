<?php

require_once('config.php');

$data = json_decode(file_get_contents("php://input"), true);

$username = htmlspecialchars(strip_tags(trim($data['username'])));
$email = htmlspecialchars(strip_tags(trim($data['email'])));
$password = htmlspecialchars(strip_tags(trim($data['password'])));
$role = htmlspecialchars(strip_tags(trim($data['role'])));
$admin_key = htmlspecialchars(strip_tags(trim($data['adminKey'])));

// Check if username and email are unique
$check_query = "SELECT * FROM user WHERE username='$username' OR email='$email'";
$check_result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($check_result) > 0) {
  echo json_encode(['success' => false, 'message' => 'Username or email already exists.']);
  exit();
}

// Validate admin key if role is admin
if ($role === 'admin' && $admin_key !== 'adm_K3y_2024_$ecur3_Ex4mpl3_9876543210') {
  echo json_encode(['success' => false, 'message' => 'Invalid admin key.']);
  exit();
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

$insert_query = "INSERT INTO user (username, email, password, role, admin_key) VALUES ('$username', '$email', '$hashed_password', '$role', '$admin_key')";

if (mysqli_query($conn, $insert_query)) {
  echo json_encode(['success' => true, 'message' => 'User created successfully.']);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to create user.']);
}

mysqli_close($conn);

?>
