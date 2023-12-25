<?php
include 'config.php';

try {
    // Retrieve the student_id and domain from the query parameters
    $token = $_GET['token'];
    $targetId = isset($_GET['targetId']) ? $_GET['targetId'] : null;

    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id, role FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    $storedUserId = $tokenData['user_id'];
    $storedRole = $tokenData['role'];

    if (empty($targetId)) {
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
    }
    else
    {
        if($targetId >= 100000 && $targetId <= 999999) // Student
        {
            $stmt = $conn->prepare("SELECT * FROM Registrations WHERE student_id = :storedUserId");
            $stmt->bindParam(':storedUserId', $targetId, PDO::PARAM_INT);
            $stmt->execute();

            $timetableData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($timetableData);
        }
        else if ($targetId >= 1000 && $targetId <= 99999) // Teacher
        {
            $stmt = $conn->prepare("SELECT * FROM Registrations WHERE teacher_id = :storedUserId");
            $stmt->bindParam(':storedUserId', $targetId, PDO::PARAM_INT);
            $stmt->execute();

            $timetableData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($timetableData);
        }
        else
        {
            throw new Exception("Target ID is neither student nor teacher!");
        }
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>