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
        $sql = "SELECT ID_Enseignant, Nom, Prénom, Matière_enseignée, Numéro_de_téléphone, Adresse_électronique, img_enseignée, Description FROM enseignant";
        $result = $conn->query($sql);

        $enseignants = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $enseignants[] = $row;
            }
        }

        echo json_encode($enseignants);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['ID_Enseignant'];
        $nom = $data['Nom'];
        $prenom = $data['Prénom'];
        $matiere = $data['Matière_enseignée'];
        $telephone = $data['Numéro_de_téléphone'];
        $email = $data['Adresse_électronique'];

        $sql = "UPDATE enseignant SET Nom=?, Prénom=?, Matière_enseignée=?, Numéro_de_téléphone=?, Adresse_électronique=? WHERE ID_Enseignant=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", $nom, $prenom, $matiere, $telephone, $email, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Enseignant mis à jour avec succès."]);
        } else {
            echo json_encode(["message" => "Erreur lors de la mise à jour de l'enseignant."]);
        }

        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['ID_Enseignant'];

        $sql = "DELETE FROM enseignant WHERE ID_Enseignant=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Enseignant supprimé avec succès."]);
        } else {
            echo json_encode(["message" => "Erreur lors de la suppression de l'enseignant."]);
        }

        $stmt->close();
        break;

    default:
        echo json_encode(["message" => "Méthode non supportée."]);
        break;
}

$conn->close();
?>
