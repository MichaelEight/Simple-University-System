<?php
include 'config.php';

try {
    // Retrieve the student_id and domain from the query parameters
    $user_id = $_GET['user_id'];
    $domain = $_GET['domain'];

    if (!empty($domain)) {
        if ($domain === 'student.mak.pl') // Student
        {
            $stmt = $conn->prepare("SELECT * FROM Students WHERE student_id = :user_id");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        } elseif ($domain === 'mak.pl') // Teacher
        {
            $stmt = $conn->prepare("SELECT * FROM Personnel WHERE id = :user_id");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        } else // Wrong domain
        {
            // Handle the case of an incorrect domain if needed
        }

        $stmt->execute();

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($users) {
            echo json_encode($users);
        } else {
            // If no user is found with the given user_id, return an empty array.
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
