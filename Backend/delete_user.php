<?php

require_once('config.php');

$data = json_decode(file_get_contents("php://input"), true);

$username = htmlspecialchars(strip_tags(trim($data['username'])));
$admin_key = htmlspecialchars(strip_tags(trim($data['adminKey'])));

// Validate admin key
if ($admin_key !== 'adm_K3y_2024_$ecur3_Ex4mpl3_9876543210') {
  echo json_encode(['success' => false, 'message' => 'Invalid admin key.']);
  exit();
}

$delete_query = "DELETE FROM user WHERE username='$username'";

if (mysqli_query($conn, $delete_query)) {
  echo json_encode(['success' => true, 'message' => 'User deleted successfully.']);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to delete user.']);
}

mysqli_close($conn);

?>
