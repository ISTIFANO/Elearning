<?php
// Connexion à la base de données MySQL (exemple avec MySQLi)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost", "root", "", "e-learning");

if (!$conn) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}

// Fonction pour récupérer les compteurs
function getStatistics($conn) {
    // Table 'cours'
    $sqlCourses = "SELECT COUNT(*) AS count FROM cours";
    $resultCourses = $conn->query($sqlCourses);
    $coursesCount = $resultCourses->fetch_assoc()['count'];

    // Table 'enseignant'
    $sqlTeachers = "SELECT COUNT(*) AS count FROM enseignant";
    $resultTeachers = $conn->query($sqlTeachers);
    $teachersCount = $resultTeachers->fetch_assoc()['count'];

    // Table 'etudiant'
    $sqlStudents = "SELECT COUNT(*) AS count FROM etudiant";
    $resultStudents = $conn->query($sqlStudents);
    $studentsCount = $resultStudents->fetch_assoc()['count'];

    // Table 'video'
    $sqlVideos = "SELECT COUNT(*) AS count FROM video";
    $resultVideos = $conn->query($sqlVideos);
    $videosCount = $resultVideos->fetch_assoc()['count'];

    // Retourner les compteurs sous forme de tableau associatif
    return array(
        'coursesCount' => $coursesCount,
        'teachersCount' => $teachersCount,
        'studentsCount' => $studentsCount,
        'videosCount' => $videosCount
    );
}

// Récupérer les statistiques
$statistics = getStatistics($conn);

// Retourner les statistiques au format JSON
header('Content-Type: application/json');
echo json_encode($statistics);

// Fermer la connexion à la base de données
$conn->close();
?>
