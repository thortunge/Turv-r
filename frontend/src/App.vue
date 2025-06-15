<template>
  <div>
    <input type="range" v-model="timeOffset">
  </div>
  <div>
    {{ searchDate }}
  </div>
  <div id="map"></div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import { computed, onMounted, ref, watch } from 'vue'
import { type METJSONForecast} from './api/gen/met';
import { manualAxios } from './api/metapi';
import { cabinRowToCabin, getCompactData, type UtCabin } from './api/utapi';
import { iconNameToIcon } from './leaflet.icons'
import dayjs, { Dayjs }from 'dayjs'

const timeOffset = ref(0)
const now = ref<Dayjs>(dayjs())

const searchDate = computed<Dayjs>(() => {
  return now.value.add(timeOffset.value, 'hour')
})

const cabins: UtCabin[] = []
let map: L.Map;
let clickLatLng: L.LatLngExpression = [0, 0]
let clickMarker: L.Marker | undefined = undefined;
let clickData: METJSONForecast | undefined = undefined;
let markers: L.Marker[] = []

type MapBounds = {
  _northEast: { lat: number, lng: number },
  _southWest: { lat: number, lng: number },
}

watch(timeOffset, () => {
  if(!clickMarker || !map || !clickData) return;
    let idx = Math.min(timeOffset.value, clickData.properties.timeseries.length - 1)
    const symbolName = clickData.properties.timeseries[idx].data.next_1_hours?.summary.symbol_code
    if( !symbolName ) return;
    const icon = iconNameToIcon[symbolName]
    if( clickMarker){
      map.removeLayer(clickMarker)
    }
    if( icon){
      const marker = L.marker(clickLatLng, { icon }).addTo(map);
      clickMarker = marker
    }
    const rainNow = clickData.properties.timeseries[idx].data.next_1_hours?.details.probability_of_precipitation
    L.popup().setLatLng(clickLatLng).setContent(`<span>${rainNow}</span>`).openOn(map)
})

onMounted(async () => {
  map = L.map('map')
  map.setView([63.4305, 10.3951], 7); 
  const cabinsResponse = await getCompactData()
  for(const row of cabinsResponse.data.cabins){
    cabins.push(cabinRowToCabin(row))
  }

  // a: Selvbetjent
  // b: Betjent
  // c: Ubetjent
  // d: ?? Private??
  // e: Serveringshytte
  // f: ???
  // g: Nødbu??

  async function recalculateCabins(){
    const bounds = map.getBounds() as any as MapBounds;
    for(const marker of markers){ 
      map.removeLayer(marker)
    }
    markers = []
    for(const cabin of cabins){
      if( cabin.second !== 'g') continue;
      if( cabin.lat >= bounds._southWest.lat && cabin.lat <= bounds._northEast.lat && cabin.lng >= bounds._southWest.lng && cabin.lng <= bounds._northEast.lng){
        const weatherResponse = await manualAxios.get<METJSONForecast>(`compact?lat=${cabin.lat}&lon=${cabin.lng}`)
        let icon = iconNameToIcon['cloudy']
        const symbolName = weatherResponse.data.properties.timeseries[0].data.next_1_hours?.summary.symbol_code
        if( symbolName )
          icon = iconNameToIcon[symbolName]
        const marker = L.marker([cabin.lat, cabin.lng], {icon }).addTo(map);
        markers.push(marker);
      }
    }
  }

  L.tileLayer('https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png', {
    attribution: '&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
  }).addTo(map);
  
  async function onMapClicked(e: any){
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    clickLatLng = [lat, lng]
    const response = await manualAxios.get<METJSONForecast>(`complete?lat=${lat}&lon=${lng}`)
    clickData = response.data;
    const symbolName = clickData.properties.timeseries[0].data.next_1_hours?.summary.symbol_code
    if( !symbolName ) return;
    const icon = iconNameToIcon[symbolName]
    if( clickMarker){
      map.removeLayer(clickMarker)
    }
    if( icon){
      const marker = L.marker(clickLatLng, { icon }).addTo(map);
      clickMarker = marker
    }
    const rainNow = clickData.properties.timeseries[0].data.next_1_hours?.details.probability_of_precipitation
    L.popup().setLatLng(clickLatLng).setContent(`<span>${rainNow}</span>`).openOn(map)
  }

  recalculateCabins()
  map.addEventListener('click', onMapClicked)
  map.addEventListener('dragend', recalculateCabins)
  map.addEventListener('zoomend', recalculateCabins)
})
</script>

<style scoped>
#map {
  height: 800px;
  width: 600px;
  max-width: 100%;
  max-height: 100%;
}
</style>
