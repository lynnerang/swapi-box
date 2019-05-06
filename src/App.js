/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './App.scss';
import CrawlScreen from './CrawlScreen';
import ExploreScreen from './ExploreScreen';
import DataScreen from './DataScreen';
import { Switch, Route, NavLink } from 'react-router-dom';
import { fetchFilms, fetchPeople, fetchPlanets, fetchResident } from './api.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomFilm: {},
      loading: true,
      peopleData: [],
      planetData: [],
      vehicleData: []
    }
  }

  componentDidMount() {
    this.getFilms();
  }

  getFilms = () => {
    fetchFilms()
    .then(films => this.getRandomFilm(films.results))
    .catch(err => console.log(err));
  }

  getRandomFilm = films => {
    const randomFilm = films[Math.floor(Math.random() * films.length)];
    this.setState({randomFilm, loading: false}); 
  }

  getPlanetData = () => {
    if (!this.state.planetData.length) {
      fetchPlanets()
      .then(planets => this.addResidents(planets.results))
      .then(planetData => this.setState({planetData}))
      .catch(err => console.log(err));
    }
  }

  addResidents = planets => {
    const promises = planets.map(planet => {
      const residents = planet.residents.map(resident => {
        return fetchResident(resident)
        .then(resident => resident.name)
      });
      return Promise.all(residents)
      .then(residents => { return ({
            name: planet.name, 
            terrain: planet.terrain, 
            population: planet.population,
            climate: planet.climate, 
            residents: residents
      })});
    });
    return Promise.all(promises);
  }

  getVehicleData = () => {
    if (!this.state.vehicleData.length) {
      fetch('https://swapi.co/api/vehicles')
        .then(response => response.json())
        .then(result => this.getVehicleDetails(result.results))
        .then(vehicleData => this.setState({vehicleData}))
        .catch(err => console.log(err))
    }
  }

  getVehicleDetails = data => {
    const promises = data.map(vehicle => {
      return ({ 
        name: vehicle.name,
        model: vehicle.model,
        class: vehicle.vehicle_class,
        passengers: vehicle.passengers
      })
    })
    return Promise.all(promises);
  }

  getPeopleData = () => {
    if (!this.state.peopleData.length) {
      fetchPeople()
      .then(people => this.addHomeworlds(people.results))
      .then(people => this.addSpecies(people))
      .then(peopleData => this.setState({peopleData}))
      .catch(err => console.log(err));
    }
  }

  addHomeworlds = people => {
    const promises = people.map(peep => {
      return fetch(peep.homeworld)
      .then(response => response.json())
      .then(result => ({
        name: peep.name, 
        species: peep.species, 
        homeworld: result.name, 
        population: result.population
      }))
    })
    return Promise.all(promises);
  }

  addSpecies = peeps => {
    const promises = peeps.map(peep => {
      return fetch(peep.species)
      .then(response => response.json())
      .then(result => ({...peep, species: result.name, language: result.language}))
    })
    return Promise.all(promises)
  }

  refreshFavCount = () => {
    this.forceUpdate();
  }

  render() {
    console.log(this.state.vehicleData)
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
   
    if (this.state.loading) {
      return '...loading';
    } else {
      return (
        <div className='App'>
          <header className=''>
            <div className='header-left'>
              <img className='logo' src={require('./images/swapilogo.png')} alt='Swapi-Box logo' />
              <div className='header-text'>
                <h1>SWAPI-Box</h1>
                <p className='subtitle'>For all your StarWars info needs!</p>
              </div>
            </div>
            <div className='header-right'>
              <nav className='header-nav'>
                <NavLink className='header-nav-item' to='/explore'><i className='fas fa-binoculars'></i>Explore</NavLink>
                <NavLink className='header-nav-item' to='/favorites'><i className='far fa-star'></i>View Favorites ({favs.length})</NavLink>
                <NavLink className='header-nav-item' to='/'><i className='far fa-play-circle'></i>Play Crawl</NavLink>
              </nav>
            </div>
          </header>
          <main>
            <Switch>
              <Route path='/' exact render={(props) => (
                <CrawlScreen title={`Episode ${this.state.randomFilm.episode_id}`}
                            subTitle={this.state.randomFilm.title}
                            text={`${this.state.randomFilm.opening_crawl}  (${this.state.randomFilm.title} - ${this.state.randomFilm.release_date})`}
                />
                )} 
              />
              <Route path='/explore' render={(props) => (<ExploreScreen 
                getPeopleData={this.getPeopleData} 
                getPlanetData={this.getPlanetData}
                getVehicleData={this.getVehicleData}
              />)}
              />
              <Route path='/people' render={(props) => (<DataScreen     
                getPeopleData={this.getPeopleData} 
                getPlanetData={this.getPlanetData} 
                getVehicleData={this.getVehicleData}
                refreshFavCount={this.refreshFavCount}
                data={this.state.peopleData}/>)}
              />
              <Route path='/planets' render={(props) => (<DataScreen 
                getPeopleData={this.getPeopleData}
                getPlanetData={this.getPlanetData} 
                getVehicleData={this.getVehicleData}
                refreshFavCount={this.refreshFavCount}
                data={this.state.planetData}/>)}
              />
              <Route path='/vehicles' render={(props) => (<DataScreen 
                getPeopleData={this.getPeopleData}
                getPlanetData={this.getPlanetData} 
                getVehicleData={this.getVehicleData}
                refreshFavCount={this.refreshFavCount}
                data={this.state.vehicleData}/>)}
              />
              <Route path='/favorites' render={(props) => (<DataScreen 
                getPeopleData={this.getPeopleData}
                getPlanetData={this.getPlanetData} 
                getVehicleData={this.getVehicleData}
                refreshFavCount={this.refreshFavCount}
                data={favs}/>)}
              />
            </Switch>
          </main>
        </div>
      );
    }
  }
}

export default App;
