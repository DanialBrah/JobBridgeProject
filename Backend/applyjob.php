<?php
require_once("config.php");

session_start();

$employeeUsername = $_SESSION['username'];
$jobID = $_POST['jobID'];

$sql = "INSERT INTO application (jobID, employeeName)
VALUES ('$jobID', '$employeeUsername')";

if ($conn->query($sql) === TRUE) {
  // Redirect to thank2.html on successful insert
  header("Location: ../employee_homepage.html");
  exit();
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

