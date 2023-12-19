<?php
include 'config.php';

// Retrieve GET data
$teacherIdsParam = isset($_GET['teacherIds']) ? $_GET['teacherIds'] : '';

if (!empty($teacherIdsParam)) {
    $teacherIds = explode(',', $teacherIdsParam);
    $placeholders = implode(',', array_fill(0, count($teacherIds), '?'));

    try {
        $stmt = $conn->prepare("SELECT id, title, first_name, last_name FROM Personnel WHERE id IN ($placeholders)");
        $stmt->execute($teacherIds);
        $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($teachers);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'No teacher IDs provided']);
}
?>
