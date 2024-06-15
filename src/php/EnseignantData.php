<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data["id"];

if ($id > 0) {
    // Fetch enseignant data
    $stmtEnseignant = $conn->prepare("SELECT * FROM enseignant WHERE ID_Enseignant = ?");
    $stmtEnseignant->bind_param("i", $id);
    $stmtEnseignant->execute();
    $resultEnseignant = $stmtEnseignant->get_result();

    $enseignantData = $resultEnseignant->fetch_assoc();

    // Fetch courses taught by this enseignant
    $stmtCourses = $conn->prepare("
        SELECT c.*, e.Nom AS Nom_Enseignant, e.Prénom AS Prenom_Enseignant 
        FROM cours c 
        JOIN enseignant e ON c.ID_Enseignant = e.ID_Enseignant
        WHERE c.ID_Enseignant = ?
    ");
    $stmtCourses->bind_param("i", $id);
    $stmtCourses->execute();
    $resultCourses = $stmtCourses->get_result();

    $courses = [];
    while ($row = $resultCourses->fetch_assoc()) {
        $courses[] = $row;
    }

    // Combine enseignant data and courses data
    $data = [
        'enseignantData' => $enseignantData,
        'courses' => $courses
    ];

    // Convert data to JSON and output
    echo json_encode($data);
} else {
    echo json_encode(['message' => 'Invalid ID']);
}

$conn->close();
?>
