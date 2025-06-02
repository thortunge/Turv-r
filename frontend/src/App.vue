<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import { onMounted } from 'vue'
import { type METJSONForecast } from './api/gen';
import { weatherApi } from './api/gen/manualapi';
import { cabinRowToCabin, getCompactData, type UtCabin } from './api/utapi';

const cabins: UtCabin[] = []
let markers: L.Marker[] = []

onMounted(async () => {
  const map = L.map('map')
  map.setView([60.14, 10.25], 9); 

  const cabinsResponse = await getCompactData()
  for(const row of cabinsResponse.data.cabins){
    cabins.push(cabinRowToCabin(row))
  }

  L.tileLayer('https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png', {
    attribution: '&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
  }).addTo(map);
  
  map.addEventListener('click', async e => {
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    const response = await weatherApi.get<METJSONForecast>(`complete?lat=${lat}&lon=${lng}`)
    const rainNow = response.data.properties.timeseries[0].data.next_1_hours?.details.probability_of_precipitation
    L.popup().setLatLng([lat, lng]).setContent(`<span>${rainNow}</span>`).openOn(map)
  })

  
  map.addEventListener('dragend', () => {
    const bounds = map.getBounds() as any;
    for(const marker of markers){
      map.removeLayer(marker)
    }
    markers = []
    for(const cabin of cabins){
      if( cabin.lat >= bounds._southWest.lat && cabin.lat <= bounds._northEast.lat && cabin.lng >= bounds._southWest.lng && cabin.lng <= bounds._northEast.lng){
        const marker = L.marker([cabin.lat, cabin.lng]).addTo(map);
        markers.push(marker);
      }
    }
  })

})
</script>

<style scoped>
#map {
  height: 800px;
  width: 600px
}
</style>
