<?php
header("Access-Control-Allow-Origin: http://localhost:5174");
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
    // Fetch student data
    $id = $_GET['id'];

    $sql = "SELECT * FROM etudiant WHERE ID_Etudiant = ?";
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
    // Update student data
    $input = json_decode(file_get_contents("php://input"), true);

    $ID_Etudiant = $input['ID_Etudiant'];
    $Nom = $input['Nom'];
    $Prénom = $input['Prénom'];
    $Date_de_naissance = $input['Date_de_naissance'];
    $Adresse = $input['Adresse'];
    $Num_téléphone = $input['Num_téléphone'];
    $Profil_img = $input['Profil_img'];
    $password = $input['password'];

    $sql = "UPDATE etudiant SET Nom=?, Prénom=?, Date_de_naissance=?, Adresse=?, Num_téléphone=?, Profil_img=?, password=? WHERE ID_Etudiant=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssissi", $Nom, $Prénom, $Date_de_naissance, $Adresse, $Num_téléphone, $Profil_img, $password, $ID_Etudiant);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating profile: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($method == 'POST') {
    // Upload image
    $ID_Etudiant = $_POST['ID_Etudiant'];
    $Profil_img = $_FILES['Profil_img'];

    $target_file = $target_dir . basename($Profil_img["name"]);
    if (move_uploaded_file($Profil_img["tmp_name"], $target_file)) {
        $img_url = "/Backend/Cources/LMS_3/Elearning/public/Cover/Profile/" . basename($Profil_img["name"]);

        $sql = "UPDATE etudiant SET Profil_img=? WHERE ID_Etudiant=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $img_url, $ID_Etudiant);

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
