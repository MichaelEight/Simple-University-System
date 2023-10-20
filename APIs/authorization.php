<?php
// Allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id21392784_pierwszepietro";
$password = "KochamPierogi69!";
$database = "id21392784_susbase";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Przyjęcie danych logowania
    $data = json_decode(file_get_contents('php://input'));

    // Podział wejścia na zmienne
    $email = $data->email;
    $password = $data->password;

    if (strpos($email, '@') !== false) {
        // Logowanie za pomocą adresu e-mail
        if (isCorrectEmailCredentials($email, $password)) {
            // Wygenerowanie tokena autoryzacyjnego (np. JWT)
            $token = generateAuthToken($email);

            // Zwrócenie tokena jako odpowiedzi
            echo json_encode(['token' => $token]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(['error' => 'Invalid credentials']);
        }
    }
}

function getUserDataByEmail($email) {
    global $conn;

    // Wydobywamy student_id z adresu e-mail
    $student_id = explode('@', $email)[0];

    // Sprawdź studenta w tabeli Students
    $stmt = $conn->prepare("SELECT * FROM Students WHERE student_id = :student_id");
    $stmt->bindParam(':student_id', $student_id, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function isCorrectEmailCredentials($email, $password) {
    $userData = getUserDataByEmail($email);

    if (!$userData) {
        return false;
    }

    $hashedPassword = $userData['password'];
    $salt = $userData['salt'];

    return verifyPassword($password, $hashedPassword, $salt);
}

function generateAuthToken($identifier) {
    global $conn;

    // Wygeneruj token autoryzacyjny
    $key = "secret_key"; // Klucz prywatny używany do podpisywania tokenów

    // Wyszukaj user_id i rolę na podstawie identyfikatora
    $user_data = getUserDataByEmail($identifier);
    $user_id = $user_data['student_id'];
    $role = 'student'; // Przykład roli

    // Czas wygaśnięcia tokenu (7 dni od teraz)
    $valid_until = time() + 7 * 24 * 60 * 60;

    // Wygenerowanie tokena
    $tokenData = [
        "user_id" => $user_id,
        "role" => $role,
        "iat" => time(), // Czas utworzenia tokenu
        "exp" => $valid_until // Czas wygaśnięcia tokenu
    ];

    $token = JWT::encode($tokenData, $key, 'HS256');

    // Zapisz token w tabeli "LoginTokens"
    $stmt = $conn->prepare("INSERT INTO LoginTokens (user_id, role, valid_until, token) VALUES (:user_id, :role, :valid_until, :token)");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':role', $role, PDO::PARAM_STR);
    $stmt->bindParam(':valid_until', $valid_until, PDO::PARAM_INT);
    $stmt->bindParam(':token', $token, PDO::PARAM_STR);
    $stmt->execute();

    return $token;
}
?>