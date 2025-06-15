# SkrivemateJson


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**navnestatus** | **string** | Angir statusen til navnet, f.eks. om det er et hovednavn eller sidenavn. | [optional] [default to undefined]
**skrivemte** | **string** | En spesifikk måte å skrive et stedsnavn på. | [optional] [default to undefined]
**skrivemtestatus** | **string** | Hvilken status denne skrivemåten har, f.eks. om den er historisk eller godkjent. | [optional] [default to undefined]
**sprk** | **string** | Språket til skrivemåten/navnet. | [optional] [default to undefined]
**stedsnavnnummer** | **number** | Et sted kan ha flere stedsnavn, dette er identifikatoren til stedsnavnet. | [optional] [default to undefined]

## Example

```typescript
import { SkrivemateJson } from './api';

const instance: SkrivemateJson = {
    navnestatus,
    skrivemte,
    skrivemtestatus,
    sprk,
    stedsnavnnummer,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
