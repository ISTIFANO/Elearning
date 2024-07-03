<?php
// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Ensure no output before headers
ob_start();

// Database connection
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "e-learning"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$nom_du_cours = $_POST['nom_du_cours'] ?? '';
$description = $_POST['description'] ?? '';
$niveau_scolaire = $_POST['niveau_scolaire'] ?? '';
$price = $_POST['price'] ?? '';
$tag = $_POST['tag'] ?? '';
$langues = isset($_POST['langues']) ? $_POST['langues'] : [];
$id_sujet = isset($_POST['id_sujet']) ? $_POST['id_sujet'] : [];
$id_enseignant = $_POST['id_enseignant'] ?? '';

// File upload handling
$target_dir = "C:/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/";
$miniature = $_FILES['miniature'];
$target_file = $target_dir . basename($miniature["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Check if file is an actual image
$check = getimagesize($miniature["tmp_name"]);
if($check === false) {
    echo json_encode(["message" => "File is not an image."]);
    exit();
}

// Check if file already exists
if (file_exists($target_file)) {
    echo json_encode(["message" => "Sorry, file already exists."]);
    exit();
}

// Check file size (limit to 5MB)
if ($miniature["size"] > 5000000) {
    echo json_encode(["message" => "Sorry, your file is too large."]);
    exit();
}

// Allow certain file formats
$allowed_extensions = array('jpg', 'jpeg', 'png', 'gif');
if (!in_array($imageFileType, $allowed_extensions)) {
    echo json_encode(["message" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."]);
    exit();
}

// Move uploaded file to target directory
if (move_uploaded_file($miniature["tmp_name"], $target_file)) {
    // File uploaded successfully, proceed to insert data into database
    $miniature_path = "public/Cover/" . basename($miniature["name"]);

    // Convert id_sujet array to comma-separated string
    $id_sujet_str = implode(",", $id_sujet);

    // Convert langues array to comma-separated string
    $langues_str = implode(",", $langues);

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO cours (Nom_du_cours, Description, Niveau_scolaire, Miniature, price, tag, langue, ID_Sujet, ID_Enseignant) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssissid", $nom_du_cours, $description, $niveau_scolaire, $miniature_path, $price, $tag, $langues_str, $id_sujet_str, $id_enseignant);

    // Execute SQL statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Course created successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $stmt->error]);
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["message" => "Sorry, there was an error uploading your file."]);
}

ob_end_flush();
?>
