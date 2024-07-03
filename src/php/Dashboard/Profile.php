<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost", "root", "", "e-learning");

if (!$conn) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}

// Récupération de l'ID de l'étudiant depuis les paramètres de requête
$studentId = $_GET['studentId'];

$sql = "SELECT *FROM etudiant 
        WHERE ID_Etudiant = $studentId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Récupération des données de l'étudiant
    $student = $result->fetch_assoc();
    echo json_encode($student);
} else {
    echo json_encode(["error" => "No student found with ID $studentId"]);
}

$conn->close();
?>
