<?php
header('Content-Type: application/json');

    require_once("config.php");

    $sql = "SELECT * FROM employee";

    $stmt = $conn->prepare($sql);
    // $result = $conn->query($sql);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = $result->fetch_all(MYSQLI_ASSOC);

    foreach ($data as $key => $value){
        if(isset($value['profileImage'])){
            $data[$key]['profileImage'] = base64_encode($value['profileImage']);
        }
    }

    $stmt->close();
    $conn->close();

    echo json_encode($data);
?>
