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
    $user_id = $_GET['user_id'];
    $domain = $_GET['domain'];
    $providedPassword = $_GET['password'];

    // Determine the role
    if ($domain === 'student.mak.pl') {
        $role = "student";
        $table = "Students";
    } elseif ($domain === 'mak.pl') {
        $role = "teacher";
        $table = "Personnel";
    } else {
        echo json_encode(['error' => 'Incorrect email domain']);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM $table WHERE id = :user_id");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    $generatedSalt = generateSalt();
    $passwordToHash = $generatedSalt . $providedPassword;
    $hashedPassword = password_hash($passwordToHash, PASSWORD_BCRYPT);

    if ($existingUser) {
        // Update existing user
        $updateStmt = $conn->prepare("UPDATE $table SET password = :hashedPassword, salt = :generatedSalt WHERE id = :user_id");
        $updateStmt->bindParam(':hashedPassword', $hashedPassword, PDO::PARAM_STR);
        $updateStmt->bindParam(':generatedSalt', $generatedSalt, PDO::PARAM_STR);
        $updateStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $updateStmt->execute();
    } else {
        // Insert new user
        $insertStmt = $conn->prepare("INSERT INTO $table (id, password, salt) VALUES (:user_id, :hashedPassword, :generatedSalt)");
        $insertStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $insertStmt->bindParam(':hashedPassword', $hashedPassword, PDO::PARAM_STR);
        $insertStmt->bindParam(':generatedSalt', $generatedSalt, PDO::PARAM_STR);
        $insertStmt->execute();
    }

    echo json_encode(['message' => 'Password and salt inserted/updated!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>
