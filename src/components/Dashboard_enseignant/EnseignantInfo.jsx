import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function EnseignantInfo() {
  const [enseignant, setEnseignant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnseignantInfo = async () => {
      try {
        const userId = getCookie('userId');
        const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/EnseignantInfo.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ID_Enseignant: userId }),
        });
        const data = await response.json();
        if (response.ok) {
          setEnseignant(data);
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success',
          //   text: 'Enseignant information loaded successfully!',
          // });
        } else {
          setError(data.error || 'Failed to fetch data');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.error || 'Failed to fetch data',
          });
        }
      } catch (err) {
        setError('Failed to fetch data');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch data',
        });
      }
    };

    fetchEnseignantInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!enseignant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center md:w-1/4 p-4 bg-secondary text-secondary-foreground rounded-lg">
      <img src={enseignant.img_enseignée} alt="Profile Picture" className="rounded-full mb-4" />
      <h2 className="text-lg font-semibold mb-2">{enseignant.Nom} {enseignant.Prénom}</h2>
      <p className="text-sm mb-4">{enseignant.Adresse_électronique}</p>
      <div className="text-left w-full">
        <p className="mb-2">Matière enseignée: <span className="text-primary">{enseignant.Matière_enseignée}</span></p>
        <p className="mb-2">Numéro de téléphone: <span className="text-primary">{enseignant.Numéro_de_téléphone}</span></p>
        <p className="mb-2">Total Courses Created: <span className="text-primary">{enseignant.total_courses}</span></p>
        <p className="mb-4">Total Students Participating: <span className="text-primary">{enseignant.total_students}</span></p>
        <p className="mb-4">{enseignant.Description}</p>
        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-lg w-full mb-4">View Public Profile</button>
      </div>
    </div>
  );
}

export default EnseignantInfo;
