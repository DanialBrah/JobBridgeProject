<?php

header('Content-Type: application/json');

require_once("config.php");

if ($conn->connect_error) {
  die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve the input username from the request body
$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'];

$sql = "SELECT * FROM user WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$response = ["available" => true];

if ($result->num_rows > 0) {
  $response["available"] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();

?>
