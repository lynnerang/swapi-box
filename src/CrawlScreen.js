import React from 'react';
import './CrawlScreen.scss';
import Crawl from 'react-star-wars-crawl';
import 'react-star-wars-crawl/lib/index.css';
import { NavLink } from 'react-router-dom';

function CrawlScreen(props) {
  return (
    <div className='crawl-div'>
      <Crawl
        title={props.title}
        subTitle={props.subTitle}
        text={props.text}
      />
      <NavLink className='skip-btn' to='/explore'>Skip</NavLink>
    </div>
  );
}

export default CrawlScreen;
