<?php
// Allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

try {
    // Retrieve the email from the query parameter
    $email = $_GET['email'];

    if (!empty($email) && strpos($email, '@student.mak.pl') !== false) {
        // Extract the student_id from the email
        list($student_id, $domain) = explode('@', $email);
        
        // Use the student_id in the SQL query to find the user
        $stmt = $conn->prepare("SELECT student_id, password FROM Students WHERE student_id = :student_id");
        $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['password'] === $password) {
            echo json_encode(['message' => 'Login successful', 'student_id' => $user['student_id']]);
        } else {
            echo json_encode(['error' => 'Invalid student ID or password']);
        }
    } else {
        echo json_encode(['error' => 'Invalid email format']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
