<?php
// Database configuration
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost", "root", "", "e-learning");

if (!$conn) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}

// SQL query to join the enseignant and cours tables
$sql = "SELECT 
            cours.ID_Cours,
            cours.Nom_du_cours,
            cours.Description AS cours_description,
            cours.Niveau_scolaire,
            cours.Miniature,
            cours.price,
            cours.tag,
            cours.langue,
            cours.ID_Sujet,
            cours.ID_Enseignant,
            enseignant.Nom AS enseignant_nom,
            enseignant.Prénom AS enseignant_prenom,
            enseignant.Matière_enseignée,
            enseignant.Numéro_de_téléphone,
            enseignant.Adresse_électronique,
            enseignant.img_enseignée,
            enseignant.Description AS enseignant_description
        FROM cours
        JOIN enseignant ON cours.ID_Enseignant = enseignant.ID_Enseignant";

$result = $conn->query($sql);

$courses = array();

if ($result->num_rows > 0) {
    // Fetch data
    while($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
} else {
    echo json_encode([]);
}

$conn->close();

// Set Content-Type to application/json
header('Content-Type: application/json');

// Output the JSON encoded data
echo json_encode($courses);
?>
