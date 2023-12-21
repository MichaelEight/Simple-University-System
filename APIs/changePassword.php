<?php
include 'config.php';

function generateSalt($length = 22) {
    // Ensure that the length is even (for compatibility with crypt)
    if ($length % 2 !== 0) {
        $length++;
    }
    
    // Generate random bytes
    $salt = random_bytes($length / 2);
    
    // Convert the binary data to hexadecimal
    $hexSalt = bin2hex($salt);
    
    return '$2y$10$' . $hexSalt; // Example using bcrypt with cost factor 10
}

try {
    $token = $_GET['token'];
    $currentPassword = $_GET['currentpassword'];
    $newPassword = $_GET['newpassword'];

    if (!empty($token) && !empty($currentPassword) && !empty($newPassword)) {
        $stmt = $conn->prepare("SELECT * FROM LoginTokens WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($tokenData) {
            $storedUserId = $tokenData['user_id'];
            $storedRole = $tokenData['role'];

            // Fetch current password and salt from the database
            $userStmt = $conn->prepare("SELECT password, salt FROM " . ($storedRole == "student" ? "Students" : "Personnel") . " WHERE id = :user_id");
            $userStmt->bindParam(':user_id', $storedUserId, PDO::PARAM_INT);
            $userStmt->execute();
            $userData = $userStmt->fetch(PDO::FETCH_ASSOC);

            if ($userData && password_verify($userData['salt'] . $currentPassword, $userData['password'])) {
                // Current password is correct, proceed with updating the password
                $generatedSalt = generateSalt();
                $passwordToHash = $generatedSalt . $newPassword;
                $hashedPassword = password_hash($passwordToHash, PASSWORD_BCRYPT);

                $updateStmt = $conn->prepare("UPDATE " . ($storedRole == "student" ? "Students" : "Personnel") . " SET password = :hashedPassword, salt = :generatedSalt WHERE id = :user_id");
                $updateStmt->bindParam(':hashedPassword', $hashedPassword, PDO::PARAM_STR);
                $updateStmt->bindParam(':generatedSalt', $generatedSalt, PDO::PARAM_STR);
                $updateStmt->bindParam(':user_id', $storedUserId, PDO::PARAM_INT);
                
                if ($updateStmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Password changed successfully']);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Failed to change password']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Current password is incorrect']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid token']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Missing required parameters']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error: ' . $e->getMessage()]);
}
?>
