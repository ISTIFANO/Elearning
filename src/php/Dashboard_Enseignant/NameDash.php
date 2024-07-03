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

// Récupération de l'ID de l'enseignant depuis les paramètres de requête
$teacherId = intval($_GET['teacherId']);  // Use intval to prevent SQL injection

// Requête SQL pour récupérer les informations de l'enseignant
$sql = "SELECT Nom, img_enseignée FROM enseignant WHERE ID_Enseignant = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $teacherId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $teacher = $result->fetch_assoc();
    echo json_encode($teacher);
} else {
    echo json_encode([]);
}

// Fermeture de la connexion à la base de données
$stmt->close();
$conn->close();
?>
