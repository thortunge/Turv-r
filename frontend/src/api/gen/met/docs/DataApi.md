# DataApi

All URIs are relative to *http://localhost/weatherapi/locationforecast/2.0*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**classicFormatGet**](#classicformatget) | **GET** /classic.{format} | |
|[**classicGet**](#classicget) | **GET** /classic | |
|[**compactFormatGet**](#compactformatget) | **GET** /compact.{format} | |
|[**compactGet**](#compactget) | **GET** /compact | |
|[**completeFormatGet**](#completeformatget) | **GET** /complete.{format} | |
|[**completeGet**](#completeget) | **GET** /complete | |
|[**statusFormatGet**](#statusformatget) | **GET** /status.{format} | |
|[**statusGet**](#statusget) | **GET** /status | |

# **classicFormatGet**
> string classicFormatGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let lat: number; //Latitude (default to undefined)
let lon: number; //Longitude (default to undefined)
let format: 'xml'; //format code (file extension) (default to undefined)
let altitude: number; //Whole meters above sea level (optional) (default to undefined)

const { status, data } = await apiInstance.classicFormatGet(
    lat,
    lon,
    format,
    altitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lat** | [**number**] | Latitude | defaults to undefined|
| **lon** | [**number**] | Longitude | defaults to undefined|
| **format** | [**&#39;xml&#39;**]**Array<&#39;xml&#39;>** | format code (file extension) | defaults to undefined|
| **altitude** | [**number**] | Whole meters above sea level | (optional) defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/xml


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **classicGet**
> string classicGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let lat: number; //Latitude (default to undefined)
let lon: number; //Longitude (default to undefined)
let altitude: number; //Whole meters above sea level (optional) (default to undefined)

const { status, data } = await apiInstance.classicGet(
    lat,
    lon,
    altitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lat** | [**number**] | Latitude | defaults to undefined|
| **lon** | [**number**] | Longitude | defaults to undefined|
| **altitude** | [**number**] | Whole meters above sea level | (optional) defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/xml


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **compactFormatGet**
> METJSONForecast compactFormatGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let lat: number; //Latitude (default to undefined)
let lon: number; //Longitude (default to undefined)
let format: 'json'; //format code (file extension) (default to undefined)
let altitude: number; //Whole meters above sea level (optional) (default to undefined)

const { status, data } = await apiInstance.compactFormatGet(
    lat,
    lon,
    format,
    altitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lat** | [**number**] | Latitude | defaults to undefined|
| **lon** | [**number**] | Longitude | defaults to undefined|
| **format** | [**&#39;json&#39;**]**Array<&#39;json&#39;>** | format code (file extension) | defaults to undefined|
| **altitude** | [**number**] | Whole meters above sea level | (optional) defaults to undefined|


### Return type

**METJSONForecast**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json;charset=UTF-8


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **compactGet**
> METJSONForecast compactGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let lat: number; //Latitude (default to undefined)
let lon: number; //Longitude (default to undefined)
let altitude: number; //Whole meters above sea level (optional) (default to undefined)

const { status, data } = await apiInstance.compactGet(
    lat,
    lon,
    altitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lat** | [**number**] | Latitude | defaults to undefined|
| **lon** | [**number**] | Longitude | defaults to undefined|
| **altitude** | [**number**] | Whole meters above sea level | (optional) defaults to undefined|


### Return type

**METJSONForecast**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json;charset=UTF-8


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **completeFormatGet**
> METJSONForecast completeFormatGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let lat: number; //Latitude (default to undefined)
let lon: number; //Longitude (default to undefined)
let format: 'json'; //format code (file extension) (default to undefined)
let altitude: number; //Whole meters above sea level (optional) (default to undefined)

const { status, data } = await apiInstance.completeFormatGet(
    lat,
    lon,
    format,
    altitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lat** | [**number**] | Latitude | defaults to undefined|
| **lon** | [**number**] | Longitude | defaults to undefined|
| **format** | [**&#39;json&#39;**]**Array<&#39;json&#39;>** | format code (file extension) | defaults to undefined|
| **altitude** | [**number**] | Whole meters above sea level | (optional) defaults to undefined|


### Return type

**METJSONForecast**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json;charset=UTF-8


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **completeGet**
> METJSONForecast completeGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let lat: number; //Latitude (default to undefined)
let lon: number; //Longitude (default to undefined)
let altitude: number; //Whole meters above sea level (optional) (default to undefined)

const { status, data } = await apiInstance.completeGet(
    lat,
    lon,
    altitude
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lat** | [**number**] | Latitude | defaults to undefined|
| **lon** | [**number**] | Longitude | defaults to undefined|
| **altitude** | [**number**] | Whole meters above sea level | (optional) defaults to undefined|


### Return type

**METJSONForecast**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json;charset=UTF-8


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **statusFormatGet**
> string statusFormatGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let format: 'json'; //format code (file extension) (default to undefined)

const { status, data } = await apiInstance.statusFormatGet(
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **format** | [**&#39;json&#39;**]**Array<&#39;json&#39;>** | format code (file extension) | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json;charset=UTF-8


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **statusGet**
> string statusGet()

Weather forecast for a specified place

### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

const { status, data } = await apiInstance.statusGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json;charset=UTF-8


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**204** | 204 No Content |  -  |
|**400** | 400 Bad Request |  -  |
|**401** | 401 Unauthorized |  -  |
|**403** | 403 Forbidden |  -  |
|**404** | 404 Not Found |  -  |
|**422** | 422 Unprocessable Entity |  -  |
|**429** | 429 Too Many Requests |  -  |
|**500** | 500 Internal Server Error |  -  |
|**502** | 502 Bad Gateway |  -  |
|**503** | 503 Service Unavailable |  -  |
|**504** | 504 Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

