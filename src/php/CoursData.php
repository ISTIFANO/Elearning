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

$req = "
    SELECT cours.*, enseignant.nom AS Nom_Enseignant 
    FROM cours 
    JOIN enseignant ON cours.ID_Enseignant = enseignant.ID_Enseignant
";

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
