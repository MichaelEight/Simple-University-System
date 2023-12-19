<?php
include 'config.php';

$gradeId = isset($_GET['gradeId']) ? $_GET['gradeId'] : '';
$challengedGrade = isset($_GET['challengedGrade']) ? $_GET['challengedGrade'] : '';
$token = isset($_GET['token']) ? $_GET['token'] : '';

try {
    if (!empty($token)) {
        // Validate the token
        $stmt = $conn->prepare("SELECT * FROM LoginTokens WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($tokenData) {
            // Assuming that only students can challenge grades
            if ($tokenData['role'] === "student") {
                // Token is valid; proceed to update the grade
                $stmt = $conn->prepare("UPDATE Grades SET challenged_grade = :challengedGrade, acceptance_state = 'challenged' WHERE grade_id = :gradeId AND student_id = :studentId");
                $stmt->bindParam(':challengedGrade', $challengedGrade);
                $stmt->bindParam(':gradeId', $gradeId, PDO::PARAM_INT);
                $stmt->bindParam(':studentId', $tokenData['user_id'], PDO::PARAM_INT);
                $stmt->execute();

                echo json_encode(['success' => 'Grade challenged']);
            } else {
                // Token is valid, but the role is not 'student'
                http_response_code(403); // Forbidden
                echo json_encode(['error' => 'Access denied for this role']);
            }
        } else {
            // Token is invalid
            http_response_code(401); // Unauthorized
            echo json_encode(['error' => 'Invalid token']);
        }
    } else {
        echo json_encode(['error' => 'Token parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>