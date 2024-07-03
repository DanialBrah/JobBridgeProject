<?php
session_start();
require_once("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = $_POST['full_name'];
    $home_address = $_POST['home_address'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $username = $_SESSION['username'];

    if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] == 0) {
        $posterTmpPath = $_FILES['profileImage']['tmp_name'];
        $profileImage = file_get_contents($posterTmpPath);

        // Prepare SQL statement to insert into database
        // Use prepared statements to avoid SQL injection
        $sql = "UPDATE employee SET profileImage = ?, full_name = ?, home_address = ?, email = ?, phone = ? WHERE username = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            die('Error preparing statement: ' . htmlspecialchars($conn->error));
        }

        $stmt->bind_param("ssssss", $profileImage, $full_name, $home_address, $email, $phone, $username);

        // Execute SQL statement
        if ($stmt->execute()) {
            // Redirect back to last page: employee_homepage.html on successful insert
            header("Location: ../employee_homepage.html");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    }
    else {
        // Prepare SQL statement to insert into database
        // Use prepared statements to avoid SQL injection
        $sql = "UPDATE employee SET full_name = ?, home_address = ?, email = ?, phone = ? WHERE username = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            die('Error preparing statement: ' . htmlspecialchars($conn->error));
        }

        $stmt->bind_param("sssss", $full_name, $home_address, $email, $phone, $username);

        // Execute SQL statement
        if ($stmt->execute()) {
            // Redirect back to last page: employee_homepage.html on successful insert
            header("Location: ../employee_homepage.html");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
      header("Location: ../employee_homepage.html");
      exit();
    }
} else {
    echo "Invalid request method.";
}
?>
