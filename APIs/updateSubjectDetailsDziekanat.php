<?php

// Include database connection and token validation
include 'config.php';

try {
    $token = $_GET['token'];
    $subject_id = $_GET['subject_id'];
    $subject_name = $_GET['subject_name'];
    $subject_code = $_GET['subject_code'];
    $ects = $_GET['ects'];
    $sylabus = $_GET['sylabus'];
    $konsultacje = $_GET['konsultacje'];
    $literatura = $_GET['literatura'];

    // Validate the token
    $tokenStmt = $conn->prepare("SELECT user_id, role FROM LoginTokens WHERE token = :token");
    $tokenStmt->bindParam(':token', $token, PDO::PARAM_STR);
    $tokenStmt->execute();
    $tokenData = $tokenStmt->fetch(PDO::FETCH_ASSOC);

    if (!$tokenData) {
        throw new Exception("Invalid token");
    }

    $userrole = $tokenData['role'];

    if($userrole != "admin" && $userrole != "dziekan")
    {
        throw new Exception("You have no permissions to perform this action!");
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("UPDATE Subjects SET subject_name = :subject_name, subject_code = :subject_code, ects = :ects, sylabus = :sylabus, konsultacje = :konsultacje, literatura = :literatura WHERE subject_id = :subject_id");

    // Bind parameters and execute
    $stmt->bindParam(':subject_id', $subject_id);
    $stmt->bindParam(':subject_name', $subject_name);
    $stmt->bindParam(':subject_code', $subject_code);
    $stmt->bindParam(':ects', $ects);
    $stmt->bindParam(':sylabus', $sylabus);
    $stmt->bindParam(':konsultacje', $konsultacje);
    $stmt->bindParam(':literatura', $literatura);
    $stmt->execute();

    echo json_encode(["message" => "Subject updated successfully"]);
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>