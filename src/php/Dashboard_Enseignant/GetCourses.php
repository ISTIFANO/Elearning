
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

$connexion = mysqli_connect("localhost", "root", "", "e-learning");

if (!$connexion) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action']) && $data['action'] === 'getCourses' && isset($data['ID_Enseignant'])) {
        $ID_Enseignant = mysqli_real_escape_string($connexion, $data['ID_Enseignant']);
        $sql = "SELECT * FROM cours WHERE ID_Enseignant = '$ID_Enseignant'";
        $result = mysqli_query($connexion, $sql);

        if (mysqli_num_rows($result) > 0) {
            $courses = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $courses[] = $row;
            }
            echo json_encode($courses);
        } else {
            echo json_encode([]);
        }
    } else {
        echo json_encode(["error" => "Invalid action or ID_Enseignant"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

mysqli_close($connexion);
?>
