<?php
// Headers permettant les requêtes CORS et le type de contenu JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données MySQL (modifier ces valeurs selon votre configuration)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

// Création de la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Récupération de l'ID de l'étudiant à partir des paramètres GET
$studentId = intval($_GET['studentId']);  // Utilisation de intval pour éviter les injections SQL

// Requête SQL pour récupérer les enseignants suivis par l'étudiant pour un cours spécifique
$sql = "SELECT enseignant.ID_Enseignant, enseignant.Nom, enseignant.Prénom, enseignant.Matière_enseignée, enseignant.Numéro_de_téléphone, enseignant.Adresse_électronique, enseignant.img_enseignée
        FROM enseignant
        INNER JOIN cours ON enseignant.ID_Enseignant = cours.ID_Enseignant
        INNER JOIN participer ON cours.ID_Cours = participer.ID_Cours
        WHERE participer.ID_Etudiant = $studentId";

// Exécution de la requête
$result = $conn->query($sql);

// Vérification si la requête a réussi
if ($result === false) {
    http_response_code(500); // Internal Server Error
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

// Création d'un tableau pour stocker les données des enseignants
$teachers = [];
while ($row = $result->fetch_assoc()) {
    $teachers[] = $row;
}

// Fermeture du résultat et de la connexion
$result->close();
$conn->close();

// Renvoi des données au format JSON
echo json_encode($teachers);
?>
