# MetadataApi

All URIs are relative to *http://localhost/weatherapi/locationforecast/2.0*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changelogGet**](#changelogget) | **GET** /changelog | |
|[**healthzGet**](#healthzget) | **GET** /healthz | |
|[**locationsGet**](#locationsget) | **GET** /locations | |
|[**schemaGet**](#schemaget) | **GET** /schema | |

# **changelogGet**
> changelogGet()

RSS feed of changes to this product

### Example

```typescript
import {
    MetadataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MetadataApi(configuration);

const { status, data } = await apiInstance.changelogGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **healthzGet**
> healthzGet()

Check health status for product

### Example

```typescript
import {
    MetadataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MetadataApi(configuration);

const { status, data } = await apiInstance.healthzGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **locationsGet**
> locationsGet()

List available locations as GeoJSON FeatureCollection

### Example

```typescript
import {
    MetadataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MetadataApi(configuration);

const { status, data } = await apiInstance.locationsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **schemaGet**
> schemaGet()

Schema for XML data

### Example

```typescript
import {
    MetadataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MetadataApi(configuration);

const { status, data } = await apiInstance.schemaGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

