import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import { mockFilm, mockFilms, mockPlanets } from './mockData.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = shallow ( <App /> )
  })
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has five default state properties for loading status and various data', () => {
    expect(wrapper.state()).toEqual({
      randomFilm: {},
      loading: true,
      peopleData: [],
      planetData: [],
      vehicleData: []
    });
  });

  it('should get a random film and set loading to false when there is data', () => {
    expect(wrapper.state('randomFilm')).toEqual({});
    expect(wrapper.state('loading')).toEqual(true);
    
    wrapper.instance().getRandomFilm(mockFilms);

    expect(wrapper.state('randomFilm')).toEqual(mockFilm);
    expect(wrapper.state('loading')).toEqual(false);
  })

  it('should get planet data and save it in state', () => {
    expect(wrapper.state('planetData')).toEqual([]);
    
    wrapper.instance().getPlanetData();

    expect(wrapper.state('planetData')).toEqual(mockPlanets);
  })
})


