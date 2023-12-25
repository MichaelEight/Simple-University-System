<?php
include 'config.php';

try {
    // Retrieve the student_id and domain from the query parameters
    $token = $_GET['token'];
    $studentId = $_GET['studentId'];
    $subjectId = $_GET['subjectId'];
    $targetGroup = $_GET['targetGroup'];

    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id, role FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    $storedUserId = $tokenData['user_id'];
    $storedRole = $tokenData['role'];

    if($storedRole != "admin" && $storedRole != "dziekan")
    {
        throw new Exception("You don't have permissions to perform this action!");
    }

    $stmt = $conn->prepare("UPDATE Registrations SET group_number = :targetGroup WHERE subject_id = :subjectId AND student_id = :studentId");

    $stmt->bindParam(':targetGroup', $targetGroup, PDO::PARAM_INT);
    $stmt->bindParam(':subjectId', $subjectId, PDO::PARAM_INT);
    $stmt->bindParam(':studentId', $studentId, PDO::PARAM_INT);

    $stmt->execute();

    echo json_encode(["message" => "Group updated successfully"]);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>