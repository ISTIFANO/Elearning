<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Récupération des données POST
$data = json_decode(file_get_contents("php://input"), true);
$studentId = intval($data['studentId']);  // Use intval to prevent SQL injection

// Requête SQL pour supprimer le participant
$sql = "DELETE FROM participer WHERE ID_Etudiant = $studentId";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

// Fermeture de la connexion à la base de données
$conn->close();
?>
