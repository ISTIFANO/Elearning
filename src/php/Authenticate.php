
<?php
 // Headers to allow CORS requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
$connexion = mysqli_connect("localhost", "root", "", "e-learning");
if (!$connexion) {
    die("Connection failed: " . mysqli_connect_error());
}

  
    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = $data['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM etudiant WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $stored_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && $password === $stored_password) {
        // Authentication successful
        echo json_encode(["status" => "success", "message" => "Login successful"]);
    } else {
        // Authentication failed
        echo json_encode(["status" => "error", "message" => "Incorrect email or password"]);
    }

    $stmt->close();
    $conn->close();
    ?>