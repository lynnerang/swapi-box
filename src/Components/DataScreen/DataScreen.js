/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './DataScreen.scss';
import { NavLink } from 'react-router-dom';
import Card from '../Card/Card.js';

function DataScreen(props) {
  const cards = props.data.map(item => <Card data={item} key={item.name} refreshFavCount={props.refreshFavCount}/>);

  return (
    <div className='content'>
      <nav className='data-nav'>
        <NavLink className='category-option' to='/people' onClick={props.getPeopleData}>
          <img className='category-img-small' src={require('../../images/peopleicon.png')} aria-hidden='true'/>
          <p className='category-text-small'>People</p>
        </NavLink>
        <NavLink className='category-option' to='/planets' onClick={props.getPlanetData}>
          <img className='category-img-small' src={require('../../images/planeticon.png')} aria-hidden='true'/>
          <p className='category-text-small'>Planets</p>
        </NavLink>
        <NavLink className='category-option' to='/vehicles' onClick={props.getVehicleData}>
          <img className='category-img-small' src={require('../../images/vehiclesicon.png')} aria-hidden='true'/>
          <p className='category-text-small'>Vehicles</p>
        </NavLink>
      </nav>
      <section className='card-area'>
        {cards}
      </section>
    </div>
  );
}

export default DataScreen;
