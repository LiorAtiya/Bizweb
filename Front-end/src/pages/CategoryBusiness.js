import React, { Component } from 'react'
import { BusinessContext } from '../context'
import Loading from "../components/Loading"
// import Business from '../components/Business';
import Title from '../components/Title';
import Card from '../components/Card';

export default class CategoryBusiness extends Component {

  static contextType = BusinessContext;

  render() {
    let { loading } = this.context;
    let category = this.props.categories;

    category = category.map((busi, i) => {
      return <Card 
              key={i} 
              id={category[i].id} 
              name={category[i].name} 
              route={category[i].route}
              image={category[i].image}/>
    })
    return (
      <section className='featured-rooms'>
        <Title title="categories" />
        <div className='featured-rooms-center'>
          {loading ? <Loading /> : category}
        </div>
      </section>
    )
  }
}
