<?php
include 'config.php';

try {
    // Retrieve individual grade data from the GET request
    $studentId = $_GET['student_id'] ?? null;
    $subjectId = $_GET['subject_id'] ?? null;
    $type = $_GET['type'] ?? null;
    $gradeValue = $_GET['grade'] ?? null;
    $description = $_GET['description'] ?? null;
    $teacherId = $_GET['teacher_id'] ?? null; // Assuming you pass teacher's ID

    // Validate the provided data
    if (!$studentId || !$subjectId || !$type || !$gradeValue || !$teacherId) {
        throw new Exception("Incomplete grade data provided");
    }

    // Check if the grade already exists
    $checkStmt = $conn->prepare("SELECT grade_id FROM Grades WHERE student_id = :studentId AND subject_id = :subjectId AND type = :type");
    $checkStmt->bindParam(':studentId', $studentId);
    $checkStmt->bindParam(':subjectId', $subjectId);
    $checkStmt->bindParam(':type', $type);
    $checkStmt->execute();
    $existingGrade = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingGrade) {
        // Update existing grade
        $updateStmt = $conn->prepare("UPDATE Grades SET grade = :grade, posted_by_id = :teacherId, description = :description, acceptance_state = 'not_accepted' WHERE grade_id = :gradeId");
        $updateStmt->bindParam(':grade', $gradeValue);
        $updateStmt->bindParam(':teacherId', $teacherId);
        $updateStmt->bindParam(':description', $description);
        $updateStmt->bindParam(':gradeId', $existingGrade['grade_id']);
        $updateStmt->execute();
    } else {
        // Insert new grade
        $insertStmt = $conn->prepare("INSERT INTO Grades (student_id, subject_id, posted_by_id, type, grade, description, acceptance_state) VALUES (:studentId, :subjectId, :teacherId, :type, :grade, :description, 'not_accepted')");
        $insertStmt->bindParam(':studentId', $studentId);
        $insertStmt->bindParam(':subjectId', $subjectId);
        $insertStmt->bindParam(':teacherId', $teacherId);
        $insertStmt->bindParam(':type', $type);
        $insertStmt->bindParam(':grade', $gradeValue);
        $insertStmt->bindParam(':description', $description);
        $insertStmt->execute();
    }

    echo json_encode(['message' => 'Grade submitted successfully']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => $e->getMessage()]);
}
?>
