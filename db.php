<?php
$host = "localhost"; // XAMPP runs MySQL locally
$user = "root"; // Default user
$password = ""; // No password by default
$database = "vibenest_db";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
