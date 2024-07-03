<?php

/* header('Content-Type: application/json');

session_start();
require_once('config.php');
$username = $_SESSION['username'];

echo $username;

  $sql = "SELECT * FROM employee WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  $data = $result->fetch_all(MYSQLI_ASSOC);

  foreach($data as $key => $value){
    if(isset($value['profileImage'])){
      $data[$key]['profileImage'] = base64_encode($value['profileImage']);
    }
  }
  // if ($result->num_rows > 0) {
  //   $user = $result->fetch_assoc();
    
  //   // Convert profileImage to base64
  //   if (!empty($user['profileImage'])) {
  //       $user['profileImage'] = 'data:image/jpeg;base64,' . base64_encode($user['profileImage']);
  //   } else {
  //       $user['profileImage'] = null; // Or set to a default image path
  //   }
  //   echo "Hello";
  //   echo json_encode($user);
  // } else {
  //   echo "Unsuccessfully";
  //   echo json_encode([]);
  // }

  $stmt->close();
  $conn->close();

echo json_encode($data); */

header('Content-Type: application/json');

session_start();

require_once('config.php');

// Ensure there's a valid session and username
if (!isset($_SESSION['username'])) {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$username = $_SESSION['username'];

// Prepare and execute the query
$sql = "SELECT * FROM employee WHERE username = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(["error" => "Database error"]);
    exit;
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result === false) {
    echo json_encode(["error" => "Query error"]);
    exit;
}

$data = $result->fetch_all(MYSQLI_ASSOC);

// Convert profileImage to base64 if it exists
foreach ($data as $key => $value) {
    if (isset($value['profileImage'])) {
        $data[$key]['profileImage'] = 'data:image/jpeg;base64,' . base64_encode($value['profileImage']);
    }
}

$stmt->close();
$conn->close();

echo json_encode($data);

?>
