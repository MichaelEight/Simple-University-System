<?php
include 'config.php';

header('Content-Type: application/json');

try {
    $stmt = $conn->prepare("SELECT id, first_name, last_name, date_of_birth, major, degree, study_mode FROM Students WHERE status = 'oczekujący'");
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($students);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>