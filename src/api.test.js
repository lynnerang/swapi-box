import { fetchFilms, fetchPeople, fetchPlanets, fetchResident } from './api.js';
import { mockFilm, mockPerson, mockPeople, mockPlanets, mockResidents } from './mockData.js';

describe('fetchFilms', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockFilm)
    }));
  })

  it('should call fetch with the correct arguments', async () => {
    const expectedUrl = 'https://swapi.co/api/films';
    await fetchFilms();
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl);
  })

  it('should return a parsed version of the result', async () => {
    const expectedData = await fetchFilms();
    expect(expectedData).toEqual(mockFilm);
  })

  it('should throw an error if the fetch isn\'t successful', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    await expect(fetchFilms()).rejects.toEqual(Error('Can not fetch films data.'))
  })
})

describe('fetchPeople', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPeople)
    }));
  })

  it('should call fetch with the correct arguments', async () => {
    const expectedUrl = 'https://swapi.co/api/people';
    await fetchPeople();
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl);
  })

  it('should return a parsed version of the result', async () => {
    const expectedData = await fetchPeople();
    expect(expectedData).toEqual(mockPeople);
  })

  it('should throw an error if the fetch isn\'t successful', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    await expect(fetchPeople()).rejects.toEqual(Error('Can not fetch people data.'))
  })
})

describe('fetchPlanets', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPlanets)
    }));
  })

  it('should call fetch with the correct arguments', async () => {
    const expectedUrl = 'https://swapi.co/api/planets';
    await fetchPlanets();
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl);
  })

  it('should return a parsed version of the result', async () => {
    const expectedData = await fetchPlanets();
    expect(expectedData).toEqual(mockPlanets);
  })

  it('should throw an error if the fetch isn\'t successful', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    await expect(fetchPlanets()).rejects.toEqual(Error('Can not fetch planets data.'))
  })
})

describe('fetchResident', () => {
  let mockUrl;

  beforeEach(() => {
    mockUrl = 'https://swapi.co/api/people/11/';
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPerson)
    }));
  })

  it('should call fetch with the correct arguments', async () => {
    await fetchResident(mockUrl);
    expect(window.fetch).toHaveBeenCalledWith(mockUrl);
  })

  it('should return a parsed version of the result', async () => {
    const expectedData = await fetchResident(mockUrl);
    expect(expectedData).toEqual(mockPerson);
  })

  it('should throw an error if the fetch isn\'t successful', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));
    await expect(fetchResident(mockUrl)).rejects.toEqual(Error('Can not fetch resident data.'))
  })
})

