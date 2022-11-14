import React from 'react'
// import Hero from '../components/Hero'
// import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import defaultImg from "../images/room-1.jpeg"
// import PropTypes from "prop-types";


export default function Card({id , name, route, image}) {

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={image || defaultImg} alt="single room" />
        {/* <div className='price-top'>
          <h6>${price}</h6>
          <p>per night</p>
        </div> */}
        <Link to={route}
          className="btn-primary room-link">
          Enter
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


// import React from 'react';
// import { Link } from "react-router-dom";

// const Card = ({id , name}) => {

//     return (
//         <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
//         <Link to={
//                 {     
//                     pathname: '/category',
//                     catrgory:"Lior"
//                 }
//             }>
//             <img alt='robots' src={`https://robohash.org/${id}?150x150`}/>
//             <div>
//                 <h2>{name}</h2>
//                 {/* <p>{email}</p> */}
//             </div>

//         </Link>
//         </div>
//     )
// }

// export default Card;