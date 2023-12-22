<?php
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $token = $_GET['token'];

    // Validate the token and get the teacher_id
    $tokenStmt = $conn->prepare("SELECT user_id FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    $teacherId = $tokenData['user_id'];

    // Get unique subject IDs from Registrations
    $subjectsStmt = $conn->prepare("SELECT DISTINCT subject_id FROM Registrations WHERE teacher_id = :teacherId");
    $subjectsStmt->bindParam(':teacherId', $teacherId, PDO::PARAM_INT);
    $subjectsStmt->execute();
    $subjectIds = $subjectsStmt->fetchAll(PDO::FETCH_COLUMN, 0);

    // Get subject names using subject IDs
    $subjectData = [];
    foreach ($subjectIds as $subjectId) {
        $nameStmt = $conn->prepare("SELECT subject_id, subject_name FROM Subjects WHERE subject_id = :subjectId");
        $nameStmt->bindParam(':subjectId', $subjectId, PDO::PARAM_INT);
        $nameStmt->execute();
        $nameResult = $nameStmt->fetch(PDO::FETCH_ASSOC);
        if ($nameResult) {
            $subjectData[] = array(
                'id' => $nameResult['subject_id'],
                'name' => $nameResult['subject_name']
            );
        }
    }

    echo json_encode($subjectData);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
