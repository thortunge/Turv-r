# Skrivemate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**fylker** | [**Array&lt;Fylker&gt;**](Fylker.md) |  | [optional] [default to undefined]
**kommuner** | [**Array&lt;Kommuner&gt;**](Kommuner.md) |  | [optional] [default to undefined]
**navneobjekttype** | **string** | Objekttypen som et sted kan tilhøre, f.eks en by, elv eller kirke | [optional] [default to undefined]
**navnestatus** | **string** | Angir statusen til navnet, f.eks. om det er et hovednavn eller sidenavn. | [optional] [default to undefined]
**representasjonspunkt** | [**Representasjonspunkt**](Representasjonspunkt.md) | Et konstruert representasjonspunkt for stedsnavnet. | [optional] [default to undefined]
**skrivemte** | **string** | En spesifikk måte å skrive et stedsnavn på. | [optional] [default to undefined]
**skrivemtestatus** | **string** | Hvilken status denne skrivemåten har, f.eks. om den er historisk eller godkjent. | [optional] [default to undefined]
**sprk** | **string** | Språket til skrivemåten/navnet. | [optional] [default to undefined]
**stedsnummer** | **number** | Identifikator for et sted. | [optional] [default to undefined]
**stedstatus** | **string** | Status for selve stedet. Et sted kan være et relikt (historisk), aktivt eller planlagt sted. En kommune som ikke lenger eksisterer er f.eks. relikt, mens en bru som skal bygges er planlagt. | [optional] [default to undefined]

## Example

```typescript
import { Skrivemate } from './api';

const instance: Skrivemate = {
    fylker,
    kommuner,
    navneobjekttype,
    navnestatus,
    representasjonspunkt,
    skrivemte,
    skrivemtestatus,
    sprk,
    stedsnummer,
    stedstatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
