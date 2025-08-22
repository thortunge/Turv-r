<template>
  <div>
    <input type="range" v-model="timeOffset" :min="0" :max="23">
  </div>
  <div id="map-wrapper">
    <div id="map">
      <div id="map-overlay-container">
        <div id="top-map-container">
          <div v-if="selectedLocation" id="location-header-name">
            <span>
              {{ selectedLocation.description }}
            </span>
          </div>
        </div>
        <div id="middle-map-container">
        </div>
        <div id="bottom-map-container">
          <div id="calendar-container">
            <div v-for="day in dayArray" :key="day.dayjs.format(baseFormat)">
              <div class="calendar-day" @click="dayClicked(day.dayjs)"
                :class="{ 'selected-day': day.dayjs.format(dateWithoutTimeFormat) === selectedDate.format(dateWithoutTimeFormat), 'disabled-day': now.diff(day.dayjs, 'day') > 0 }">
                {{ day.dayjs.format('dd DD.') }}
                <div v-if="getDailiyData(day.dayjs)">
                  <div>
                    {{ getDailiyData(day.dayjs)?.weightedPercipitationMax.toFixed(0) }} mm
                  </div>
                  <div>
                    {{ getDailiyData(day.dayjs)?.windMax.toFixed(0) }} m/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import L, { type LatLngExpression } from 'leaflet'
import { computed, onMounted, ref, watch } from 'vue'
import { type METJSONForecast } from './api/gen/met';
import { manualAxios } from './api/metapi';
import { iconNameToIcon } from './leaflet.icons'
import dayjs, { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

const timeOffset = ref(0)
const selectedDate = ref(dayjs().hour(0).second(0).hour(0))
const now = ref<Dayjs>(dayjs())

const searchDate = computed<Dayjs>(() => {
  return selectedDate.value.add(timeOffset.value, 'hour')
})

let map: L.Map;

type DailyWeatherData = {
  dateString: string;
  percipitationMin: number;
  percipitationMax: number;
  weightedPercipitationMin: number;
  weightedPercipitationMax: number;
  wind: number;
  windMax: number;
}

type ManualWeatherSpot = {
  lat: number;
  lng: number;
  description: string;
  weatherData?: METJSONForecast;
  leafletMarker?: L.Marker<any>;
  dailyWeatherData?: DailyWeatherData[];
}

type DailyData = {
  dayjs: Dayjs;
  dailyWeatherData?: DailyWeatherData;
}

const dayArray = ref<DailyData[]>([])
const baseFormat = 'YYYY-MM-DD HH:mm:ss'
const dateWithoutTimeFormat = 'YYYY-MM-DD'
const selectedLocation = ref<ManualWeatherSpot>()

const galdHoPiggenSpot = { lat: 61.63615640427303, lng: 8.312659263610842, description: 'Galdhøpiggen' }

function getDailiyData(day: Dayjs) {
  if (!selectedLocation.value) return null;
  return selectedLocation.value.dailyWeatherData?.find(e => e.dateString === day.format(dateWithoutTimeFormat))
}

const weatherSpots: ManualWeatherSpot[] = [
  { lat: 63.321932906960214, lng: 10.453491210937502, description: 'Trondheim' },
  galdHoPiggenSpot,
  { lat: 63.00949691316362, lng: 12.16461181640625, description: 'Sylan' },
  { lat: 63.180700123710835, lng: 8.043365478515627, description: 'Tustna' },
  { lat: 61.878650307660216, lng: 9.797744750976564, description: 'Rondvassbu' },
  { lat: 63.295099351960275, lng: 11.357116699218752, description: 'Skarvan' },
  { lat: 63.91096303368066, lng: 12.219543457031252, description: 'Skjækerdalen' },
  { lat: 62.7212290027944, lng: 8.770523071289064, description: 'Innerdalen' },
  { lat: 62.82960242165454, lng: 9.240875244140627, description: 'Trollheimen' },
  { lat: 62.182809781895564, lng: 11.87347412109375, description: 'Femunden' },
  { lat: 63.290933283834896, lng: 9.078140258789064, description: 'Kyrksæterøra' },
  { lat: 62.64733879716517, lng: 10.741882324218752, description: 'Forollhogna' },
  { lat: 63.85005121783326, lng: 10.331268310546877, description: 'Fosen' },
  { lat: 64.00757580077239, lng: 10.62652587890625, description: 'Fosen Nord' },
  { lat: 62.363626830043756, lng: 9.096679687500002, description: 'Dovrefjell' },
  { lat: 62.418995772457635, lng: 10.022277832031252, description: 'Oppdal øst' },
  { lat: 63.41027571353263, lng: 11.852874755859377, description: 'Meråker' },
  { lat: 62.19562404557709, lng: 10.777587890625002, description: 'Tynset' },
]

watch(searchDate, () => recalculateMarkers())

function dayClicked(day: Dayjs) {
  if (day.diff(now.value, 'day') < 0) return;
  const dateKey = day.format(dateWithoutTimeFormat)
  selectedDate.value = day.hour(0).minute(0).second(0);
  timeOffset.value = 12;
  for (let item of weatherSpots) {
    if (!item.dailyWeatherData) continue;
    for (let thing of item.dailyWeatherData) {
      if (thing.dateString === dateKey) {
        continue;
      }
    }
  }
}

function recalculateMarkers() {
  if (!map) return;
  for (const data of weatherSpots) {
    if (!data.weatherData) continue
    const weatherData = data.weatherData;
    let idx = 0;
    for (const timeStep of weatherData.properties.timeseries) {
      const diff = searchDate.value.diff(dayjs(timeStep.time), 'hour')
      if (diff < 0) break;
      idx++;
    }
    idx = Math.min(idx, weatherData.properties.timeseries.length - 1)
    const dataPoint = weatherData.properties.timeseries[idx].data;
    let symbolName = dataPoint.next_1_hours?.summary.symbol_code
      || dataPoint.next_6_hours?.summary.symbol_code
      || dataPoint.next_12_hours?.summary.symbol_code
    if (!symbolName) return;
    const icon = iconNameToIcon[symbolName]
    if (icon && data.leafletMarker) {
      data.leafletMarker.setIcon(icon);
    }
  }
}

async function setUserPosition(): Promise<LatLngExpression | undefined> {
  if (!("geolocation" in navigator)) return Promise.resolve(undefined);
  return new Promise<LatLngExpression>((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latLng = [position.coords.latitude, position.coords.longitude] as LatLngExpression;
      map.setView(latLng, 7);
      return resolve(latLng)
    })
  });
}


function populateDayArray() {
  dayjs.extend(weekday)
  const now = dayjs();
  const firstOfThisWeek = now.weekday(1).hour(0).minute(0).second(0)
  const numDays = now.diff(firstOfThisWeek, 'day') + 10
  for (let i = 0; i < numDays; i++) {
    dayArray.value.push({ dayjs: firstOfThisWeek.add(i, 'day') })
  }
}

type ProtoGuy = {
  percipitationMax: number;
  percipitationMin: number;
  weightedPercipitationMin: number;
  weightedPercipitationMax: number;
  wind: number;
  windMax: number;
}

onMounted(async () => {
  map = L.map('map')
  map.setView([galdHoPiggenSpot.lat, galdHoPiggenSpot.lng], 7);
  setUserPosition();
  populateDayArray()
  await loadWeatherData();
  findGoodWeather();

  function findGoodWeather() {
    for (const weatherSpot of weatherSpots) {
      const weatherDataDict: { [key: string]: ProtoGuy } = {}
      const { weatherData } = weatherSpot
      if (!weatherData || !weatherData.properties) continue;
      for (const d of weatherData.properties.timeseries) {
        const t = dayjs(d.time).add(-2, 'hour');
        const key = t.format(dateWithoutTimeFormat)
        if (!weatherDataDict[key]) weatherDataDict[key] = {
          percipitationMax: 0,
          percipitationMin: 0,
          weightedPercipitationMax: 0,
          weightedPercipitationMin: 0,
          wind: 0,
          windMax: 0
        }
        const rainMin = d.data.next_1_hours?.details.precipitation_amount_min || 0
        const rainMax = d.data.next_1_hours?.details.precipitation_amount_max || 0
        const rainProb = (d.data.next_1_hours?.details.probability_of_precipitation || 1)
        const wind = d.data.instant.details?.wind_speed || null;
        weatherDataDict[key].percipitationMin += rainMin
        weatherDataDict[key].percipitationMax += rainMax
        weatherDataDict[key].weightedPercipitationMin += rainProb * rainMin
        weatherDataDict[key].weightedPercipitationMax += rainProb * rainMax
        if (wind !== null) {
          weatherDataDict[key].wind = Math.min(weatherDataDict[key].wind, wind);
          weatherDataDict[key].windMax = Math.max(weatherDataDict[key].windMax, wind);
        }
      }
      weatherSpot.dailyWeatherData = []
      for (const key of Object.keys(weatherDataDict)) {
        const keyData = weatherDataDict[key]
        weatherSpot.dailyWeatherData.push({
          percipitationMax: keyData.percipitationMax,
          percipitationMin: keyData.percipitationMin,
          dateString: key,
          weightedPercipitationMin: keyData.percipitationMin,
          weightedPercipitationMax: keyData.percipitationMax,
          wind: keyData.wind,
          windMax: keyData.windMax
        })
      }
    }
  }

  async function loadWeatherData() {
    for (const weatherSpot of weatherSpots) {
      const response = await manualAxios.get<METJSONForecast>(`complete?lat=${weatherSpot.lat}&lon=${weatherSpot.lng}`)
      const weatherData = response.data;
      weatherSpot.weatherData = weatherData;
      const symbolName = weatherData.properties.timeseries[0].data.next_1_hours?.summary.symbol_code
      if (!symbolName) return;
      const icon = iconNameToIcon[symbolName]
      if (icon) {
        weatherSpot.leafletMarker = L.marker([weatherSpot.lat, weatherSpot.lng], { icon }).addTo(map);
        weatherSpot.leafletMarker.addEventListener('click', _ => leafletMarkerClicked(weatherSpot))
      }
    }
  }

  function leafletMarkerClicked(weatherSpot: ManualWeatherSpot) {
    selectedLocation.value = weatherSpot;
  }

  const tileLayer = 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png'
  const tileAttribution = '&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
  L.tileLayer(tileLayer, { attribution: tileAttribution }).addTo(map);

  async function onMapClicked(e: any) {
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    console.log(`{lat: ${lat}, lng: ${lng}, description: 'test'},`)
    return;
  }

  map.addEventListener('click', onMapClicked)
})
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
}

#map-overlay-container {
  width: 100%;
  height: 100%;
  z-index: 500;
  display: grid;
  grid-template-rows: 100px 1fr 150px;
  pointer-events: none;
}

#top-map-container {
  display: grid;
  grid-template-rows: 75px 1fr;
}

#middle-map-container {
  pointer-events: none;
}

#calendar-container {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.4rem;
  z-index: 500;
  margin: 5px;
}

#map,
#map-overlay-container {
  position: absolute;
  top: 0;
  left: 0;
}

.calendar-day {
  aspect-ratio: 1;
  max-width: 60px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: 2px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  pointer-events: all;
}

.selected-day {
  background-color: #cfe882;
}

.disabled-day {
  background-color: #efdb9d
}

#location-header-name {
  font-size: x-large;
  margin-top: 10px;
}
</style>
