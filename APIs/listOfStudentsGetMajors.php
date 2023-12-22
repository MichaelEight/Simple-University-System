<?php
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Get unique major values from Students
    $majorsStmt = $conn->query("SELECT DISTINCT major FROM Students");
    $majors = $majorsStmt->fetchAll(PDO::FETCH_COLUMN, 0);

    echo json_encode($majors);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
