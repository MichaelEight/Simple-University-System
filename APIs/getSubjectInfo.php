<?php
include 'config.php';

try {
    // Retrieve the student_id and domain from the query parameters
    $token = $_GET['token'];
    $subjectId = $_GET['subjectId'];
    $groupNumber = isset($_GET['groupNumber']) ? $_GET['groupNumber'] : 0;
    
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

    $stmt = $conn->prepare("SELECT * FROM Registrations WHERE subject_id = :subjectId AND group_number = :groupNumber LIMIT 1");

    $stmt->bindParam(':subjectId', $subjectId, PDO::PARAM_INT);
    $stmt->bindParam(':groupNumber', $groupNumber, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>