<?php
include 'config.php';

function generateSalt($length = 22) {
    if ($length % 2 !== 0) {
        $length++;
    }
    $salt = random_bytes($length / 2);
    $hexSalt = bin2hex($salt);
    return '$2y$10$' . $hexSalt;
}

try {
    // Retrieve data from GET request
    $firstName = $_GET['firstName'];
    $lastName = $_GET['lastName'];
    $providedPassword = $_GET['password'];
    $dateOfBirth = $_GET['dateOfBirth'];
    $major = $_GET['major'];
    $degree = $_GET['degree'];
    $studyMode = $_GET['studyMode'];
    $clubs = $_GET['clubs'] ?? ''; // Optional field

    // Generate hashed password
    $generatedSalt = generateSalt();
    $passwordToHash = $generatedSalt . $providedPassword;
    $hashedPassword = password_hash($passwordToHash, PASSWORD_BCRYPT);

    // echo json_encode([
    //     'firstName' => $firstName,
    //     'lastName' => $lastName,
    //     'password' => $providedPassword, // Note: Be cautious about echoing back passwords
    //     'dateOfBirth' => $dateOfBirth,
    //     'major' => $major,
    //     'degree' => $degree,
    //     'studyMode' => $studyMode,
    //     'clubs' => $clubs,
    //     'generatedSalt' => $generatedSalt,
    //     'passwordToHash' => $passwordToHash,
    //     'hashedPassword' => $hashedPassword
    // ]);

    // Insert student record into database
    $insertStmt = $conn->prepare("INSERT INTO Students 
        (password, salt, first_name, last_name, date_of_birth, status, major, degree, study_mode, date_of_start, date_of_graduation, clubs) 
        VALUES (:hashedPassword, :generatedSalt, :firstName, :lastName, :dateOfBirth, 'oczekujący', :major, :degree, :studyMode, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 YEAR), :clubs)");
    // $insertStmt = $conn->prepare("INSERT INTO Students 
    //     (first_name, last_name) 
    //     VALUES (:firstName, :lastName)");
    
    $insertStmt->bindParam(':firstName', $firstName, PDO::PARAM_STR);
    $insertStmt->bindParam(':lastName', $lastName, PDO::PARAM_STR);
    $insertStmt->bindParam(':hashedPassword', $hashedPassword, PDO::PARAM_STR);
    $insertStmt->bindParam(':generatedSalt', $generatedSalt, PDO::PARAM_STR);
    $insertStmt->bindParam(':dateOfBirth', $dateOfBirth, PDO::PARAM_STR);
    $insertStmt->bindParam(':major', $major, PDO::PARAM_STR);
    $insertStmt->bindParam(':degree', $degree, PDO::PARAM_STR);
    $insertStmt->bindParam(':studyMode', $studyMode, PDO::PARAM_STR);
    $insertStmt->bindParam(':clubs', $clubs, PDO::PARAM_STR);
    
    $insertStmt->execute();

    echo json_encode(['message' => 'Rekrutacja pomyślna! Oczekuj na zatwierdzenie konta']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>
