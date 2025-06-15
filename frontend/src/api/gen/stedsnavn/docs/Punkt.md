# Punkt


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**meterFraPunkt** | **number** | Distanse i meter til punktet det ble søkt etter. | [optional] [default to undefined]
**navneobjekttype** | **string** | Objekttypen som et sted kan tilhøre, f.eks en by, elv eller kirke | [optional] [default to undefined]
**representasjonspunkt** | [**Representasjonspunkt**](Representasjonspunkt.md) | Et konstruert representasjonspunkt for stedsnavnet. | [optional] [default to undefined]
**stedsnavn** | [**Array&lt;SkrivemateJson&gt;**](SkrivemateJson.md) |  | [optional] [default to undefined]
**stedsnummer** | **number** | Identifikator for et sted. | [optional] [default to undefined]
**stedstatus** | **string** | Status for selve stedet. Et sted kan være et relikt (historisk), aktivt eller planlagt sted. En kommune som ikke lenger eksisterer er f.eks. relikt, mens en bru som skal bygges er planlagt. | [optional] [default to undefined]

## Example

```typescript
import { Punkt } from './api';

const instance: Punkt = {
    meterFraPunkt,
    navneobjekttype,
    representasjonspunkt,
    stedsnavn,
    stedsnummer,
    stedstatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
