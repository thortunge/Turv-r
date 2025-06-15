# DefaultApi

All URIs are relative to *https://api.kartverket.no/stedsnavn/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**navnGet**](#navnget) | **GET** /navn | Søk etter et spesifikt navn (skrivemåte/stedsnavn).|
|[**navneobjekttyperGet**](#navneobjekttyperget) | **GET** /navneobjekttyper | Vis alle navneobjekttyper (f.eks by, elv, kirke) som et sted kan ha.|
|[**punktGet**](#punktget) | **GET** /punkt | Finn steder nær et gitt geografisk punkt.|
|[**sprakGet**](#sprakget) | **GET** /sprak | Vis alle språk som et navn kan ha.|
|[**stedGet**](#stedget) | **GET** /sted | Søk etter et sted. Et sted kan ha flere navn og hvert navn kan ha flere skrivemåter.|

# **navnGet**
> ReturSkrivemate navnGet()

Søk etter et spesifikt navn (skrivemåte/stedsnavn). Returen er sortert etter stedets kategorisering innenfor Sentralt stedsnavnsregister (et fylke kommer f.eks. før en bekk). Innenfor hver kategori er så returen sortert etter hvor godt det matcher søkebegrepet. <p>For eksempel ?sok=Trondheim*&fuzzy=false</p>

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sok: string; //Søk etter stedsnavn. Støtter wildcard-søk (*) (optional) (default to undefined)
let fuzzy: boolean; //Sett til \"true\" for å utføre et fuzzy-søk. Søket vil da prøve å finne alle navn som ligner på det du søker etter. Treffene vil sorteres etter hvor mye de ligner på søkebegrepet. Kan være litt tregere enn et vanlig søk. (optional) (default to false)
let fnr: Array<string>; //Søk innenfor et fylkesnummer. Bestående av two tegn med ledende 0 om nødvendig. Kan søke i flere fylker ved å gjenta parameteret, f.eks. fnr=50&fnr=03 (optional) (default to undefined)
let knr: Array<string>; //Søk innenfor en kommune ved å skrive inn kommunenummeret. Bestående av fire tegn med ledende 0 om nødvendig. Kan søke i flere kommuner ved å gjenta parameteret, f.eks. knr=5001&knr=0301 (optional) (default to undefined)
let kommunenavn: string; //Søk etter treff i kommunen med oppgitt navn. Vær obs på at flere kommuner har samme navn, det anbefales derfor å søke etter kommunenummer hvis mulig. (optional) (default to undefined)
let fylkesnavn: string; //Søk etter treff i fylket med oppgitt navn. (optional) (default to undefined)
let sprak: string; //Filtrer skrivemåte etter språk, vis kun de skrivemåtene som er i det angitte språk. Se i \"/sprak\"-endepunktet for å se mulige valg for språkkoder. (optional) (default to undefined)
let utkoordsys: number; //Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. (optional) (default to 4258)
let treffPerSide: number; //Antall treff per side. Minimum 1, maksimum 500. (optional) (default to 10)
let side: number; //Sidenummeret som skal returneres. Minimum 1, maksimum 500. (optional) (default to 1)
let filtrer: string; //Vis kun de elementene du vil ha i returen. Kommaseparert liste med nøkler. For å hente ut underobjekter bruk \".\"-notasjon, f.eks. &filtrer=navn.stedsnummer,metadata (optional) (default to undefined)

const { status, data } = await apiInstance.navnGet(
    sok,
    fuzzy,
    fnr,
    knr,
    kommunenavn,
    fylkesnavn,
    sprak,
    utkoordsys,
    treffPerSide,
    side,
    filtrer
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sok** | [**string**] | Søk etter stedsnavn. Støtter wildcard-søk (*) | (optional) defaults to undefined|
| **fuzzy** | [**boolean**] | Sett til \&quot;true\&quot; for å utføre et fuzzy-søk. Søket vil da prøve å finne alle navn som ligner på det du søker etter. Treffene vil sorteres etter hvor mye de ligner på søkebegrepet. Kan være litt tregere enn et vanlig søk. | (optional) defaults to false|
| **fnr** | **Array&lt;string&gt;** | Søk innenfor et fylkesnummer. Bestående av two tegn med ledende 0 om nødvendig. Kan søke i flere fylker ved å gjenta parameteret, f.eks. fnr&#x3D;50&amp;fnr&#x3D;03 | (optional) defaults to undefined|
| **knr** | **Array&lt;string&gt;** | Søk innenfor en kommune ved å skrive inn kommunenummeret. Bestående av fire tegn med ledende 0 om nødvendig. Kan søke i flere kommuner ved å gjenta parameteret, f.eks. knr&#x3D;5001&amp;knr&#x3D;0301 | (optional) defaults to undefined|
| **kommunenavn** | [**string**] | Søk etter treff i kommunen med oppgitt navn. Vær obs på at flere kommuner har samme navn, det anbefales derfor å søke etter kommunenummer hvis mulig. | (optional) defaults to undefined|
| **fylkesnavn** | [**string**] | Søk etter treff i fylket med oppgitt navn. | (optional) defaults to undefined|
| **sprak** | [**string**] | Filtrer skrivemåte etter språk, vis kun de skrivemåtene som er i det angitte språk. Se i \&quot;/sprak\&quot;-endepunktet for å se mulige valg for språkkoder. | (optional) defaults to undefined|
| **utkoordsys** | [**number**] | Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. | (optional) defaults to 4258|
| **treffPerSide** | [**number**] | Antall treff per side. Minimum 1, maksimum 500. | (optional) defaults to 10|
| **side** | [**number**] | Sidenummeret som skal returneres. Minimum 1, maksimum 500. | (optional) defaults to 1|
| **filtrer** | [**string**] | Vis kun de elementene du vil ha i returen. Kommaseparert liste med nøkler. For å hente ut underobjekter bruk \&quot;.\&quot;-notasjon, f.eks. &amp;filtrer&#x3D;navn.stedsnummer,metadata | (optional) defaults to undefined|


### Return type

**ReturSkrivemate**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **navneobjekttyperGet**
> Array<Navneobjekttype> navneobjekttyperGet()

Vis alle navneobjekttyper (f.eks by, elv, kirke) som et sted kan ha. Man kan filtrere på navneobjekttypekoder i noen søk, dette er en oversikt over de gyldige alternativene.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.navneobjekttyperGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Navneobjekttype>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **punktGet**
> ReturPunkt punktGet()

Gjør et geografisk søk etter de nærmeste stedene. Vær obs på at et sted kan ha flere stedsnavn og at hvert stedsnavn kan ha flere likestilte skrivemåter. Returen er sortert etter stedets kategorisering innenfor Sentralt stedsnavnsregister slik at det mest \"nærliggende\" stedet kommer først (en bekk kommer f.eks. før et fylke). Innenfor hver kategori er så returen sortert etter distanse til punktet som man søkte etter.  <p>For eksempel ?nord=60.5&ost=11.12&koordsys=4258&radius=1000</p>

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let nord: number; //Nord-koordinaten/Latitude (default to undefined)
let ost: number; //Øst-koordinaten/Longitude (default to undefined)
let koordsys: number; //Koordinatsystemet (EPSG) til koordinatene du søker med. Angis som en SRID, for eksempel 4258 eller 25833. (default to undefined)
let radius: number; //Radius i antall meter som søket leter etter stedsnavn i. Maksimum er 5000m. (optional) (default to 500)
let utkoordsys: number; //Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. (optional) (default to 4258)
let treffPerSide: number; //Antall treff per side. Minimum 1, maksimum 500. (optional) (default to 10)
let side: number; //Sidenummeret som skal returneres. Minimum 1, maksimum 500. (optional) (default to 1)
let filtrer: string; //Vis kun de elementene du vil ha i returen. Kommaseparert liste med nøkler. For å hente ut underobjekter bruk \".\"-notasjon, f.eks. &filtrer=navn.stedsnummer,metadata (optional) (default to undefined)

const { status, data } = await apiInstance.punktGet(
    nord,
    ost,
    koordsys,
    radius,
    utkoordsys,
    treffPerSide,
    side,
    filtrer
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nord** | [**number**] | Nord-koordinaten/Latitude | defaults to undefined|
| **ost** | [**number**] | Øst-koordinaten/Longitude | defaults to undefined|
| **koordsys** | [**number**] | Koordinatsystemet (EPSG) til koordinatene du søker med. Angis som en SRID, for eksempel 4258 eller 25833. | defaults to undefined|
| **radius** | [**number**] | Radius i antall meter som søket leter etter stedsnavn i. Maksimum er 5000m. | (optional) defaults to 500|
| **utkoordsys** | [**number**] | Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. | (optional) defaults to 4258|
| **treffPerSide** | [**number**] | Antall treff per side. Minimum 1, maksimum 500. | (optional) defaults to 10|
| **side** | [**number**] | Sidenummeret som skal returneres. Minimum 1, maksimum 500. | (optional) defaults to 1|
| **filtrer** | [**string**] | Vis kun de elementene du vil ha i returen. Kommaseparert liste med nøkler. For å hente ut underobjekter bruk \&quot;.\&quot;-notasjon, f.eks. &amp;filtrer&#x3D;navn.stedsnummer,metadata | (optional) defaults to undefined|


### Return type

**ReturPunkt**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sprakGet**
> Array<Sprak> sprakGet()

Man kan filtrere på språkkoder i noen søk, dette er en oversikt over de gyldige alternativene.

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.sprakGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Sprak>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stedGet**
> ReturSted stedGet()

Søk etter et sted. Et sted kan ha flere stedsnavn, hvert navn kan ha flere skrivemåter. Returen er sortert etter stedets kategorisering innenfor Sentralt stedsnavnsregister (et fylke kommer f.eks. før en bekk). Innenfor hver kategori er så returen sortert etter hvor godt det matcher søkebegrepet. <p>For eksempel ?sok=Trondheim*&knr=5001</p>

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let sok: string; //Søk etter stedsnavn. Støtter wildcard-søk (*) (optional) (default to undefined)
let fuzzy: boolean; //Sett til \"true\" for å utføre et fuzzy-søk. Søket vil da prøve å finne alle navn som ligner på det du søker etter. Treffene vil sorteres etter hvor mye de ligner på søkebegrepet. Kan være litt tregere enn et vanlig søk. (optional) (default to false)
let fnr: Array<string>; //Søk innenfor et fylkesnummer. Bestående av two tegn med ledende 0 om nødvendig. Kan søke i flere fylker ved å gjenta parameteret, f.eks. fnr=50&fnr=03 (optional) (default to undefined)
let knr: Array<string>; //Søk innenfor en kommune ved å skrive inn kommunenummeret. Bestående av fire tegn med ledende 0 om nødvendig. Kan søke i flere kommuner ved å gjenta parameteret, f.eks. knr=5001&knr=0301 (optional) (default to undefined)
let kommunenavn: string; //Søk etter treff i kommunen med oppgitt navn. Vær obs på at flere kommuner har samme navn, det anbefales derfor å søke etter kommunenummer hvis mulig. (optional) (default to undefined)
let fylkesnavn: string; //Søk etter treff i fylket med oppgitt navn. (optional) (default to undefined)
let stedsnummer: number; //Finn stedsnavn med et gitt stedsnummer. (optional) (default to undefined)
let navneobjekttype: Array<string>; //Filtrer returen etter navneobjekttypekode, viser kun de forekomstene som har angitt navneobjekttype. Sjekk endepunktet /navneobjekttyper for å se mulige valg for navneobjekttypekoder. Det er mulig å filtrere på flere navneobjekttypekoder ved å gjenta parameteret. (optional) (default to undefined)
let utkoordsys: number; //Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. (optional) (default to 4258)
let treffPerSide: number; //Antall treff per side. Minimum 1, maksimum 500. (optional) (default to 10)
let side: number; //Sidenummeret som skal returneres. Minimum 1, maksimum 500. (optional) (default to 1)
let filtrer: string; //Vis kun de elementene du vil ha i returen. Kommaseparert liste med nøkler. For å hente ut underobjekter bruk \".\"-notasjon, f.eks. &filtrer=navn.stedsnummer,metadata (optional) (default to undefined)

const { status, data } = await apiInstance.stedGet(
    sok,
    fuzzy,
    fnr,
    knr,
    kommunenavn,
    fylkesnavn,
    stedsnummer,
    navneobjekttype,
    utkoordsys,
    treffPerSide,
    side,
    filtrer
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sok** | [**string**] | Søk etter stedsnavn. Støtter wildcard-søk (*) | (optional) defaults to undefined|
| **fuzzy** | [**boolean**] | Sett til \&quot;true\&quot; for å utføre et fuzzy-søk. Søket vil da prøve å finne alle navn som ligner på det du søker etter. Treffene vil sorteres etter hvor mye de ligner på søkebegrepet. Kan være litt tregere enn et vanlig søk. | (optional) defaults to false|
| **fnr** | **Array&lt;string&gt;** | Søk innenfor et fylkesnummer. Bestående av two tegn med ledende 0 om nødvendig. Kan søke i flere fylker ved å gjenta parameteret, f.eks. fnr&#x3D;50&amp;fnr&#x3D;03 | (optional) defaults to undefined|
| **knr** | **Array&lt;string&gt;** | Søk innenfor en kommune ved å skrive inn kommunenummeret. Bestående av fire tegn med ledende 0 om nødvendig. Kan søke i flere kommuner ved å gjenta parameteret, f.eks. knr&#x3D;5001&amp;knr&#x3D;0301 | (optional) defaults to undefined|
| **kommunenavn** | [**string**] | Søk etter treff i kommunen med oppgitt navn. Vær obs på at flere kommuner har samme navn, det anbefales derfor å søke etter kommunenummer hvis mulig. | (optional) defaults to undefined|
| **fylkesnavn** | [**string**] | Søk etter treff i fylket med oppgitt navn. | (optional) defaults to undefined|
| **stedsnummer** | [**number**] | Finn stedsnavn med et gitt stedsnummer. | (optional) defaults to undefined|
| **navneobjekttype** | **Array&lt;string&gt;** | Filtrer returen etter navneobjekttypekode, viser kun de forekomstene som har angitt navneobjekttype. Sjekk endepunktet /navneobjekttyper for å se mulige valg for navneobjekttypekoder. Det er mulig å filtrere på flere navneobjekttypekoder ved å gjenta parameteret. | (optional) defaults to undefined|
| **utkoordsys** | [**number**] | Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. | (optional) defaults to 4258|
| **treffPerSide** | [**number**] | Antall treff per side. Minimum 1, maksimum 500. | (optional) defaults to 10|
| **side** | [**number**] | Sidenummeret som skal returneres. Minimum 1, maksimum 500. | (optional) defaults to 1|
| **filtrer** | [**string**] | Vis kun de elementene du vil ha i returen. Kommaseparert liste med nøkler. For å hente ut underobjekter bruk \&quot;.\&quot;-notasjon, f.eks. &amp;filtrer&#x3D;navn.stedsnummer,metadata | (optional) defaults to undefined|


### Return type

**ReturSted**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

