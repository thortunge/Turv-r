import axios from 'axios'

export const weatherApi = axios.create({
    baseURL: 'https://api.met.no/weatherapi/locationforecast/2.0/'
})