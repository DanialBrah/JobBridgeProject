<?php
    include("database.php");

    // $sql = "SELECT * FROM users";
    // $result = mysqli_query($conn, $sql);

    // if(mysqli_num_rows($result)>0){
    //     while($row = mysqli_fetch_assoc($result)){
    //        echo $row["Id"]."<br>";
    //         echo $row["user"]."<br>";
    //         echo $row["reg_date"]."<br>"; 
    //     };
        
        
    // }

    // $username = "Squidward";
    // $password = "yoyooo";

    // $sql = "INSERT INTO users (user,password) VALUES ('$username', '$password')";

    // try{
    //    mysqli_query($conn, $sql);
    //    echo "User is now registered <br>"; 
    // }

    // catch(mysqli_sql_exception){
    //     echo "could not register user";
    // }

    

    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"])?>" method="post";>
        <h2>Welcome To Fakebook</h2>
        username: <br>
        <input type="text" name=""username><br>
        password: <br>
        <input type="password" name="password"> <br>
        <input type="submit" name="submit" value="register">
    </form>
</body>
</html>
<?php

    if($_SERVER["REQUEST_METHOD" == "POST"]){
        $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
        $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

        if(empty($username)){
            echo "Please enter a username";
        }
        elseif(empty($password)){
            echo "Please enter a password";
        }
        else{
            $hash = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO users (user,password) VALUES ('username', '$hash')";
            mysqli_query($conn, $sql);
            echo "You are registered";
        }
    }
    mysqli_close($conn);  
?>

<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- <form action="index.php" method="post">
        <label>Username</label>
        <input type="text" name="username"><br>
        <label>Password</label>
        <input type="password" name="password"><br>
        <input type="submit" value="log in"><br>
    </form> -->
        Hello <br>
</body>
</html>
<?php
    // echo "hey <br>";
    // echo "Rurrururuur <br>";
    // // This is a comment
    // /*This is also a comment*/
    // $name = "Danial";
    // $food = "Pizza";
    // $age = 21;
    // $price = 4.99;

    // echo "Hello {$name}<br>";
    // echo "Hello {$food} <br>";
    // echo "Your age is {$age}<br>";
    // echo "The pizza is \${$price}";

    // echo $_POST["username"]. "<br>";
    // echo "{$_POST["password"]} <br>";


?> -->