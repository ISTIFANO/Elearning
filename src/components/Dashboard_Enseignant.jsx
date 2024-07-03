import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile_enseignant from './Dashboard_enseignant/Profile_enseignant';
import CourseList from './Dashboard_enseignant/CourseList';
import UploadVideo from './Dashboard_enseignant/UploadVideo';
import UploadCourse from './Dashboard_enseignant/UploadCourse';
import ParticiperCours from './Dashboard_enseignant/ParticiperCours';
import NameDash from './Dashboard_enseignant/NameDash';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaUserGraduate } from 'react-icons/fa';
// import Navbar from './Navbar';
// import Footer from './Footer';
import { Link } from 'react-router-dom';

function Dashboard_Enseignant() {
    const [currentView, setCurrentView] = useState('All Courses');
    const navigate = useNavigate();

    // Function to get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        const userId = getCookie('userId');

        const checkAuth = async () => {
            try {
                const response = await axios.get(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Middleware.php?token=${userId}`);
                if (response.data.status === "not_valid") {
                    navigate("/Login");
                }
            } catch (error) {
                navigate("/Login");
            }
        };

        if (userId) {
            checkAuth();
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    const renderContent = () => {
        switch (currentView) {
            case 'Home':
                return <ParticiperCours/>;
            case 'Profile':
                return <Profile_enseignant />;
            case 'My Course':
                return <CourseList />;
            case 'UploadVideo':
                return <UploadVideo />;
            case 'Setting':
                return <UploadCourse className="w-96" />;
            default:
                return <h1 className="my-6 text-3xl">All Courses</h1>;
        }
    };

    return (
        <>
            <div className="flex bg-white">
                <div className="md:flex w-3/6 md:w-1/4 h-screen bg-white border-r hidden">
                    <div className="mx-auto py-10">
                        <h1 className="text-2xl font-bold mb-10 cursor-pointer text-[#219ebc] duration-150">Manhaj</h1>
                        <ul>
                        <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Home')}>
        <FaUserGraduate className="h-6 w-6" />
        <span className="font-semibold">étudiants</span>
    </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('My Course')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                                <span className="font-semibold">Courses</span>
                            </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Profile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-semibold">Profile</span>
                            </li>
                            <li className="flex items-center space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('UploadVideo')}>
            <AiOutlineUpload className="h-6 w-6 text-gray-600" />
            <span className="font-semibold">Upload Videos</span>
        </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Setting')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <span className="font-semibold">Upload Courses</span>
                            </li>
                            <button className="w-full mt-10 bg-[#219ebc] rounded-full py-1.5 text-white">
  <Link to="/" className="block max-w-[780px] w-full mx-auto">
    Learn
  </Link>
</button>
                        </ul>
                    </div>
                </div>
                <div className="min-h-screen w-full bg-white border-l">
                    <nav className="flex items-center justify-between px-10 bg-white py-6 border-b">
                       
                         
                      
                    <NameDash/>
                    </nav>
                    <div className="mx-6">
                        {renderContent()}
                    </div>
                    <div className="mx-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-10">
                        <div className="shadow-lg rounded-t-md overflow-hidden">
                            {/* Add your content here */}
                        </div>
                    </div>
                </div>
            </div>
          
        </>
    );
}

export default Dashboard_Enseignant;
