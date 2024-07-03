<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Connexion à la base de données (à adapter avec vos paramètres)
$conn = mysqli_connect("localhost", "root", "", "e-learning");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Récupération des données du formulaire
$data = json_decode(file_get_contents("php://input"), true);

$fullName = mysqli_real_escape_string($conn, $data['fullName']);
$email = mysqli_real_escape_string($conn, $data['email']);
$phoneNumber = mysqli_real_escape_string($conn, $data['phoneNumber']);
$message = mysqli_real_escape_string($conn, $data['message']);

// Préparation de la requête SQL pour l'insertion
$sql = "INSERT INTO Reclamations (fullName, email, message, phoneNumber, createdAt) 
        VALUES ('$fullName', '$email', '$message', '$phoneNumber', NOW())";

if (mysqli_query($conn, $sql)) {
    // Succès de l'insertion
    echo json_encode(["success" => 1, "message" => "New record created successfully"]);
} else {
    // Erreur lors de l'insertion
    echo json_encode(["success" => 0, "message" => "Error: " . $sql . "<br>" . mysqli_error($conn)]);
}

// Fermeture de la connexion à la base de données
mysqli_close($conn);
?>
