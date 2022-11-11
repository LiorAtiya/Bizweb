import React, { Component } from 'react'
import defaultBcg from "../images/room-1.jpeg"
import { BusinessContext } from "../context"
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import StyledHero from '../components/StyledHero'

export default class SingleBusiness extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }

  static contextType = BusinessContext;

  render() {
    const { getBusiness } = this.context;
    const business = getBusiness(this.state.slug)
    if (!business) {
      return (
        <div className='error'>
          <h3>no such business could be found...</h3>
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      )
    }
    const { name, description, capacity, size, price, extras,
      breakfast, pets, images } = business;
    
    const [mainImg, ...defaultImg] = images

    return (
      <>
      <StyledHero img={images[0] || this.state.defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to='/' className='btn-primary'>
            Back to home
          </Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImg.map((item,index) => {
            return <img key={index} src={item} alt={name}/>
          })}
        </div>
        <div className='single-room-info'>
        <article className='desc'>
          <h3>details</h3>
          <p>{description}</p>
        </article>
        <article className='info'>
          <h3>info</h3>
          <h6>price : ${price}</h6>
          <h6>
            max capacity : {" "}
            {capacity > 1 ? `${capacity} people` : `${capacity} person `}
          </h6>
          <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
          <h6>{breakfast && "free breakfast included"}</h6>
        </article>
        </div>
      </section>
      <section className='room-extras'>
          <h6>extras</h6>
          <ul className='extras'>
          {extras.map((item, index) => {
            return <li key={index}>- {item}</li>
          })}
          </ul>
      </section>
      </>
    )
  }
}
