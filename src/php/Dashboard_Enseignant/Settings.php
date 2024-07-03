<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, PUT, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";
$target_dir = "C:/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/Profile/";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Fetch teacher data
    $id = $_GET['id'];

    $sql = "SELECT * FROM enseignant WHERE ID_Enseignant = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(["message" => "No record found"]);
    }

    $stmt->close();
} elseif ($method == 'PUT') {
    // Update teacher data
    $input = json_decode(file_get_contents("php://input"), true);

    $ID_Enseignant = $input['ID_Enseignant'];
    $Nom = $input['Nom'];
    $Prénom = $input['Prénom'];
    $Matière_enseignée = $input['Matière_enseignée'];
    $Numéro_de_téléphone = $input['Numéro_de_téléphone'];
    $Adresse_électronique = $input['Adresse_électronique'];
    $Description = $input['Description'];
    $password = $input['password'];

    $sql = "UPDATE enseignant SET Nom=?, Prénom=?, Matière_enseignée=?, Numéro_de_téléphone=?, Adresse_électronique=?, Description=?, password=? WHERE ID_Enseignant=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssi", $Nom, $Prénom, $Matière_enseignée, $Numéro_de_téléphone, $Adresse_électronique, $Description, $password, $ID_Enseignant);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating profile: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($method == 'POST') {
    // Upload image
    $ID_Enseignant = $_POST['ID_Enseignant'];
    $img_enseignée = $_FILES['img_enseignée'];

    $target_file = $target_dir . basename($img_enseignée["name"]);
    if (move_uploaded_file($img_enseignée["tmp_name"], $target_file)) {
        $img_url = "/Backend/Cources/LMS_3/Elearning/public/Cover/Profile/" . basename($img_enseignée["name"]);

        $sql = "UPDATE enseignant SET img_enseignée=? WHERE ID_Enseignant=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $img_url, $ID_Enseignant);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Image uploaded successfully", "img_url" => $img_url]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating image URL: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Error uploading image"]);
    }
}

$conn->close();
?>
