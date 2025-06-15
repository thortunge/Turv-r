# Sok


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**fylker** | [**Array&lt;Fylker&gt;**](Fylker.md) |  | [optional] [default to undefined]
**geojson** | [**GeoJsonGeometry**](GeoJsonGeometry.md) | Stedsnavnet sin fullstendige geometri i en geojson-struktur. | [optional] [default to undefined]
**kommuner** | [**Array&lt;Kommuner&gt;**](Kommuner.md) |  | [optional] [default to undefined]
**navneobjekttype** | **string** | Objekttypen som et sted kan tilhøre, f.eks en by, elv eller kirke | [optional] [default to undefined]
**oppdateringsdato** | **string** | Det som vises er den nyeste av de tre oppdateringsdatoene for stedet, skrivemåten og stedsnavnet. | [optional] [default to undefined]
**representasjonspunkt** | [**Representasjonspunkt**](Representasjonspunkt.md) | Et konstruert representasjonspunkt for stedsnavnet. | [optional] [default to undefined]
**stedsnavn** | [**Array&lt;SkrivemateJson&gt;**](SkrivemateJson.md) |  | [optional] [default to undefined]
**stedsnummer** | **number** | Identifikator for et sted. | [optional] [default to undefined]
**stedstatus** | **string** | Status for selve stedet. Et sted kan være et relikt (historisk), aktivt eller planlagt sted. En kommune som ikke lenger eksisterer er f.eks. relikt, mens en bru som skal bygges er planlagt. | [optional] [default to undefined]

## Example

```typescript
import { Sok } from './api';

const instance: Sok = {
    fylker,
    geojson,
    kommuner,
    navneobjekttype,
    oppdateringsdato,
    representasjonspunkt,
    stedsnavn,
    stedsnummer,
    stedstatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
