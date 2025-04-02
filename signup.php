<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $password = password_hash($_POST["password"], PASSWORD_BCRYPT); 
    $profile_pic = $_POST["profile_pic"];
    // Encrypt password

    $sql = "INSERT INTO users (name, email, phone, password, profile_pic) VALUES (?, ?, ?, ?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $name, $email, $phone, $password,$profile_pic);

    if ($stmt->execute()) {
        echo "<script>alert('Signup successful!'); window.location.href='login.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
