<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection (adjust with your own credentials)
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

// Select reclamations from the table
$sql = "SELECT * FROM reclamations";
$result = $conn->query($sql);

$reclamations = array();

if ($result->num_rows > 0) {
    // Fetch data from each row
    while ($row = $result->fetch_assoc()) {
        $reclamations[] = $row;
    }
}

// Output reclamations as JSON
echo json_encode($reclamations);

// Close database connection
$conn->close();
?>
