import axios from 'axios';
import * as yrApi from './gen'

const createApi = (baseURL: string) => {
    const api = axios.create({
        baseURL,
        withCredentials: true
    });
    return api;
};

const basePath = 'https://api.met.no/weatherapi/locationforecast/2.0'

export const api = {
    weatherApi: new yrApi.DataApi(undefined, basePath, createApi(basePath))
}