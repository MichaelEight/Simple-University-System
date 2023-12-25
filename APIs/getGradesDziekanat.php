<?php
include 'config.php';

try {
    $token = $_GET['token'];
    $studentId = $_GET['studentid'];

    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id, role FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    $userrole = $tokenData['role'];

    if($userrole != "admin" && $userrole != "dziekan") {
        throw new Exception("You have no permissions to perform this action!");
    }

    // Fetch student information
    $studentStmt = $conn->prepare("SELECT * FROM Students WHERE id = :studentId");
    $studentStmt->bindParam(':studentId', $studentId, PDO::PARAM_INT);
    $studentStmt->execute();
    $studentData = $studentStmt->fetch(PDO::FETCH_ASSOC);

    // Fetch grades information
    $gradesStmt = $conn->prepare("SELECT * FROM Grades WHERE student_id = :studentId");
    $gradesStmt->bindParam(':studentId', $studentId, PDO::PARAM_INT);
    $gradesStmt->execute();
    $gradesData = $gradesStmt->fetchAll(PDO::FETCH_ASSOC);

    // Combine student and grades data
    $responseData = [
        'student' => $studentData,
        'grades' => $gradesData
    ];

    echo json_encode($responseData);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
