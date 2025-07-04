/* tslint:disable */
/* eslint-disable */
/**
 * Kartverkets åpne API for søk etter stedsnavn
 *  API for søk etter stedsnavn. Man kan for eksempel søke etter et navn, et sted (et sted kan ha flere navn) eller steder i nærheten av et punkt. APIet returnerer kun de første 5000 resultatene.  Det er ikke nødvendig med innlogging/autorisasjon for å bruke APIet.  Medio desember 2023 ble APIet flyttet til et nytt endepunkt som er tilgjengelig på <a href=\"https://api.kartverket.no/stedsnavn/v1\">https://api.kartverket.no/stedsnavn/v1</a>. Det tidligere endepunktet <a href=\"https://ws.geonorge.no/stedsnavn/v1\">https://ws.geonorge.no/stedsnavn/v1</a> vil være tilgjengelig inntil videre, og vil fungere som en proxy til det nye endepunktet. Vi anbefaler likevel å bytte til det nye endepunktet.  Større eller ikke-kompatible endringer i APIet vil bli annonsert med minst 3 måneder forvarsel på <a href=\"https://status.kartverket.no\">https://status.kartverket.no</a>.     
 *
 * The version of the OpenAPI document: 1.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';

export const BASE_PATH = "https://api.kartverket.no/stedsnavn/v1".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
    url: string;
    options: RawAxiosRequestConfig;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration | undefined;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected axios: AxiosInstance = globalAxios) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath ?? basePath;
        }
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    constructor(public field: string, msg?: string) {
        super(msg);
        this.name = "RequiredError"
    }
}

interface ServerMap {
    [key: string]: {
        url: string,
        description: string,
    }[];
}

/**
 *
 * @export
 */
export const operationServerMap: ServerMap = {
}
