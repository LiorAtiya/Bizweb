import React from 'react';
import { Link } from "react-router-dom";

const Card = ({id , name}) => {

    return (
        <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
        <Link to={
                {     
                    pathname: '/category',
                    catrgory:"Lior"
                }
            }>
            <img alt='robots' src={`https://robohash.org/${id}?150x150`}/>
            <div>
                <h2>{name}</h2>
                {/* <p>{email}</p> */}
            </div>

        </Link>
        </div>
    )
}

export default Card;