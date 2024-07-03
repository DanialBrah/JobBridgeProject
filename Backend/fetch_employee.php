<?php
header('Content-Type: application/json');

    require_once("config.php");

    session_start();

    $employerName = $_SESSION['username'];

    $sql = "SELECT a.exp_salary, a.yoe, a.position, a.education, a.summary, e.full_name, e.email, e.phone, e.home_address, e.job_city, e.job_title, e.profileImage FROM 
        application a JOIN job j ON a.jobId = j.jobID
        JOIN employee e ON a.employeeName = e.username
        WHERE j.employerName = ?
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param('s', $employerName);
    // $result = $conn->query($sql);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = $result->fetch_all(MYSQLI_ASSOC);

    foreach ($data as $key => $value) {
        if (isset($value['profileImage'])) {
            $data[$key]['profileImage'] = 'data:image/jpeg;base64,' . base64_encode($value['profileImage']);
        }
    }

    $stmt->close();
    $conn->close();

    echo json_encode($data);
?>
