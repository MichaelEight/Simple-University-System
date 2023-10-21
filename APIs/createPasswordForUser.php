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
    // Retrieve the student_id and domain from the query parameters
    $user_id = $_GET['user_id'];
    $domain = $_GET['domain'];
    $providedPassword = $_GET['password'];

    if (!empty($domain)) {
        if ($domain === 'student.mak.pl') // Student
        {
            $role = "student";
        } elseif ($domain === 'mak.pl') // Teacher
        {
            $role = "teacher";
        } else // Wrong domain
        {
            // Handle the case of an incorrect domain if needed
            echo json_encode(['error' => 'Incorrect email domain']);
            exit;
        }

        $generatedSalt = generateSalt();
        $passwordToHash = $generatedSalt . $providedPassword;
        $hashedPassword = password_hash($passwordToHash, PASSWORD_BCRYPT);

        if($role == "student")
        {
            $insertTokenStmt = $conn->prepare("INSERT INTO Students (id, password, salt) 
                                      VALUES (:user_id, :hashedPassword, :generatedSalt) 
                                      ON DUPLICATE KEY UPDATE password = VALUES(password), salt = VALUES(salt)");
        }
        else // Teacher
        {
            $insertTokenStmt = $conn->prepare("INSERT INTO Personnel (id, password, salt) 
                                      VALUES (:user_id, :hashedPassword, :generatedSalt) 
                                      ON DUPLICATE KEY UPDATE password = VALUES(password), salt = VALUES(salt)");
        }

        // Store the token information in the LoginToken table
        $insertTokenStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $insertTokenStmt->bindParam(':hashedPassword', $hashedPassword, PDO::PARAM_STR);
        $insertTokenStmt->bindParam(':generatedSalt', $generatedSalt, PDO::PARAM_STR);
        $insertTokenStmt->execute();

        echo json_encode(['message' => 'Password and salt inserted!']);
    } else {
        echo json_encode(['error' => 'Domain parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
