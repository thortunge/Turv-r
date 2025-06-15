# ForecastTimeStepData

Forecast for a specific time

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**instant** | [**ForecastTimeStepDataInstant**](ForecastTimeStepDataInstant.md) |  | [default to undefined]
**next_12_hours** | [**ForecastTimeStepDataNext12Hours**](ForecastTimeStepDataNext12Hours.md) |  | [optional] [default to undefined]
**next_1_hours** | [**ForecastTimeStepDataNext1Hours**](ForecastTimeStepDataNext1Hours.md) |  | [optional] [default to undefined]
**next_6_hours** | [**ForecastTimeStepDataNext6Hours**](ForecastTimeStepDataNext6Hours.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ForecastTimeStepData } from './api';

const instance: ForecastTimeStepData = {
    instant,
    next_12_hours,
    next_1_hours,
    next_6_hours,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
