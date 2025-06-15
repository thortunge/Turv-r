# ForecastTimeInstant

Weather parameters valid for a specific point in time.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**air_pressure_at_sea_level** | **number** | Air pressure at sea level | [optional] [default to undefined]
**air_temperature** | **number** | Air temperature | [optional] [default to undefined]
**cloud_area_fraction** | **number** | Amount of sky covered by clouds. | [optional] [default to undefined]
**cloud_area_fraction_high** | **number** | Amount of sky covered by clouds at high elevation. | [optional] [default to undefined]
**cloud_area_fraction_low** | **number** | Amount of sky covered by clouds at low elevation. | [optional] [default to undefined]
**cloud_area_fraction_medium** | **number** | Amount of sky covered by clouds at medium elevation. | [optional] [default to undefined]
**dew_point_temperature** | **number** | Dew point temperature at sea level | [optional] [default to undefined]
**fog_area_fraction** | **number** | Amount of area covered by fog. | [optional] [default to undefined]
**relative_humidity** | **number** | Amount of humidity in the air. | [optional] [default to undefined]
**wind_from_direction** | **number** | The direction wind is coming from, in degrees clockwise from North | [optional] [default to undefined]
**wind_speed** | **number** | Speed of wind | [optional] [default to undefined]
**wind_speed_of_gust** | **number** | Speed of wind gust | [optional] [default to undefined]

## Example

```typescript
import { ForecastTimeInstant } from './api';

const instance: ForecastTimeInstant = {
    air_pressure_at_sea_level,
    air_temperature,
    cloud_area_fraction,
    cloud_area_fraction_high,
    cloud_area_fraction_low,
    cloud_area_fraction_medium,
    dew_point_temperature,
    fog_area_fraction,
    relative_humidity,
    wind_from_direction,
    wind_speed,
    wind_speed_of_gust,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
