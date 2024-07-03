<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400'); // cache for 1 day
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Allow preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Get POST data from JSON payload
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

// Validate input data
if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email or password not provided"]);
    exit();
}

// Check for admin credentials
function checkAdminLogin($email, $password) {
    $adminEmail = "Elamiri.Aamir@Admin.com";
    $adminPassword = "12115215";

    if ($email === $adminEmail && $password === $adminPassword) {
        return true;
    }
    return false;
}

// Function to check student login credentials
function checkStudentLogin($email, $password) {
    $servername = "localhost";
    $username = "root";
    $passwordU = "";
    $dbname = "e-learning";

    try {
        // Create database connection
        $conn = new mysqli($servername, $username, $passwordU, $dbname);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        // Escape input to prevent SQL injection
        $email = $conn->real_escape_string($email);

        // Prepare and execute query to check student credentials
        $query = "SELECT ID_Etudiant, password, email FROM etudiant WHERE email = '$email'";
        $result = $conn->query($query);

        // Verify password if user found
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $stored_password = $row['password'];

            if ($stored_password == $password) {
                return $row['ID_Etudiant'];
            }
        }
        return false;
    } catch (Exception $e) {
        return false;
    }
}

// Function to check teacher login credentials
function checkTeacherLogin($email, $password) {
    $servername = "localhost";
    $username = "root";
    $passwordU = "";
    $dbname = "e-learning";

    try {
        // Create database connection
        $conn = new mysqli($servername, $username, $passwordU, $dbname);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        // Escape input to prevent SQL injection
        $email = $conn->real_escape_string($email);

        // Prepare and execute query to check teacher credentials
        $query = "SELECT ID_Enseignant, password, Adresse_électronique FROM enseignant WHERE Adresse_électronique = '$email'";
        $result = $conn->query($query);

        // Verify password if user found
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $stored_password = $row['password'];

            if ($stored_password == $password) {
                return $row['ID_Enseignant'];
            }
        }
        return false;
    } catch (Exception $e) {
        return false;
    }
}

// Function to authenticate user (student, teacher, or admin)
function authenticateUser($email, $password) {
    if (checkAdminLogin($email, $password)) {
        return ["status" => "success", "message" => "Login successful", "userId" => 1, "userType" => "admin"];
    }

    $studentID = checkStudentLogin($email, $password);
    if ($studentID !== false) {
        return ["status" => "success", "message" => "Login successful", "userId" => $studentID, "userType" => "student"];
    }

    $teacherID = checkTeacherLogin($email, $password);
    if ($teacherID !== false) {
        return ["status" => "success", "message" => "Login successful", "userId" => $teacherID, "userType" => "teacher"];
    }

    return ["status" => "error", "message" => "Incorrect email or password"];
}

// Process login request
$result = authenticateUser($email, $password);
echo json_encode($result);
?>
