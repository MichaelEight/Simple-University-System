<?php
include 'config.php';

try {
    // Retrieve the token from the query parameters
    $token = $_GET['token'];

    if (!empty($token)) {
        // Check if the token exists
        $stmt = $conn->prepare("SELECT * FROM LoginTokens WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();

        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($tokenData) {
            // Check if the token has expired
            $currentTimestamp = date('Y-m-d H:i:s');
            if ($currentTimestamp > $tokenData['valid_until']) {
                // Delete the expired token
                $deleteStmt = $conn->prepare("DELETE FROM LoginTokens WHERE token = :token");
                $deleteStmt->bindParam(':token', $token, PDO::PARAM_STR);
                $deleteStmt->execute();
                echo json_encode(['valid' => false, 'expired' => true]);
            } else {
                echo json_encode(['valid' => true]);
            }
        } else {
            echo json_encode(['valid' => false, 'expired' => false]);
        }
    } else {
        echo json_encode(['error' => 'Token parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
