import React from 'react';
import ReactDOM from 'react-dom';
import DataScreen from './DataScreen';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import { mockPlanets } from '../../mockData.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('DataScreen', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = shallow( <DataScreen data={mockPlanets} /> )
  })
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataScreen />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});