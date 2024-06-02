import React from 'react'
import Rating from './Rating'
import blog1 from '../assets/blog-1.png'

const CourseCard = ({title, category, rating, price, linkImg}) => {
  return (
    <div className='bg-white drop-shadow-md overflow-hidden my-4 mr-2'>
      {/* Image du cours */}
      <img src={linkImg} alt="courses" className='h-40 w-full object-cover'/>
      {/* Contenu du cours */}
      <div className='p-5'>
          {/* Titre du cours */}
          <h1 className='py-2 truncate'>{title}</h1>
          {/* Composant de notation */}
          <Rating rating={rating}/>
      </div>
      {/* Prix du cours */}
      <h3 className='p-5 text-xl bottom-0'>{price}</h3>
      {/* Catégorie du cours */}
      <div className='absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
          {category}
      </div>
    </div>
  )
}

export default CourseCard 
