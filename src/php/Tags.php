<?php
// Connexion à la base de données
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");

$connexion = mysqli_connect("localhost", "root", "", "e-learning");

if (!$connexion) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents('php://input'), true);
$tag = $data["tag"];

// Requête SQL pour récupérer les cours avec le même tag
$sql = "SELECT * FROM cours WHERE tag Like '$tag'";
$result = mysqli_query($connexion, $sql);

$courses = array();

if (mysqli_num_rows($result) > 0) {
    // Récupération des données de chaque cours
    while($row = mysqli_fetch_assoc($result)) {
        $courses[] = $row;
    }
} else {
    echo json_encode(array("message" => "Aucun cours trouvé avec ce tag."));
}

// Fermeture de la connexion
mysqli_close($connexion);

// Retour des données au format JSON
echo json_encode($courses);
?>
