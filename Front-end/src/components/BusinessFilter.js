import React from 'react'
import { useContext } from 'react'
import { BusinessContext } from '../context'
import Title from "../components/Title"

//Get all uniqe values
const getUnique = (item, value) => {
  return [...new Set(item.map(item => item[value]))]
}

export default function BusinessFilter({ business }) {
  const context = useContext(BusinessContext)
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;

  //get uniqe types
  let types = getUnique(business, "type")

  //add all
  types = ['all', ...types];

  //map to jsx
  types = types.map((item, index) => {
    return <option value={item} key={index}>{item}</option>
  })

  let people = getUnique(business, 'capacity');
  people = people.map((item, index) => {
    return <option key={index} value={item}>{item}</option>
  })

  return (
    <section className='filter-container'>
      <Title title="search business" />
      <form className='filter-form'>
        {/* slect type */}
        <div className='form-group'>
          <label htmlFor='type'>Area</label>
          <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
            {types}
          </select>
        </div>
        {/* end slect type */}
        {/* guest */}
        <div className='form-group'>
          <label htmlFor='capacity'>Guest</label>
          <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
            {people}
          </select>
        </div>
        {/* end guest */}
        {/* business price */}
        <div className='form-group'>
          <label htmlFor='price'>
            room price ${price}
          </label>
          <input type='range' name='price' min={minPrice}
            max={maxPrice} id='price' value={price} onChange={handleChange}
            className='form-control' />
        </div>
        {/* end business price */}
        {/* size */}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <input type='number' name='minSize' id='size'
              value={minSize} onChange={handleChange}
              className='size-input' />
            <input type='number' name='maxSize' id='size'
              value={maxSize} onChange={handleChange}
              className='size-input' />
          </div>
        </div>
        {/* end of size */}
        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type="checkbox"
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type="checkbox"
              name='pets'
              id='pets'
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
        {/* end of extras */}
      </form>
    </section>
  )
}
