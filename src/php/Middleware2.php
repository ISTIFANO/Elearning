<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost", "root", "", "e-learning");

if (!$conn) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the token (userId) from the query parameter
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM etudiant WHERE ID_Etudiant = ?");
    $stmt->bind_param("i", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any rows were returned
    if ($result->num_rows > 0) {
        // Token is valid
        $response = array("status" => "valid");
    } else {
        // Token is not valid
        $response = array("status" => "not_valid");
    }

    $stmt->close();
} else {
    // Token not provided
    $response = array("status" => "no_token");
}

$conn->close();

// Return the response as JSON
echo json_encode($response);
?>
