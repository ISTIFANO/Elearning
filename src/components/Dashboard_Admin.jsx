import React, { useState } from 'react';
import Loginimg from '../assets/Loginimg.jpg';

import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
function Dashboard_Admin() {
    const [currentView, setCurrentView] = useState('All Courses');

    const renderContent = () => {
        switch (currentView) {
            case 'Home':
                return <h1 className="my-6 text-3xl">Home</h1>;
                case 'Profile':
                    return <h1 className="my-6 text-3xl">Profile</h1>;
            case 'My Course':
                return <h1 className="my-6 text-3xl">All Enseignant</h1>;
          
            case 'Setting':
                return <h1 className="my-6 text-3xl">Setting</h1>;
            default:
                return <h1 className="my-6 text-3xl">All Courses</h1>;
        }
    };

    return (
        <>
         <Navbar/>
            <div className="flex bg-white">
                <div className="md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden">
                    <div className="mx-auto py-10">
                        <h1 className="text-2xl font-bold mb-10 cursor-pointer text-[#219ebc] duration-150">Manhaj</h1>
                        <ul>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Home')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="font-semibold">Home</span>
                            </li>
                           
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('All Enseignant')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                                <span className="font-semibold">My Course</span>
                            </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Profile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-semibold">Profile</span>
                            </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Setting')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <span className="font-semibold">Setting</span>
                            </li>
                            <button className="w-full mt-10 bg-[#219ebc] rounded-full py-1.5 text-white">Learn</button>
                        </ul>
                    </div>
                </div>
                <div className="min-h-screen w-full bg-white border-l">
                    <nav className="flex items-center justify-between px-10 bg-white py-6 border-b">
                        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-96">
                            <input type="text" placeholder="search" className="bg-gray-100 outline-none w-full" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img className="w-8 rounded-full" src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg" alt="Elon Musk" />
                            <p className="hidden md:block">Aamir El amiri</p>
                        </div>
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
            <Footer/>
        </>
    );
}

export default Dashboard_Admin;
