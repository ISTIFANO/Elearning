<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$connexion = mysqli_connect("localhost", "root", "", "e-learning");

if (!$connexion) {
    die("Connection failed: " . mysqli_connect_error());
}

$input = json_decode(file_get_contents('php://input'), true);
$courseId = $input['courseId'];

$sql = "DELETE FROM cours WHERE ID_Cours = ?";
$stmt = $connexion->prepare($sql);
$stmt->bind_param("i", $courseId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Course deleted successfully"]);
} else {
    echo json_encode(["message" => "Error deleting course"]);
}

$stmt->close();
$connexion->close();
?>
