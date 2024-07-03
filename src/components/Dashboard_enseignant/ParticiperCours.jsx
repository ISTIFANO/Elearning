import React, { useEffect, useState } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function ParticiperCours() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch teacher ID from cookie
    const teacherId = getCookie('userId'); // Ensure this matches your cookie name

    // Example fetch call to fetch students participating in courses taught by the teacher
    fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/ParticiperCours.php?teacherId=${teacherId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Remove duplicate students
        const uniqueStudents = Array.from(new Set(data.map(student => student.ID_Etudiant)))
          .map(id => data.find(student => student.ID_Etudiant === id));

        // Update state with unique students
        setStudents(uniqueStudents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleDelete = (studentId) => {
    fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/DeleteParticipant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentId })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        setStudents(prevStudents => prevStudents.filter(student => student.ID_Etudiant !== studentId));
      } else {
        console.error('Error deleting participant:', data.message);
      }
    })
    .catch(error => {
      console.error('Error deleting participant:', error);
    });
  };

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {students.map(student => (
        <div key={student.ID_Etudiant} className="bg-card p-4 rounded-lg shadow-md flex flex-col items-center">
          <img src={student.Profil_img || `https://placehold.co/100x100?text=${student.Nom}`} alt="profile picture" className="rounded-full mb-4" />
          <h2 className="text-lg font-semibold text-card-foreground">{`${student.Nom} ${student.Prénom}`}</h2>
          <p className="text-muted-foreground">{student.email}</p>
          <p className="text-muted-foreground">{student.Num_téléphone}</p>
          <p className="text-muted-foreground">{student.Adresse}</p>
          <p className="text-muted-foreground">Étudiant</p>
          <button onClick={() => handleDelete(student.ID_Etudiant)} className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-red-300 py-2 px-4 rounded">Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default ParticiperCours;
