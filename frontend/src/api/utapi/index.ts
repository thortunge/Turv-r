import type { AxiosResponse } from "axios"
import axios from 'axios'

export type UtCabin = {
    id: number,
    lat: number,
    lng: number,
    first: string,
    second: string
}

export type UtCompactResponse = {
    cabins: string[]
}
const utBackend = 'https://ut-backend-api-2-41145913385.europe-north1.run.app/compact-data?cabins=true'

export function getCompactData(): Promise<AxiosResponse<UtCompactResponse>>{
    return axios.get(utBackend)
}

export function cabinRowToCabin(s: string): UtCabin{
    const [cabinId, lng, lat, first, second ] = s.split(";")
    return {
        id: Number(cabinId),
        lat: Number(lat),
        lng: Number(lng),
        first,
        second
    }
}