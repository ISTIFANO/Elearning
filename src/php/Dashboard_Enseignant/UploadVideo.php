<?php
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

// Check if the request method is POST
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file is uploaded
//  '   if (isset($_FILES['Path']) && $_FILES['Path']['error'] === UPLOAD_ERR_OK) {'
        // Get file details
        $fileTmpPath = $_FILES['Path']['tmp_name'];
        $fileName = $_FILES['Path']['name'];
        $fileSize = $_FILES['Path']['size'];
        $fileType = $_FILES['Path']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Define the allowed file extensions
        $allowedfileExtensions = array('mp4', 'avi', 'mov', 'wmv');

        if (in_array($fileExtension, $allowedfileExtensions)) {
            // Directory to save the uploaded file
            $uploadFileDir = '/public/Courses/';
            $dest_path = $uploadFileDir . $fileName;

            // Move the file to the specified directory
            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                // Prepare the data to be inserted into the database
                $ID_video = $_POST['ID_video'];
                $Titre = $_POST['Titre'];
                $Path = $dest_path;
                $Duree = $_POST['Duree'];
                $Description = $_POST['Description'];
                $Rating = $_POST['Rating'];
                $ID_Cours = $_POST['ID_Cours'];

                // Insert the data into the database
                $sql = "INSERT INTO video (ID_video, Titre, Path, Duree, Description, Rating, ID_Cours)
                        VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql); 
                // ID_video	
                // Titre	
                // Path	
                // Duree	
                // Description	
                // Rating	
                // ID_Cours
                $stmt->bind_param("issisii", $ID_video, $Titre, $Path, $Duree, $Description, $Rating, $ID_Cours);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Video uploaded and data inserted successfully"]);
                } else {
                    echo json_encode(["success" => false, "error" => "Failed to insert data into the database"]);
                }

                $stmt->close();
            } else {
                echo json_encode(["success" => false, "error" => "Failed to move the uploaded file"]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Upload failed. Allowed file types: " . implode(',', $allowedfileExtensions)]);
        }
//     } else {
//         echo json_encode(["success" => false, "error" => "No file uploaded or there was an upload error"]);
//     }
// // } else {
//     echo json_encode(["success" => false, "error" => "Invalid request method"]);
// }

$conn->close();
?>
