<?php
include 'config.php';

try {
    // Retrieve the token from the query parameters
    $token = $_GET['token'];

    if (!empty($token)) {
        // Check if the token exists in the database
        $stmt = $conn->prepare("SELECT * FROM LoginTokens WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();

        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($tokenData) {
            // Token found, now delete it
            $stmt = $conn->prepare("DELETE FROM LoginTokens WHERE token = :token");
            $stmt->bindParam(':token', $token, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode(['message' => 'Token removed successfully']);
        } else {
            echo json_encode(['error' => 'Token not found']);
        }
    } else {
        echo json_encode(['error' => 'Token parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>