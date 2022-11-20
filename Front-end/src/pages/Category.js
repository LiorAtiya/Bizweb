import React from 'react'
import Banner from '../components/Banner'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import BusinessContainer from '../components/category/BusinessContainer'
import Hero from '../components/Hero'

export default function Category() {
  let { type } = useParams();

  return (
    <>
    <Hero hero="roomsHero">
      <Banner title={type}>
        <Link to="/" className="btn-primary">
          return home
        </Link>
      </Banner>
    </Hero>
    <BusinessContainer />
  </>
  )
}

// export default class Category extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       type: this.props.match.params.type,
//     }
//   }

//   render() {
//     return (
//       <>
//         <Hero hero="roomsHero">
//           <Banner title={this.state.type}>
//             <Link to="/" className="btn-primary">
//               return home
//             </Link>
//           </Banner>
//         </Hero>
//         <BusinessContainer />
//       </>
//     )
//   }
// }
