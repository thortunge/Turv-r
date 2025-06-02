# ForecastTimePeriod

Weather parameters valid for a specified time period.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**air_temperature_max** | **number** | Maximum air temperature in period | [optional] [default to undefined]
**air_temperature_min** | **number** | Minimum air temperature in period | [optional] [default to undefined]
**precipitation_amount** | **number** | Best estimate for amount of precipitation for this period | [optional] [default to undefined]
**precipitation_amount_max** | **number** | Maximum amount of precipitation for this period | [optional] [default to undefined]
**precipitation_amount_min** | **number** | Minimum amount of precipitation for this period | [optional] [default to undefined]
**probability_of_precipitation** | **number** | Probability of any precipitation coming for this period | [optional] [default to undefined]
**probability_of_thunder** | **number** | Probability of any thunder coming for this period | [optional] [default to undefined]
**ultraviolet_index_clear_sky_max** | **number** | Maximum ultraviolet index if sky is clear | [optional] [default to undefined]

## Example

```typescript
import { ForecastTimePeriod } from './api';

const instance: ForecastTimePeriod = {
    air_temperature_max,
    air_temperature_min,
    precipitation_amount,
    precipitation_amount_max,
    precipitation_amount_min,
    probability_of_precipitation,
    probability_of_thunder,
    ultraviolet_index_clear_sky_max,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
