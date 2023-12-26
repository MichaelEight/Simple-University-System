<?php
include 'config.php';

try {
    // Retrieve student_id from the query parameters
    $studentId = $_GET['studentId'];

    // Calculate average grades for all students
    $stmt = $conn->prepare("SELECT student_id, AVG(CAST(grade AS DECIMAL(3,2))) as avg_grade FROM Grades WHERE grade IS NOT NULL GROUP BY student_id");
    $stmt->execute();
    $averages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Sort by average grade in descending order
    usort($averages, function($a, $b) {
        return $b['avg_grade'] <=> $a['avg_grade'];
    });

    // Find the rank of the specified student and total number of students
    $rank = -1;
    $totalStudents = count($averages);
    foreach ($averages as $index => $grade) {
        if ($grade['student_id'] == $studentId) {
            $rank = $index + 1;
            break;
        }
    }

    // If the student is not found in the list, set the rank to -1
    if ($rank > count($averages)) {
        $rank = -1;
    }

    // Return the rank
    echo json_encode(["rank" => $rank, "totalStudents" => $totalStudents]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
