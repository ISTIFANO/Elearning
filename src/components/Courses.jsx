import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Slider settings configuration
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            }
        ]
    };

    useEffect(() => {
        // Fetch data from the PHP endpoint
        fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Enseignant/CoursesData2.php') // Replace with your actual endpoint
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <section className='w-full bg-white py-24 p-4'>
            <div className='md:max-w-[1100px] m-auto max-w-[400px]'>
                <h1 className='py-4 text-3xl font-bold'>Cours les plus populaires <span className='text-[#20B486]'></span></h1>
                <p className='text-[#6D737A] py-3'>Plusieurs versions ont évolué au fil des ans, parfois par accident.</p>
            </div>
            <div className='md:max-w-[1100px] m-auto max-w-[400px] gap-5'>
                {/* Slider component with configured settings */}
                <Slider {...sliderSettings} className='px-5'>
                    {/* Mapping over the courses to display each course card */}
                    {courses.map(course => (
                        <div key={course.ID_Cours} className='course-card group relative p-4 bg-card rounded-lg shadow-md'>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={course.Miniature || 'https://placehold.co/300x200'}
                                    alt={course.Nom_du_cours}
                                    className='w-full h-40 object-cover rounded-lg'
                                />
                                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white'
                                    style={{ transition: 'opacity 0.3s ease' }}>
                                    <img
                                        src={course.img_enseignée || 'https://placehold.co/150x150'}
                                        alt={`${course.enseignant_nom} ${course.enseignant_prenom}`}
                                        className='rounded-full w-24 h-24 object-cover'
                                    />
                                       <p>{course.enseignant_nom} {course.enseignant_prenom}, {course.Matière_enseignée}</p>
                                </div>
                            </div>
                            <h3 className='mt-4 text-lg font-semibold text-foreground'>{course.Nom_du_cours}</h3>
                            <p className='text-muted-foreground'>{course.cours_description} {course.enseignant_prenom}, {course.Matière_enseignée}</p>
                            <div className='flex items-center mt-2'>
                                <span className='text-primary font-bold'>4.5</span>
                                <span className='text-primary ml-1'>★</span>
                                <span className='text-muted-foreground ml-2'>(35)</span>
                            </div>
                            <p className='mt-2 text-primary-foreground'>${course.price}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default Courses;
