export const fetchFilms = () => {
  return fetch('https://swapi.co/api/films')
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch films data.');
    }
    return response.json();
  })
}

export const fetchPeople = () => {
  return fetch('https://swapi.co/api/people')
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch people data.');
    }
    return response.json();
  })
}

export const fetchPlanets = () => {
  return fetch('https://swapi.co/api/planets')
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch planets data.');
    }
    return response.json();
  })
}

export const fetchResident = resident => {
  return fetch(resident)
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch resident data.');
    }
    return response.json();
  })
}
