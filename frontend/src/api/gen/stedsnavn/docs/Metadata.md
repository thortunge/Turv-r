# Metadata


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**side** | **number** | Sidenummeret som skal returneres. Minimum 1, maksimum 500. | [optional] [default to 1]
**sokeStreng** | **string** | Søkestrengen som ble sendt inn til API-et. | [optional] [default to undefined]
**totaltAntallTreff** | **number** | Antall treff som søket returnerte. Hvis det er et tungt søk er antallet ofte et grovestimat, ikke et nøyaktig antall. | [optional] [default to undefined]
**treffPerSide** | **number** | Antall treff per side. Minimum 1, maksimum 500. | [optional] [default to 10]
**utkoordsys** | **number** | Angi det koordinatsystemet som du ønsker at geometrien i returen skal transformeres til, oppgis som en SRID (altså tallene i en EPSG-kode, f.eks. 4258 eller 25833). Standard er 4258. | [optional] [default to 4258]
**viserFra** | **number** | Viser treff fra og medobjekt nummer X i responsen. | [optional] [default to undefined]
**viserTil** | **number** | Viser treff til og med objekt nummer X i responsen. | [optional] [default to undefined]

## Example

```typescript
import { Metadata } from './api';

const instance: Metadata = {
    side,
    sokeStreng,
    totaltAntallTreff,
    treffPerSide,
    utkoordsys,
    viserFra,
    viserTil,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
