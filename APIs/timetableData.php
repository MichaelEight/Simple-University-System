<?php
include 'config.php';

try {
    // Retrieve the student_id and domain from the query parameters
    $token = $_GET['token'];

    if (!empty($token)) {
        $stmt = $conn->prepare("SELECT * FROM LoginTokens WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC); // Use fetch instead of fetchAll

        if ($tokenData) {
            $storedUserId = $tokenData['user_id'];
            $storedRole = $tokenData['role'];

            if($storedRole == "student")
            {
                $stmt = $conn->prepare("SELECT * FROM Registrations WHERE student_id = :storedUserId");
                $stmt->bindParam(':storedUserId', $storedUserId, PDO::PARAM_INT);
                $stmt->execute();

                $timetableData = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($timetableData);
            }
            else if($storedRole == "teacher")
            {
                $stmt = $conn->prepare("SELECT * FROM Registrations WHERE teacher_id = :storedUserId");
                $stmt->bindParam(':storedUserId', $storedUserId, PDO::PARAM_INT);
                $stmt->execute();

                $timetableData = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($timetableData);
            }
        } else {
            // If no token is found, return an empty object.
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Token parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>