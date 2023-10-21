<?php
include 'config.php';

function generateToken() {
    $uniqueId = uniqid(mt_rand(), true); // Generate a unique ID
    $token = md5($uniqueId); // Create an MD5 hash of the unique ID

    return $token;
}

try {
    // Retrieve the student_id and domain from the query parameters
    $user_id = $_GET['user_id'];
    $domain = $_GET['domain'];
    $providedPassword = $_GET['password'];

    if (!empty($domain)) {
        if ($domain === 'student.mak.pl') // Student
        {
            $stmt = $conn->prepare("SELECT * FROM Students WHERE id = :user_id");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        } elseif ($domain === 'mak.pl') // Teacher
        {
            $stmt = $conn->prepare("SELECT * FROM Personnel WHERE id = :user_id");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        } else // Wrong domain
        {
            // Handle the case of an incorrect domain if needed
            echo json_encode(['error' => 'Incorrect email domain']);
            exit;
        }

        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch instead of fetchAll

        if ($user) {
            $storedPassword = $user['password'];

            if ($providedPassword === $storedPassword) {
                // Create a new token
                $token = generateToken(); // Implement a function to generate a unique token

                if($domain === 'student.mak.pl')
                    $role = "student";
                else if($domain === 'mak.pl')
                    $role = "teacher";
                else
                    $role = "none";
                
                // Store the token information in the LoginToken table
                $insertTokenStmt = $conn->prepare("INSERT INTO LoginTokens (user_id, role, valid_since, valid_until, token) VALUES (:user_id, :role, NOW(), NOW() + INTERVAL 7 DAY, :token)");
                $insertTokenStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $insertTokenStmt->bindParam(':role', $role, PDO::PARAM_STR);
                $insertTokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
                $insertTokenStmt->execute();

                $user['token'] = $token;
                $user['message'] = 'Login successful';
                $user['role'] = $role;
                echo json_encode($user); // Passwords match, login successful
            } else {
                echo json_encode(['error' => 'Password does not match']); // Passwords do not match, login failed
            }
        } else {
            // If no user is found with the given user_id, return an empty object.
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Domain parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
