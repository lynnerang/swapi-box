import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      isFavorite: false
    }
  }

  componentDidMount() {
    this.checkFavStatus();
  }

  getDetails = () => {
    const keys = Object.keys(this.props.data);
    keys.shift();
  
    return keys.map((key, i) => {
      let html = key === 'residents' ? <p key={i} role='link' className='link' onClick={() => this.setState({showPopup: true})}>View residents</p>
      : <p className='card-detail' key={i}>{key}: <span>{this.props.data[key]}</span></p>
      return html;
    });
  }

  checkFavStatus = () => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];   
    const isFavorite = favs.map(i => i.name).includes(this.props.data.name); 
    this.setState({isFavorite});
  }

  getPopup = () => {
    const peeps = this.props.data.residents || [];
    const content = !peeps.length ? <p>No residents listed for this planet.</p>
    : <ul>{peeps.map(res => <li key={res}>{res}</li>)}</ul>;

    return (
      <dialog className='popup'>
        <div>
          <button className='close-btn' type='button' onClick={() => this.setState({showPopup: false})}><i className='fas fa-times'></i></button>
          <h3>{this.props.data.name} residents:</h3>
          {content}
        </div>
      </dialog>
    )
  }

  toggleFavorite = () => {
    const cardData = this.props.data;
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    
    !this.state.isFavorite ? favs.push(cardData)
    : favs.splice(favs.indexOf(favs.find(i => i.name === cardData.name)), 1);
  
    localStorage.setItem('favorites', JSON.stringify(favs));
    this.props.refreshFavCount();
    this.setState({isFavorite: !this.state.isFavorite});
  }

  render() {
    const details = this.getDetails();
    const popUp = this.state.showPopup ? this.getPopup() : null;
    const favIcon = this.state.isFavorite ? <i className='fas fa-star'></i> : <i className='far fa-star'></i>;

    const imgSrc = this.props.data.name === 'TIE/LN starfighter' ? require(`../../images/TIE-LN.png`) : require(`../../images/${this.props.data.name}.png`)

    return (
      <>
      {popUp}
        <article className='card'>
        <button type='button' className='favorite-btn' onClick={this.toggleFavorite}>{favIcon}</button>
          <div className='card-header'>
            <img className='card-img' src={imgSrc} alt='person profile pic' />
            <h3 className='card-header'>{this.props.data.name}</h3>
          </div>
          <div className='card-body'>
            {details}
          </div>
        </article>
      </>
    )
  }
}

export default Card;