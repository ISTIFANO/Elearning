<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "e-learning";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($conn->connect_error) {
        die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
    }

    if ($email === 'Elamiri.Aamir@admin.com' && $password === 'manhaj') {
        echo json_encode(['status' => 'success', 'redirect' => 'http://localhost:5173/Dashboard_Admin']);
    } else {
        // Check if the email exists in the enseignant table
        $sql = "SELECT * FROM enseignant WHERE Adresse_électronique = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['status' => 'success', 'redirect' => 'http://localhost:5173/Dashboard_Enseignant']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
        }

        $stmt->close();
    }

    $conn->close();
}
?>
