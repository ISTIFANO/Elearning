import React, { useEffect, useState } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function NameDash() {
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    // Fetch teacher ID from cookie
    const teacherId = getCookie('userId'); // Ensure this matches your cookie name

    if (teacherId) {
      // Fetch teacher's information
      fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/NameDash.php?teacherId=${teacherId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setTeacher(data);
        })
        .catch(error => {
          console.error('Error fetching teacher information:', error);
        });
    }
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <img className="w-8 rounded-full" src={teacher.img_enseignée  } alt="Teacher" />
      <p className="hidden text-3xl md:block">{teacher.Nom}</p>
    </div>
  );
}

export default NameDash;
