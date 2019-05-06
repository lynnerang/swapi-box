import React from 'react';
import Card from './Card';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import { mockPerson } from './mockData.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('Card', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = shallow( <Card data={mockPerson} refreshFavCount={jest.fn()} /> )
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('can toggle whether a card is favorited or not', () => {
    expect(wrapper.state('isFavorite')).toEqual(false);

    wrapper.instance().toggleFavorite();

    expect(wrapper.state('isFavorite')).toEqual(true);
  });

});