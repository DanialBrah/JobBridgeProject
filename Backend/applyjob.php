<?php
require_once("config.php");

session_start();

$employeeUsername = $_SESSION['username'];
$exp_salary = $_POST['exp_salary'];
$yoe = $_POST['yoe'];
$position = $_POST['position'];
$education = $_POST['education'];
$summary = $_POST['coverLetter'];
$jobID = $_POST['jobID'];

$sql = "INSERT INTO application (jobID, employeeName, exp_salary, yoe, position, education, summary)
VALUES ('$jobID', '$employeeUsername', '$exp_salary', '$yoe', '$position', '$education', '$summary')";

if ($conn->query($sql) === TRUE) {
  // Redirect to thank2.html on successful insert
  header("Location: ../employee_homepage.html");
  exit();
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

