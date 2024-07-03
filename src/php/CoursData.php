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

$input = json_decode(file_get_contents("php://input"), true);
$titleOrDescription = isset($input['titleOrDescription']) ? mysqli_real_escape_string($connexion, $input['titleOrDescription']) : '';
$tag = isset($input['tag']) ? mysqli_real_escape_string($connexion, $input['tag']) : '';

$req = "
    SELECT cours.*, enseignant.nom AS Nom_Enseignant 
    FROM cours 
    JOIN enseignant ON cours.ID_Enseignant = enseignant.ID_Enseignant
    WHERE 1
";

if (!empty($titleOrDescription)) {
    $req .= " AND (cours.Nom_du_cours LIKE '%$titleOrDescription%' OR cours.Description LIKE '%$titleOrDescription%')";
}

if (!empty($tag)) {
    $req .= " AND cours.tag LIKE '%$tag%'";
}

$result = mysqli_query($connexion, $req);

$data = array();
if ($result) {
    while ($ligne = mysqli_fetch_assoc($result)) {
        $data[] = $ligne;
    }
    echo json_encode($data);
} else {
    echo json_encode(array("error" => mysqli_error($connexion)));
}

mysqli_close($connexion);
?>
