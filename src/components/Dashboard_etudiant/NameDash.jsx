import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function NameDash() {
  const [student, setStudent] = useState({});

  useEffect(() => {
    // Fetch student ID from cookie
    const studentId = getCookie('userId'); // Ensure this matches your cookie name

    if (studentId) {
      // Fetch student's information
      fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard/NameDash.php?studentId=${studentId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setStudent(data);
        })
        .catch(error => {
          console.error('Error fetching student information:', error);
        });
    }
  }, []);

  return (
    <Link to="/Dashboard">
    <div className="flex items-center space-x-4">
         <p className="hidden text-3xl md:block">{student.Nom}</p>
      <img className="w-8 rounded-full" src={student.Profil_img || 'https://placehold.co/100x100'} alt="etudiant" />
    
    </div>
    </Link>
  );
}

export default NameDash;
