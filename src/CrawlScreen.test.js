import React from 'react';
import CrawlScreen from './CrawlScreen';
import Enzyme from 'enzyme';
import { NavLink } from 'react-router-dom';
import { shallow } from 'enzyme';
import { mockFilm } from './mockData.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('CrawlScreen', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = shallow( <CrawlScreen title={mockFilm.title}
      subTitle={mockFilm.subTitle}
      text={mockFilm.text} /> )
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('includes link to skip the crawl to the explore page', () => {
    expect(wrapper.find(NavLink).props().to).toBe('/explore');
  });

});