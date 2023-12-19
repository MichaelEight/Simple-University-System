<?php
include 'config.php';

try {
    $token = $_GET['token'];

    if (!empty($token)) {
        // Validate the token and get the student_id
        $stmt = $conn->prepare("SELECT * FROM LoginTokens WHERE token = :token");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($tokenData && $tokenData['role'] === "student") {
            $studentId = $tokenData['user_id'];

            $stmt = $conn->prepare("SELECT * FROM Grades WHERE student_id = :studentId");
            $stmt->bindParam(':studentId', $studentId, PDO::PARAM_INT);
            $stmt->execute();

            $gradesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($gradesData);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(['error' => 'Token parameter is empty']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
