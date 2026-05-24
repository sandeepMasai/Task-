import axios from 'axios'

export const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 8000,
})

export async function fetchCountry(name) {
  try {
    const { data } = await countriesApi.get(`/name/${encodeURIComponent(name)}`, {
      params: { fields: 'name,capital,region,population,flags,currencies,languages' },
    })
    return data?.[0] ?? null
  } catch {
    return null
  }
}


export async function fetchWeather(lat, lon) {
  const key = import.meta.env.VITE_OPENWEATHER_KEY
  if (!key) return null
  try {
    const { data } = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      { params: { lat, lon, appid: key, units: 'metric' } }
    )
    return data
  } catch {
    return null
  }
}
