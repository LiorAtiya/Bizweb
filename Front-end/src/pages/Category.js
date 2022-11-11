import React from 'react'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import BusinessContainer from '../components/BusinessContainer'
import Hero from '../components/Hero'

export default function Category() {
  return (
    <>
        <Hero hero="roomsHero">
            <Banner title="Category">
                <Link to="/" className="btn-primary">
                return home
                </Link>
            </Banner>
        </Hero>
        <BusinessContainer />
    </>
  )
}
