<template>
  <div>
    <input type="range" v-model="timeOffset">
  </div>
  <div id="top-calendar-boy">
    <div v-for="(day, i) in myDays" :key="i" class="day-box" @click="selectDay(day)">
      <div>{{ day.format('dd') }}</div>
      <div>{{ day.format('D') }}</div>
    </div>
  </div>
  <div>
    {{ searchDate.format('dd D HH') }}
  </div>
  <div id="map"></div>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import { computed, onMounted, ref, watch } from 'vue'
import { type ForecastTimeStep, type ForecastTimeStepData, type METJSONForecast } from './api/gen/met';
import { manualAxios } from './api/metapi';
import { cabinRowToCabin, getCompactData, type UtCabin } from './api/utapi';
import { iconNameToIcon } from './leaflet.icons'
import dayjs, { Dayjs } from 'dayjs'
import Chart from 'chart.js/auto'

const timeOffset = ref(0)
const searchDate = computed<Dayjs>(() => {
  const offsetHour = 24 * timeOffset.value / 100.0
  return selectedDay.value.add(offsetHour, 'hour')
})

const cabins: UtCabin[] = []
const myDays = ref<Dayjs[]>([])
const selectedDay = ref<Dayjs>(setZeroTime(dayjs()))
const locations = ref<WeatherLocation[]>([])
let map: L.Map;
let chart: Chart;

type MapBounds = {
  _northEast: { lat: number, lng: number },
  _southWest: { lat: number, lng: number },
}

function setZeroTime(d: Dayjs): Dayjs {
  return d.set('hour', 0).set('minute', 0).set('second', 0)
}

function selectDay(day: Dayjs) {
  selectedDay.value = setZeroTime(day);
  timeOffset.value = 0
}

watch(selectedDay, timeUpdated)
watch(timeOffset, timeUpdated)

function timeUpdated() {
  for (const location of locations.value) {
    updateLocation(location as any)
  }
}

class WeatherLocation {
  lon!: number;
  lat!: number;
  data!: METJSONForecast;
  marker: L.Marker | undefined;
}

function updateLocation(weatherLocation: WeatherLocation) {
  const forcast = weatherLocation.data.properties;
  let closestForcast: ForecastTimeStep | undefined = undefined;
  for (const item of forcast.timeseries) {
    const forcastDatetime = dayjs(item.time)
    const distance = -searchDate.value.diff(forcastDatetime, 'minute');
    if (distance > 0) {
      closestForcast = item;
      break;
    }
  }
  if (!closestForcast) return;
  const forcaster =
    closestForcast.data.next_1_hours ||
    closestForcast.data.next_6_hours ||
    closestForcast.data.next_12_hours
  if (!forcaster) return;
  const symbolName = forcaster.summary.symbol_code
  if (!symbolName) return;
  const icon = iconNameToIcon[symbolName]
  if (!weatherLocation.marker) {
    weatherLocation.marker = L.marker([weatherLocation.lat, weatherLocation.lon], { icon }).addTo(map);
    weatherLocation.marker.addEventListener('click', e => {
      e.originalEvent.preventDefault();
      const ctx = document.getElementById('chart').getContext('2d');
      const getRain = (d: ForecastTimeStepData) => d.next_1_hours?.details.precipitation_amount || d.next_6_hours?.details.precipitation_amount || d.next_12_hours?.details.precipitation_amount
      const data = forcast.timeseries.map(t => {
        return [t.time, getRain(t.data) || 0]
      })
      if( chart ) chart.destroy()
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            data,
            fill: false,
            borderColor: '#36b7d1',
            tension: 0.3,
            pointRadius: 0
          }],
        },
        options: {
          scales: {
            x: { display: false },
            y: { display: false },
          },
        },
      })
    })
  } else {
    weatherLocation.marker.setIcon(icon)
  }
}

async function recalculateCabins() {
  const bounds = map.getBounds() as any as MapBounds;
  for (const cabin of cabins) {
    if (cabin.second !== 'g') continue;
    if (cabin.lat >= bounds._southWest.lat && cabin.lat <= bounds._northEast.lat && cabin.lng >= bounds._southWest.lng && cabin.lng <= bounds._northEast.lng) {
      let thisLocation: WeatherLocation | undefined = locations.value.find(l => l.lat === cabin.lat && l.lon === cabin.lng)
      if (!thisLocation) {
        const weatherResponse = await manualAxios.get<METJSONForecast>(`complete?lat=${cabin.lat}&lon=${cabin.lng}`)
        thisLocation = new WeatherLocation();
        thisLocation.lat = cabin.lat;
        thisLocation.lon = cabin.lng;
        thisLocation.data = weatherResponse.data;
        locations.value.push(thisLocation);
      }
      if (!thisLocation) return;
      updateLocation(thisLocation);
    }
  }
}

onMounted(async () => {
  myDays.value = Array(7).fill(null).map((_, i) => dayjs().add(i, 'day'))
  map = L.map('map')
  map.setView([63.4305, 10.3951], 7);
  const cabinsResponse = await getCompactData()
  for (const row of cabinsResponse.data.cabins) {
    cabins.push(cabinRowToCabin(row))
  }

  // a: Selvbetjent
  // b: Betjent
  // c: Ubetjent
  // d: ?? Private??
  // e: Serveringshytte
  // f: ???
  // g: Nødbu??

  L.tileLayer('https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png', {
    attribution: '&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
  }).addTo(map);

  recalculateCabins()
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

#chart {
  height: 200px;
  width: 100%;
}

#top-calendar-boy {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day-box {
  aspect-ratio: 1;
  background-color: rgb(167, 243, 255);
  border: 2px solid rgb(212, 212, 212);
  border-radius: 5px;
  align-self: center;
  cursor: pointer;
}
</style>
