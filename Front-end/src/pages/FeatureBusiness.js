import React, { Component } from 'react'
import { BusinessContext } from '../context'
import Loading from "../components/Loading"
import Business from '../components/Business';
import Title from '../components/Title';

export default class FeatureBusiness extends Component {

  static contextType = BusinessContext;

  render() {
    let { loading, featuredBusiness: business } = this.context;
    business = business.map(busi => {
      return <Business key={busi.id} business={busi} />
    })
    return (
      <section className='featured-rooms'>
        <Title title="featured Business" />
        <div className='featured-rooms-center'>
          {loading ? <Loading /> : business}
        </div>
      </section>
    )
  }
}
