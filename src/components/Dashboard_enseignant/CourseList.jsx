import React, { useEffect, useState } from 'react';
import EnseignantInfo from './EnseignantInfo';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    // Function to get a cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Get the userId from the cookie
    const userId = getCookie('userId');

    // Fetch courses for the given teacher
    async function fetchCourses() {
        try {
            const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Enseignant/CoursesData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Unable to fetch courses.');
            return [];
        }
    }

    // Delete a course
    async function deleteCourse(courseId) {
        try {
            const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Enseignant/DeleteCourse.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseId })
            });
            const result = await response.json();
            if (response.ok) {
                setCourses(courses.filter(course => course.ID_Cours !== courseId));
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Error deleting course');
        }
    }

    useEffect(() => {
        async function getCourses() {
            const data = await fetchCourses();
            setCourses(data);
        }

        getCourses();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <EnseignantInfo />
                <div className="md:w-2/3">
                    {error && <p>{error}</p>}
                    <h3 className="text-xl font-semibold">Cours avec le même tag ({courses.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {courses.map(course => (
                            <div key={course.ID_Cours} className="border p-4 rounded">
                                <img src={course.Miniature} alt="Course Image" className="w-full h-48 object-cover rounded" />
                                <h4 className="mt-4 font-semibold">{course.Nom_du_cours}</h4>
                                <p className="text-zinc-500">{course.Description}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500">★★★★☆</span>
                                    <span className="ml-2 text-zinc-500">(Nombre d'avis)</span>
                                </div>
                                <p className="text-zinc-500 mt-1">{course.Niveau_scolaire}</p>
                                <p className="text-lg font-bold mt-2">{course.price}</p>
                                {course.Bestseller && <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mt-1">Bestseller</span>}
                                <button 
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => deleteCourse(course.ID_Cours)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseList;
