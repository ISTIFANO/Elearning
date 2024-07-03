<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, PUT, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "root";
$pass = "";
$db = "e-learning";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get the student ID from the request
$studentId = $_GET['studentId'];

if (isset($studentId)) {
    // Prepare and bind
    $stmt = $conn->prepare("
        SELECT cours.*
        FROM participer
        JOIN cours ON participer.ID_Cours = cours.ID_Cours
        WHERE participer.ID_Etudiant = ?
    ");
    $stmt->bind_param("i", $studentId);

    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch data and store in an array
    $courses = array();
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }

    // Return the data as JSON
    echo json_encode($courses);

    // Close statement and connection
    $stmt->close();
} else {
    echo json_encode(array("error" => "Student ID not provided"));
}

$conn->close();
?>
