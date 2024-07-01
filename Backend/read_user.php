<?php

header('Content-Type: application/json');

require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sql = "SELECT username, email, role FROM user";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
  } else {
    echo json_encode([]);
  }

  $conn->close();
}
?>
