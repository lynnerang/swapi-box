import React from 'react';
import './ExploreScreen.scss';
import { NavLink } from 'react-router-dom';

function ExploreScreen(props) {
  return (
    <section className='category-area'>
      <h2 className='category-header'>CHOOSE A CATEGORY</h2>
      <div className='category-options'>
        <NavLink className='category-card' to='/people' onClick={props.getPeopleData}>
          <img className='category-img' src={require('../../images/peopleicon.png')}aria-hidden='true' alt='darth vader icon'/>
          <p className='category-text'>People</p>
        </NavLink>
        <NavLink className='category-card' to='/planets' onClick={props.getPlanetData}>
          <img className='category-img' src={require('../../images/planeticon.png')}aria-hidden='true' alt='planet icon' />
          <p className='category-text'>Planets</p>
        </NavLink>
        <NavLink className='category-card' to='/vehicles'>
          <img className='category-img' src={require('../../images/vehiclesicon.png')} aria-hidden='true' alt='millenium falcon icon'/>
          <p className='category-text'>Vehicles</p>
        </NavLink>
      </div>
    </section>
  );
}

export default ExploreScreen;
