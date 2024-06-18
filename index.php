<?php
// Configuration
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'job_postings';

// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$title = $_POST['title'];
$company = $_POST['company'];
$location = $_POST['location'];
$classification = $_POST['classification'];
$salary = $_POST['salary'];
$workType = $_POST['workType'];
$description = $_POST['description'];
$requirements = $_POST['requirements'];
$benefits = $_POST['benefits'];
$image = $_FILES['image'];

// Validate form data
if (empty($title) || empty($company) || empty($location) || empty($classification) || empty($salary) || empty($workType) || empty($description) || empty($requirements) || empty($benefits)) {
    echo "Please fill in all fields";
    exit;
}

// Upload image
$image_path = 'uploads/' . basename($image['name']);
move_uploaded_file($image['tmp_name'], $image_path);

// Insert data into database
$sql = "INSERT INTO job_postings (title, company, location, classification, salary, work_type, description, requirements, benefits, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssss", $title, $company, $location, $classification, $salary, $workType, $description, $requirements, $benefits, $image_path);
$stmt->execute();

// Check if data was inserted successfully
if ($stmt->affected_rows > 0) {
    echo "Job posting added successfully";
} else {
    echo "Error adding job posting";
}

// Close connection
$conn->close();
?>