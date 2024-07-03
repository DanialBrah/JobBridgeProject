<?php

session_start();
require_once("config.php");

// $sql2 = mysqli_query($conn, "SELECT uploadPersonalDetails FROM user WHERE email = $_SESSION['email']");
$temp_email = $_SESSION['email'];
$sqlUpdateUploadStatus = "UPDATE user SET uploadPersonalDetails = 1 WHERE email = ?";

$full_name = $_POST['full_name'];
$home_address = $_POST['home_address'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$expected_salary = $_POST['expected_salary'];
$job_title = $_POST['job_title'];
$job_city = $_POST['job_city'];
$has_resume = 0;
$username = $_SESSION['username'];

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

// Use prepared statements to avoid SQL injection
$stmt = $conn->prepare("INSERT INTO employee (full_name, home_address, email, phone, expected_salary, job_title, job_city, has_resume, username)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssissss", $full_name, $home_address, $email, $phone, $expected_salary, $job_title, $job_city, $has_resume, $username);

if ($stmt->execute()) {
  // Update uploadPersonalDetails status
  $stmt_update = $conn->prepare($sqlUpdateUploadStatus);
  $stmt_update->bind_param("s", $temp_email);
  $stmt_update->execute();
  $stmt_update->close();

  // Redirect to thank.html on successful insert
  header("Location: ../thank.html");
  exit();
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
