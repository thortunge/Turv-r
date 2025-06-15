import axios from 'axios';
import * as stdApi from './gen/stedsnavn'

const createApi = (baseURL: string) => {
    const api = axios.create({
        baseURL,
        withCredentials: true
    });
    return api;
};

const basePath = 'https://api.kartverket.no/stedsnavn/v1'

export const manualStedsnavn = axios.create({
    baseURL: basePath
})

export const stedsnavnApi = new stdApi.DefaultApi(undefined, basePath, createApi(basePath))