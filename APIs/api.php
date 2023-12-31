<?php
// Allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Origin: *");

include 'config.php';

try {
    // Retrieve the student_id from the query parameters
    $student_id = $_GET['student_id'];

    // Use the student_id in the SQL query to filter the results
    $stmt = $conn->prepare("SELECT * FROM Students WHERE student_id = :student_id");
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $stmt->execute();

    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($students) {
        echo json_encode($students);
    } else {
        // If no student is found with the given student_id, return an empty array.
        echo json_encode([]);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
