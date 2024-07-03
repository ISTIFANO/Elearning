<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Variables de connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération des données du formulaire
$ID_Enseignant = mysqli_real_escape_string($conn, $_POST['ID_Enseignant']);
$Nom = mysqli_real_escape_string($conn, $_POST['Nom']);
$Prénom = mysqli_real_escape_string($conn, $_POST['Prénom']);
$Matière_enseignée = mysqli_real_escape_string($conn, $_POST['Matière_enseignée']);
$Numéro_de_téléphone = mysqli_real_escape_string($conn, $_POST['Numéro_de_téléphone']);
$Adresse_électronique = mysqli_real_escape_string($conn, $_POST['Adresse_électronique']);
$Description = mysqli_real_escape_string($conn, $_POST['Description']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

$img_enseignée = '';
if (isset($_FILES['img_enseignée']) && $_FILES['img_enseignée']['error'] == UPLOAD_ERR_OK) {
    $img_enseignée = 'Cover/Profile/' . basename($_FILES['img_enseignée']['name']);
    move_uploaded_file($_FILES['img_enseignée']['tmp_name'], $img_enseignée);
}

// Requête SQL d'insertion
$sql = "INSERT INTO enseignant (ID_Enseignant, Nom, Prénom, Matière_enseignée, Numéro_de_téléphone, Adresse_électronique, img_enseignée, Description, password)
        VALUES ('$ID_Enseignant', '$Nom', '$Prénom', '$Matière_enseignée', '$Numéro_de_téléphone', '$Adresse_électronique', '$img_enseignée', '$Description', '$password')";

// Exécution de la requête SQL et gestion des résultats
if ($conn->query($sql) === TRUE) {
    // Envoi d'une réponse HTTP 201 - Created si l'insertion est réussie
    http_response_code(201);
    echo json_encode(array("message" => "Enseignant ajouté avec succès."));
} else {
    // En cas d'erreur, envoi d'une réponse HTTP 500 - Internal Server Error avec un message d'erreur
    http_response_code(500);
    echo json_encode(array("message" => "Erreur lors de l'ajout de l'enseignant : " . $conn->error));
}

// Fermeture de la connexion à la base de données
$conn->close();
?>
