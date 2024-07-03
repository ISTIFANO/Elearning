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

// Requête SQL pour récupérer les étudiants qui participent aux cours enseignés par l'enseignant spécifié
$sql = "SELECT e.ID_Etudiant, e.Nom, e.Prénom, e.email, e.Num_téléphone, e.Adresse, e.Profil_img
        FROM etudiant e
        INNER JOIN participer p ON e.ID_Etudiant = p.ID_Etudiant
        INNER JOIN cours c ON p.ID_Cours = c.ID_Cours
        INNER JOIN enseignant ens ON c.ID_Enseignant = ens.ID_Enseignant
        WHERE ens.ID_Enseignant = $teacherId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Création d'un tableau associatif pour stocker les données des étudiants
    $students = array();
    
    while($row = $result->fetch_assoc()) {
        // Ajout des données de chaque étudiant dans le tableau
        $students[] = $row;
    }
    
    // Conversion du tableau associatif en format JSON et affichage
    echo json_encode($students);
} else {
    // Si aucun résultat n'est retourné, renvoyer un tableau vide
    echo json_encode([]);
}

// Fermeture de la connexion à la base de données
$conn->close();
?>
