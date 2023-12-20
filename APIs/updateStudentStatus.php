<?php
include 'config.php';

header('Content-Type: application/json');

try {
    $studentId = $_GET['studentId'];
    $newStatus = $_GET['status'];

    $stmt = $conn->prepare("UPDATE Students SET status = :status WHERE id = :studentId");
    $stmt->bindParam(':status', $newStatus, PDO::PARAM_STR);
    $stmt->bindParam(':studentId', $studentId, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['message' => 'Status updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>