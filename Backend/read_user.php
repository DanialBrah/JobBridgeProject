<?php

header('Content-Type: application/json');

require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $sql = "SELECT username, email, role FROM user";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
  } else {
    echo json_encode([]);
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if(isset($_GET['username'])) {
    $username = $_GET['username'];

    $sql = "SELECT username, email, role FROM user WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      $user = $result->fetch_assoc();
      echo json_encode($user);
    } else {
      echo json_encode([]);
    }
  }
}

$conn->close();
?>
