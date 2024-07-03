<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT ID_Etudiant, Nom, Prénom, Date_de_naissance, Adresse, Num_téléphone, Profil_img, password, password_confirmation, email FROM etudiant";
        $result = $conn->query($sql);

        $etudiants = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $etudiants[] = $row;
            }
        }

        echo json_encode($etudiants);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['ID_Etudiant'];
        $nom = $data['Nom'];
        $prenom = $data['Prénom'];
        $date_de_naissance = $data['Date_de_naissance'];
        $adresse = $data['Adresse'];
        $telephone = $data['Num_téléphone'];
        $profil_img = $data['Profil_img'];
        $password = $data['password'];
        $password_confirmation = $data['password_confirmation'];
        $email = $data['email'];

        $sql = "UPDATE etudiant SET Nom=?, Prénom=?, Date_de_naissance=?, Adresse=?, Num_téléphone=?, Profil_img=?, password=?, password_confirmation=?, email=? WHERE ID_Etudiant=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssi", $nom, $prenom, $date_de_naissance, $adresse, $telephone, $profil_img, $password, $password_confirmation, $email, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Etudiant mis à jour avec succès."]);
        } else {
            echo json_encode(["message" => "Erreur lors de la mise à jour de l'étudiant."]);
        }

        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['ID_Etudiant'];

        $sql = "DELETE FROM etudiant WHERE ID_Etudiant=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Etudiant supprimé avec succès."]);
        } else {
            echo json_encode(["message" => "Erreur lors de la suppression de l'étudiant."]);
        }

        $stmt->close();
        break;

    default:
        echo json_encode(["message" => "Méthode non supportée."]);
        break;
}

$conn->close();
?>
