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

$data = json_decode(file_get_contents("php://input"), true);
$id_enseignant = $data['ID_Enseignant'];

$sql = "
    SELECT 
        e.ID_Enseignant, 
        e.Nom, 
        e.Prénom, 
        e.Matière_enseignée, 
        e.Numéro_de_téléphone, 
        e.Adresse_électronique, 
        e.img_enseignée, 
        e.Description,
        COUNT(DISTINCT c.ID_Cours) AS total_courses,
        COUNT(DISTINCT p.ID_Etudiant) AS total_students
    FROM enseignant e
    LEFT JOIN cours c ON e.ID_Enseignant = c.ID_Enseignant
    LEFT JOIN participer p ON c.ID_Cours = p.ID_Cours
    WHERE e.ID_Enseignant = '$id_enseignant'
    GROUP BY e.ID_Enseignant, e.Nom, e.Prénom, e.Matière_enseignée, e.Numéro_de_téléphone, e.Adresse_électronique, e.img_enseignée, e.Description";

$result = mysqli_query($connexion, $sql);

if ($result) {
    $enseignant_info = mysqli_fetch_assoc($result);
    echo json_encode($enseignant_info);
} else {
    echo json_encode(["error" => "No data found"]);
}

mysqli_close($connexion);
?>
