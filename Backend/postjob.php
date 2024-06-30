<?php
require_once("config.php");

$job_title = $_POST['job_title'];
$company = $_POST['company'];
$location = $_POST['location'];
$salary = $_POST['salary'];
$work_type = $_POST['work_type'];
$requirement = $_POST['requirement'];

$image = $_FILES['image']['tmp_name'];
$imageContent = addslashes(file_get_contents($image));

$sql = "INSERT INTO job (job_title, company, location , salary, work_type, requirement, image)
VALUES ('$job_title', '$company', '$location', '$salary', '$work_type', '$requirement', '$imageContent')";

if ($conn->query($sql) === TRUE) {
  // Redirect to thank2.html on successful insert
  header("Location: ../thank2.html");
  exit();
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

