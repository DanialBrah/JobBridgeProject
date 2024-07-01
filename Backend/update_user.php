<?php

require_once('config.php');

$data = json_decode(file_get_contents("php://input"), true);

$username = htmlspecialchars(strip_tags(trim($data['username'])));
$email = htmlspecialchars(strip_tags(trim($data['email'])));
$password = htmlspecialchars(strip_tags(trim($data['password'])));
$role = htmlspecialchars(strip_tags(trim($data['role'])));
$admin_key = htmlspecialchars(strip_tags(trim($data['adminKey'])));

// Check if the user exists
$check_query = "SELECT * FROM user WHERE username='$username'";
$check_result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($check_result) == 0) {
  echo json_encode(['success' => false, 'message' => 'User does not exist.']);
  exit();
}

// Validate admin key if role is admin
if ($role === 'admin' && $admin_key !== 'adm_K3y_2024_$ecur3_Ex4mpl3_9876543210') {
  echo json_encode(['success' => false, 'message' => 'Invalid admin key.']);
  exit();
}

// Update user information
$update_query = "UPDATE user SET email='$email', role='$role'";

if (!empty($password)) {
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);
  $update_query .= ", password='$hashed_password'";
}

$update_query .= " WHERE username='$username'";

if (mysqli_query($conn, $update_query)) {
  echo json_encode(['success' => true, 'message' => 'User updated successfully.']);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to update user.']);
}

mysqli_close($conn);

?>
