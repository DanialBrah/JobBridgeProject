<?php
header('Content-Type: application/json');

require_once("config.php");

$sql = "SELECT * FROM employee";
$result = $conn->query($sql);

$employees = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
    echo json_encode($employees);
} else {
    echo json_encode(['error' => 'No employees found']);
}

$conn->close();
?>
