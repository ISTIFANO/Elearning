<?php
// Connexion à la base de données
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");

$connexion = mysqli_connect("localhost", "root", "", "e-learning");

if (!$connexion) {
    die("Connection failed: " . mysqli_connect_error());
}


// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and assign form inputs to variables
    $titleOrDescription = sanitize_input($_POST["titleOrDescription"]);
    $tag = sanitize_input($_POST["tag"]);
    $language = sanitize_input($_POST["language"]);
    $level = sanitize_input($_POST["level"]);
    $price = sanitize_input($_POST["price"]);
    $teacher = sanitize_input($_POST["teacher"]);
    $email = sanitize_input($_POST["email"]);
    $sortBy = sanitize_input($_POST["sortBy"]);

    // Construct the SQL query based on the form inputs
    $sql = "SELECT * FROM cours WHERE 1=1"; // Start with a basic query

    if (!empty($titleOrDescription)) {
        $sql .= " AND (Description LIKE '%$titleOrDescription%' OR title LIKE '%$titleOrDescription%')";
    }

    if (!empty($tag)) {
        $sql .= " AND tag = '$tag'";
    }

    if ($language != "Select Language") {
        $sql .= " AND langue = '$language'";
    }

    if ($level != "Select Level") {
        $sql .= " AND Niveau_scolaire = '$level'";
    }

    if ($price != "Select Price") {
        if ($price == "Free") {
            $sql .= " AND price = 0";
        } else {
            // Assuming $, $$, $$$ represents different price ranges
            $sql .= " AND price = '$price'";
        }
    }

    if (!empty($teacher)) {
        $sql .= " AND teacher = '$teacher'";
    }

    if (!empty($email)) {
        $sql .= " AND email = '$email'";
    }

    switch ($sortBy) {
        case "Top Rated":
            $sql .= " ORDER BY rating DESC";
            break;
        case "Most Popular":
            $sql .= " ORDER BY popularity DESC";
            break;
        case "Fresh":
            $sql .= " ORDER BY created_at DESC";
            break;
        default:
            // No sorting specified, do nothing
            break;
    }

    // Execute the query
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            // Output the course data
            echo "ID: " . $row["ID_Sujet"]. " - Description: " . $row["Description"]. " - Niveau_scolaire: " . $row["Niveau_scolaire"]. " - Price: " . $row["price"]. " - Tag: " . $row["tag"]. " - Language: " . $row["langue"]. "<br>";
        }
    } else {
        echo "0 results";
    }

    $conn->close();
}

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
