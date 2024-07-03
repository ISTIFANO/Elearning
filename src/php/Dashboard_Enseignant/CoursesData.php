<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$connexion = mysqli_connect("localhost", "root", "", "e-learning");

if (!$connexion) {
    die("Connection failed: " . mysqli_connect_error());
}

$input = json_decode(file_get_contents('php://input'), true);
$userId = $input['userId'];

$sql = "SELECT c.ID_Cours, c.Nom_du_cours, c.Description, c.Niveau_scolaire, c.Miniature, c.price, c.tag, c.langue, c.ID_Sujet, c.ID_Enseignant 
        FROM cours c
        WHERE c.ID_Enseignant = ?";

$stmt = $connexion->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$courses = [];
while($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

$stmt->close();
$connexion->close();

echo json_encode($courses);
?>
