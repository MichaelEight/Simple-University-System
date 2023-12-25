<?php
include 'config.php'; // Include your database configuration

try {
    $token = $_GET['token'];
    $subject_id = $_GET['subject_id'];
    $konsultacje = $_GET['konsultacje'];
    $literatura = $_GET['literatura'];

    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    // Update subject details
    $updateStmt = $conn->prepare("UPDATE Subjects SET konsultacje = :konsultacje, literatura = :literatura WHERE subject_id = :subject_id");
    $updateStmt->bindParam(':subject_id', $subject_id, PDO::PARAM_INT);
    $updateStmt->bindParam(':konsultacje', $konsultacje, PDO::PARAM_STR);
    $updateStmt->bindParam(':literatura', $literatura, PDO::PARAM_STR);
    $updateStmt->execute();

    echo json_encode(['message' => 'Update successful']);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
