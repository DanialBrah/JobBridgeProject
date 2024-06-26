<?php
header('Content-Type: application/json');

require_once("config.php");

$sql = "SELECT * FROM job";
$result = $conn->query($sql);

$jobs = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Convert image data to base64
        $row['image'] = base64_encode($row['image']);
        $jobs[] = $row;
    }
    echo json_encode($jobs);
} else {
    echo json_encode(['error' => 'No job found']);
}

$conn->close();
?>
