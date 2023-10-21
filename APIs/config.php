<?php
header("Access-Control-Allow-Origin: *");

// Database configuration
$servername = "localhost";
$username = "id21392784_pierwszepietro";
$password = "KochamPierogi69!";
$database = "id21392784_susbase";

// Create a database connection
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
