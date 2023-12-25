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

    if($userrole != "admin" && $userrole != "dziekan")
    {
        throw new Exception("You have no permissions to perform this action!");
    }

    $stmt = $conn->prepare("SELECT * FROM Grades WHERE student_id = :studentId");
    $stmt->bindParam(':studentId', $studentId, PDO::PARAM_INT);
    $stmt->execute();

    $gradesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($gradesData);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
