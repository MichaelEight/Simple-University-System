<?php
include 'config.php';

// Retrieve GET data
$subjectIdsParam = isset($_GET['subjectIds']) ? $_GET['subjectIds'] : '';

if (!empty($subjectIdsParam)) {
    $subjectIds = explode(',', $subjectIdsParam);
    $placeholders = implode(',', array_fill(0, count($subjectIds), '?'));

    try {
        $stmt = $conn->prepare("SELECT subject_id, subject_name, subject_code, ects FROM Subjects WHERE subject_id IN ($placeholders)");
        $stmt->execute($subjectIds);
        $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($subjects);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No subject IDs provided']);
}
?>
