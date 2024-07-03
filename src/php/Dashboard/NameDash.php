<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Récupération de l'ID de l'étudiant depuis les paramètres de requête
$studentId = intval($_GET['studentId']);  // Use intval to prevent SQL injection

// Requête SQL pour récupérer les informations de l'étudiant
$sql = "SELECT Nom, Profil_img FROM etudiant WHERE ID_Etudiant = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $studentId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $student = $result->fetch_assoc();
    echo json_encode($student);
} else {
    echo json_encode([]);
}

// Fermeture de la connexion à la base de données
$stmt->close();
$conn->close();
?>
