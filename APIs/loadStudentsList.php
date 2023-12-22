<?php
include 'config.php';

$token = $_GET['token'];
$subjectId = $_GET['subject'];
$program = $_GET['program'];
$group = $_GET['group'];

try {
    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    // Fetch student IDs from Registrations table
    $studentIdsQuery = $conn->prepare("SELECT DISTINCT student_id FROM Registrations WHERE subject_id = :subjectId AND group_number = :group");
    $studentIdsQuery->bindParam(':subjectId', $subjectId, PDO::PARAM_INT);
    $studentIdsQuery->bindParam(':group', $group, PDO::PARAM_INT);
    $studentIdsQuery->execute();
    $studentIds = $studentIdsQuery->fetchAll(PDO::FETCH_COLUMN, 0);

    // Fetch student details from Students table
    $students = [];
    foreach ($studentIds as $studentId) {
        $studentQuery = $conn->prepare("SELECT id, first_name, last_name, status FROM Students WHERE id = :studentId AND major = :program");
        $studentQuery->bindParam(':studentId', $studentId, PDO::PARAM_INT);
        $studentQuery->bindParam(':program', $program, PDO::PARAM_STR);
        $studentQuery->execute();
        $studentData = $studentQuery->fetch(PDO::FETCH_ASSOC);
        if ($studentData) {
            $students[] = $studentData;
        }
    }

    echo json_encode($students);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
