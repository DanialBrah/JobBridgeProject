<?php

require_once('config.php');

$data = json_decode(file_get_contents("php://input"), true);

$email = htmlspecialchars(strip_tags(trim($data['email'])));
$isUpdate = $data['isUpdate'] ?? false;
$currentUsername = htmlspecialchars(strip_tags(trim($data['currentUsername'] ?? '')));

// Check if the email is unique
$check_query = "SELECT * FROM user WHERE email='$email'";
$check_result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($check_result) > 0) {
  // If updating, allow the current user's email
  if ($isUpdate) {
    $row = mysqli_fetch_assoc($check_result);
    if ($row['username'] === $currentUsername) {
      echo json_encode(['available' => true]);
      exit();
    }
  }
  echo json_encode(['available' => false]);
} else {
  echo json_encode(['available' => true]);
}

mysqli_close($conn);

?>
