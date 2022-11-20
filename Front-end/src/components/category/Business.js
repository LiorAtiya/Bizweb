import React from 'react'
// import Hero from '../components/Hero'
// import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import defaultImg from "../../images/room-1.jpeg"
// import PropTypes from "prop-types";

//Card of business from some category
export default function Business({ business }) {
  const { category, name, description, location } = business;

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={defaultImg} alt="single room" />
        {/* <div className='price-top'>
          <h6>${price}</h6>
          <p>per night</p>
        </div> */}
        <Link to={`/business/${name}`}
          className="btn-primary room-link">
          Features
        </Link>
        <p className='room-info'>{name}</p>
      </div>
    </article>
    // <Hero hero="roomsHero">
    //   <Banner title={category}>
    //     <Link to="/" className='btn-primary'>Return home</Link>
    //   </Banner>
    // </Hero>
  )
}

// //Checks if the props is passed
// Business.propTypes = {
//   business: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     images: PropTypes.arrayOf(PropTypes.string).isRequired,
//     price: PropTypes.number.isRequired
//   })
// }