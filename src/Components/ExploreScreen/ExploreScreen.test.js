import React from 'react';
import ExploreScreen from './ExploreScreen';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('ExploreScreen', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = shallow( <ExploreScreen /> )
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});