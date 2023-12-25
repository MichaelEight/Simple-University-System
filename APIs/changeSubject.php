<?php
include 'config.php';

try {
    // Retrieve the student_id and domain from the query parameters
    $token = $_GET['token'];
    $subjectId = $_GET['subjectId'];
    $place = $_GET['place'];
    $startsAt = $_GET['startsAt'];
    $endsAt = $_GET['endsAt'];
    $weekday = $_GET['weekday'];
    $whichWeeks = $_GET['whichWeeks'];
    $groupNumber = $_GET['groupNumber'];
    

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

    if($storedRole != "admin" && $storedRole != "dziekan")
    {
        throw new Exception("You don't have permissions to perform this action!");
    }

    $stmt = $conn->prepare("UPDATE Registrations SET 
        place = :place, 
        starts_at = :startsAt, 
        ends_at = :endsAt, 
        weekday = :weekday, 
        which_weeks = :whichWeeks 
        WHERE subject_id = :subjectId AND group_number = :groupNumber");

    $stmt->bindParam(':subjectId', $subjectId, PDO::PARAM_INT);
    $stmt->bindParam(':place', $place, PDO::PARAM_STR);
    $stmt->bindParam(':startsAt', $startsAt, PDO::PARAM_STR);
    $stmt->bindParam(':endsAt', $endsAt, PDO::PARAM_STR);
    $stmt->bindParam(':weekday', $weekday, PDO::PARAM_STR);
    $stmt->bindParam(':whichWeeks', $whichWeeks, PDO::PARAM_STR);
    $stmt->bindParam(':groupNumber', $groupNumber, PDO::PARAM_STR);

    $stmt->execute();

    echo json_encode(["message" => "Lesson updated successfully"]);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>