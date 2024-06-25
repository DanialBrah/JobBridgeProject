<?php
require_once("config.php");

$full_name = $_POST['full_name'];
$home_address = $_POST['home_address'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$expected_salary = $_POST['expected_salary'];
$job_title = $_POST['job_title'];
$job_city = $_POST['job_city'];
$has_resume = 0;

// Check if a file is uploaded
if (!empty($_FILES['resume']['name'])) {
  $has_resume = 1;
  $file_name = basename($_FILES['resume']['name']);
  $target_dir = "uploads/";
  $target_file = $target_dir . $file_name;
  $file_type = pathinfo($target_file, PATHINFO_EXTENSION);

  // Allow certain file formats
  $allowed_types = array('pdf', 'doc', 'docx');
  if (in_array($file_type, $allowed_types)) {
    // Check file size (5MB limit)
    if ($_FILES['resume']['size'] <= 5242880) {
      if (move_uploaded_file($_FILES['resume']['tmp_name'], $target_file)) {
        echo "The file " . htmlspecialchars($file_name) . " has been uploaded.";
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
    } else {
      echo "Sorry, your file is too large.";
    }
  } else {
    echo "Sorry, only PDF, DOC & DOCX files are allowed.";
  }
}

$sql = "INSERT INTO employee (full_name, home_address, email, phone, expected_salary, job_title, job_city, has_resume)
VALUES ('$full_name', '$home_address', '$email', '$phone', '$expected_salary', '$job_title', '$job_city', $has_resume)";

if ($conn->query($sql) === TRUE) {
  // Redirect to thank.html on successful insert
  header("Location: ../thank.html");
  exit();
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>