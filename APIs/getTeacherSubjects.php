<?php
include 'config.php'; // Include your database configuration

try {
    $token = $_GET['token'];

    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    $teacher_id = $tokenData['user_id'];

    // Fetch subject IDs from Registrations
    $stmt = $conn->prepare("SELECT DISTINCT subject_id FROM Registrations WHERE teacher_id = :teacher_id");
    $stmt->bindParam(':teacher_id', $teacher_id, PDO::PARAM_INT);
    $stmt->execute();
    $subjectIds = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    // Fetch subject details from Subjects
    $subjects = [];
    foreach ($subjectIds as $subjectId) {
        $detailsStmt = $conn->prepare("SELECT * FROM Subjects WHERE subject_id = :subject_id");
        $detailsStmt->bindParam(':subject_id', $subjectId, PDO::PARAM_INT);
        $detailsStmt->execute();
        $subjectDetails = $detailsStmt->fetch(PDO::FETCH_ASSOC);
        if ($subjectDetails) {
            $subjects[] = $subjectDetails;
        }
    }

    echo json_encode($subjects);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
