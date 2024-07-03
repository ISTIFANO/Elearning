import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
// import Filter from "./Filter";
import Swal from 'sweetalert2'; // Import SweetAlert2
// import './Cours.css'; // Import CSS file for styles
import Middleware from './Dashboard_enseignant/Middleware';

export default function Cours() {
    // Function to get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    
    const userId = getCookie('userId'); // Get userId from cookie
    const [data, setData] = useState([]);
    const { id } = useParams(); // Access the ID passed in the URL
    const [filters, setFilters] = useState({
        titleOrDescription: '',
        tag: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = (filters = {}) => {
        axios.post('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/CoursData.php', filters)
            .then(response => {
                setData(response.data); // Assuming response.data is an array of course objects
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchCourses(filters);
    };

    const handleFilterReset = () => {
        setFilters({
            titleOrDescription: '',
            tag: ''
        });
        fetchCourses();
    };

    const handleParticipation = (courseId) => {
        axios.post('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard/MyCourse.php', {
            courseId: courseId,
            studentId: userId,
             // Send userId retrieved from cookie
        }
    )
        .then(response => {
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Participation recorded successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Failed to record participation.',
                });
            }
        })
        .catch(error => {
            console.error('Error participating in course:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred.',
            });
        });
    };

    return (
        <>
        <Middleware/>
            <Navbar />
            <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 p-4">
                <div className="max-w-7xl mx-auto">
                    <header className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            📚 Courses: Index
                            <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm ml-2">{data.length}</span>
                        </h1>
                    </header>
                    <div className="flex flex-col lg:flex-row">
                        <aside className="w-full lg:w-1/4 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Filters</h2>
                            <form className="space-y-4" onSubmit={handleFilterSubmit} onReset={handleFilterReset}>
                                <div>
                                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Title or Description</label>
                                    <input 
                                        type="text" 
                                        name="titleOrDescription"
                                        value={filters.titleOrDescription}
                                        onChange={handleFilterChange}
                                        className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Tag</label>
                                    <input 
                                        type="text" 
                                        name="tag"
                                        value={filters.tag}
                                        onChange={handleFilterChange}
                                        className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" 
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Search</button>
                                    <button type="reset" className="w-full bg-zinc-500 text-white p-2 rounded-lg">Unfilter</button>
                                </div>
                            </form>
                        </aside>
                        <main className="w-full lg:w-3/4 grid gap-4 ">
                            {data.map(course => (
                                <div className="space-y-4" key={course.ID_Cours}>
                                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row">
                                        <img
                                            src={course.Miniature || "https://placehold.co/150x100"}
                                            alt="Course Image"
                                            className="w-full md:w-1/4 rounded-lg mb-4 md:mb-0 md:mr-4"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{course.Nom_du_cours}</h3>
                                            <p className="text-zinc-700 dark:text-zinc-300">{course.Description}</p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className="text-yellow-500">⭐ 4.65</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">(174)</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">|</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">{course.Niveau_scolaire}</span>
                                            </div>
                                            <div className="mt-2">
                                                <Link to={`/Tags/${course.tag}`} className="text-red-300">{course.tag}</Link>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-zinc-700 dark:text-zinc-300">by</span>
                                                <Link to={`/Enseignant/${Math.floor(course.ID_Enseignant)}`} className="text-blue-500">{course.Nom_Enseignant}</Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-end">
                                            <button 
                                                className="bg-green-500 text-white p-2 rounded-lg"
                                                onClick={() => handleParticipation(course.ID_Cours)}
                                            >
                                                Participer
                                            </button>
                                            <button className="bg-green-500 text-white p-2 rounded-lg">
                                                <Link to={`/ReadCources/${course.ID_Cours}`}>Regarder</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
