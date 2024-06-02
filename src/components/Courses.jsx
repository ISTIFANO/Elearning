import React from 'react'
import CourseCard from './CourseCard'
import { courses } from '../data/courses'
import Slider from 'react-slick'

const Courses = () => {
  // Configuration des paramètres du slider
  var settings = {
    dots: true, // Afficher les points indicateurs
    infinite: false, // Pas de défilement infini
    speed: 500, // Vitesse de transition
    slidesToShow: 4, // Nombre de cartes affichées à la fois
    slidesToScroll: 1, // Nombre de cartes à faire défiler à la fois
    responsive: [
      {
        breakpoint: 1024, // Point de rupture pour les écrans de 1024px et moins
        settings: {
          slidesToShow: 2, // Réduire le nombre de cartes affichées à 2
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600, // Point de rupture pour les écrans de 600px et moins
        settings: {
          slidesToShow: 1, // Réduire le nombre de cartes affichées à 1
          slidesToScroll: 2, // Faire défiler 2 cartes à la fois
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 400, // Point de rupture pour les écrans de 400px et moins
        settings: {
          slidesToShow: 1, // Afficher une seule carte à la fois
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
    ]
  }

  return (
    <section className='w-full bg-white py-24 p-4'>
      <div className='md:max-w-[1100px] m-auto max-w-[400px]'>
        <h1 className='py-4 text-3xl font-bold'>Cours les plus populaires <span className='text-[#20B486]'> </span></h1>
        <p className='text-[#6D737A] py-3'>Plusieurs versions ont évolué au fil des ans, parfois par accident.</p>
      </div>
      <div className='md:max-w-[1100px] m-auto max-w-[400px] gap-5'>
        {/* Utilisation du composant Slider avec les paramètres configurés */}
        <Slider {...settings} className='px-5'>
          {/* Mapping sur la liste de cours pour afficher chaque carte */}
          {courses && courses.map((course) => (
            <CourseCard key={course.id} title={course.title} category={course.category} rating={course.rating} price={course.price} linkImg={course.linkImg} />
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Courses
