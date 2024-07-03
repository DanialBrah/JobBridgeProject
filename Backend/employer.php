<?php

session_start();
require_once("config.php");

$temp_email = $_SESSION['email'];
$sqlUpdateUploadStatus = "UPDATE user SET uploadPersonalDetails = 1 WHERE email = ?";

$company_name = $_POST['company_name'];
$company_address = $_POST['company_address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zip = $_POST['zip'];
$contact_name = $_POST['contact_name'];
$contact_position = $_POST['contact_position'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$company_overview = $_POST['company_overview'];
$username = $_SESSION['username'];

if (isset($_FILES['company_logo']) && $_FILES['company_logo']) {
    $posterTmpPath = $_FILES['company_logo']['tmp_name'];
    $profileImage = file_get_contents($posterTmpPath);
}



$stmt = $conn->prepare("INSERT INTO employer (company_name, company_address, city, state, zip, contact_name, contact_position, email, phone, company_overview, username, profileImage)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssssss", $company_name, $company_address, $city, $state, $zip, $contact_name, $contact_position, $email, $phone, $company_overview, $username, $profileImage);

if ($stmt->execute()) {
    $stmt_update = $conn->prepare($sqlUpdateUploadStatus);
    $stmt_update->bind_param("s", $temp_email);
    $stmt_update->execute();
    $stmt_update->close();

    header("Location: ../thank2.html");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
