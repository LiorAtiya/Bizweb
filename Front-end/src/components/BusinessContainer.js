import React from 'react'
import BusinessFilter from './BusinessFilter'
import BusinessList from './BusinessList'
import { withBusinessConsumer } from '../context'
import Loading from './Loading'

function BusinessContainer({ context }) {
  const { loading, sortedBusiness, business } = context;
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <BusinessFilter business={business} />
      <BusinessList business={sortedBusiness} />
    </>
  )
}

export default withBusinessConsumer(BusinessContainer)

// export default function BusinessContainer() {
//   return (
//     <BusinessConsumer>
//       {value => {
//         const { loading, sortedBusiness, business } = value;
//         if(loading){
//           return <Loading />
//         }
//         return (
//           <div>
//             Hello from BusinessContainer
//             <BusinessFilter business={business} />
//             <BusinessList business={sortedBusiness} />
//           </div>
//         )
//       }}
//     </BusinessConsumer>
//   )
// }
