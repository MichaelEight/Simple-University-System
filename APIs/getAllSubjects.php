<?php
// Include database connection and token validation
include 'config.php';

try {
    $token = $_GET['token'];

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

    // Connect to database and fetch all subjects
    $stmt = $conn->prepare("SELECT * FROM Subjects");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>