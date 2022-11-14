import React, { Component } from 'react'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import BusinessContainer from '../components/BusinessContainer'
import Hero from '../components/Hero'

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type,
    }
  }

  render() {
    return (
      <>
        <Hero hero="roomsHero">
          <Banner title={this.state.type}>
            <Link to="/" className="btn-primary">
              return home
            </Link>
          </Banner>
        </Hero>
        <BusinessContainer />
      </>
    )
  }
}


// export default function Category() {

//   return (
//     <>
//         <Hero hero="roomsHero">
//             <Banner title={name}>
//                 <Link to="/" className="btn-primary">
//                 return home
//                 </Link>
//             </Banner>
//         </Hero>
//         <BusinessContainer />
//     </>
//   )
// }
