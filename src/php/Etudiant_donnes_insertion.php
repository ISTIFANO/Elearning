<?php
// Headers to allow CORS requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
$connexion = mysqli_connect("localhost", "root", "", "e-learning");

if (!$connexion) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . mysqli_connect_error()]));
}

// Get the raw POST data
$postData = file_get_contents("php://input");
$data = json_decode($postData, true);

// Check if required data is present
if (!isset($data['Nom']) || !isset($data['Prénom']) || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit();
}

// Assign data to variables
$Nom = $data['Nom'];
$Prénom = $data['Prénom'];
$email = $data['email'];
$password = $data['password'];

// Check if it's a regular sign-up or Google sign-up
if (isset($data['googleSignup']) && $data['googleSignup'] === true) {
    // Prepare SQL query for Google sign-up
    $sql = "INSERT INTO etudiant (Nom, Prénom, email) VALUES (?, ?, ?)";
    
    // Initialize and bind parameters for Google sign-up
    $stmt = $connexion->prepare($sql);
    $stmt->bind_param("sss", $Nom, $Prénom, $email);
    
    // Execute the query for Google sign-up
    if ($stmt->execute()) {
        $googleSignUpSuccess = true;
    } else {
        $googleSignUpSuccess = false;
    }
} else {
    // Prepare SQL query for regular sign-up
    $sql = "INSERT INTO etudiant (Nom, Prénom, email, password) VALUES (?, ?, ?, ?)";

    // Initialize and bind parameters for regular sign-up
    $stmt = $connexion->prepare($sql);
    $stmt->bind_param("ssss", $Nom, $Prénom, $email, $password);

    // Execute the query for regular sign-up
    if ($stmt->execute()) {
        $regularSignUpSuccess = true;
    } else {
        $regularSignUpSuccess = false;
    }
}

// Close the connection
$stmt->close();
$connexion->close();

if (isset($regularSignUpSuccess) && $regularSignUpSuccess) {
    echo json_encode(["success" => true, "message" => "New record created successfully"]);
} elseif (isset($googleSignUpSuccess) && $googleSignUpSuccess) {
    echo json_encode(["success" => true, "message" => "New record created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}
?>
