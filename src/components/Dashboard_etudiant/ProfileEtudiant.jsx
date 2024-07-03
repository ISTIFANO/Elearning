import React, { useState, useEffect } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function ProfileEtudiant() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student ID from cookie
    const studentId = getCookie('userId'); // Replace 'studentId' with your actual cookie name

    // Fetch student data from server
    fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard/Profile.php?studentId=${studentId}`)
      .then(response => response.json())
      .then(data => {
        setStudent(data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
      <div className="flex justify-end">
        <button className="text-zinc-500 dark:text-zinc-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z" />
          </svg>
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">Student Profile</h2>
        <div className="mt-4">
          <img className="w-24 h-24 rounded-full mx-auto" src={student.Profil_img || 'https://placehold.co/100x100'} alt="Profile Picture" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-zinc-800 dark:text-white">{`${student.Nom} ${student.Prénom}`}</h3>
        <p className="text-zinc-600 dark:text-zinc-400">{student.email}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{student.Num_téléphone}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{student.Adresse}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{student.Date_de_naissance}</p>
    
      </div>
    </div>
  );
}

export default ProfileEtudiant;
