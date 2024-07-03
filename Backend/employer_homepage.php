<?php

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
$sql = "SELECT * FROM employer WHERE username = ?";
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
