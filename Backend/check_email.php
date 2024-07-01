<?php

header('Content-Type: application/json');

require_once('config.php');

if($conn->connect_error) {
  die(json_decode(["error" => "Connection failed: "] . $conn->connect_error));
}

//Retrieve the input email fromm the request body
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'];

$sql = "SELECT * FROM user WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$response = ["available" => true];

if ($result->num_rows > 0) {
  $response['available'] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();

?>