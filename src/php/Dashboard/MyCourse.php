<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, PUT, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "root";
$pass = "";
$db = "e-learning";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$courseId = isset($data['courseId']) ? $data['courseId'] : null;
$studentId = isset($data['studentId']) ? $data['studentId'] : null;
$dateParticipation = date('Y-m-d H:i:s'); // Current date and time

if ($courseId !== null && $studentId !== null) {
    $stmt = $conn->prepare("INSERT INTO participer (ID_Cours, ID_Etudiant, Date_Participation) VALUES (?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("iis", $courseId, $studentId, $dateParticipation);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Participation recorded successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to record participation: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => $studentId]);
}

$conn->close();
?>
