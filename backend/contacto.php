<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "sql300.infinityfree.com";
$dbname = "identity_contact";
$username = "if0_39220167";
$password = "7ofaAlStxy6";

// Conexión con PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
} catch (PDOException $e) {
    http_response_code(500);
    echo "Error de conexión: " . $e->getMessage();
    exit;
}


$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$subject = $data['subject'] ?? '';
$message = $data['message'] ?? '';

if (!$name || !$phone || !$email || !$subject || !$message) {
    http_response_code(400);
    echo "Todos los campos son obligatorios.";
    exit;
}

// Insertar en la base de datos
$stmt = $pdo->prepare("INSERT INTO messages (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)");
if ($stmt->execute([$name, $phone, $email, $subject, $message])) {
    echo "Mensaje recibido correctamente.";
} else {
    http_response_code(500);
    echo "Error al guardar el mensaje.";
}
