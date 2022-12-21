import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from "../../images/defaultImg.png"


export default function CategoryCard({id , name, route, image}) {

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={image || defaultImg} alt="single room" />
        <Link to={route}
          className="btn-primary room-link">
          Enter
        </Link>
        <p className='room-info'>{name}</p>
      </div>
    </article>
  )
}