import React from 'react'
import Business from './Business'
export default function BusinessList({ business }) {
  if (business.length === 0) {
    return (
      <div className='empty-search'>
        <h3>Unfortunately no business matched your search parameters</h3>
      </div>
    )
  }
  return <section className='roomslist'>
    <div className='roomslist-center'>
      {
        business.map(item => {
          return <Business key={item.id} business={item} />
        })
      }
    </div>
  </section>
}
