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
            <span>
              <button id="goto-yr-button" @click="goToYr">Yr</button>
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
                <div class="day-graph-container">
                  <canvas class="day-graph day-graph-temperature"></canvas>
                </div>
                <div class="day-graph-container">
                  <canvas class="day-graph day-graph-rain"></canvas>
                </div>
                <div v-if="getDailiyData(day.dayjs)">
                  <div class="infront-of-cha">
                    {{ getDailiyData(day.dayjs)?.weightedPercipitationMax.toFixed(0) }} mm
                  </div>
                  <div class="infront-of-cha">
                    {{ getDailiyData(day.dayjs)?.tempMax.toFixed(0) }}°C
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
import { Chart, type ChartOptions } from 'chart.js/auto'

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
  tempMin: number;
  tempMax: number;
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
const lineChartArray: Chart[] = [];
const barChartArray: Chart[] = [];
const baseFormat = 'YYYY-MM-DD HH:mm:ss'
const dateWithoutTimeFormat = 'YYYY-MM-DD'
const selectedLocation = ref<ManualWeatherSpot>()
const galdHoPiggenSpot = { lat: 61.63615640427303, lng: 8.312659263610842, description: 'Galdhøpiggen' }

function goToYr(e: MouseEvent){
  if( !selectedLocation.value) return;
  const { lat, lng } = selectedLocation.value;
  const yrUrl = `https://www.yr.no/en/forecast/daily-table/${lat.toFixed(3)},${lng.toFixed(3)}`;
  location.href = yrUrl;
  e.preventDefault();
}

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

watch(searchDate, recalculateMarkers)

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
  tempMin: number;
  tempMax: number;
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
          windMax: 0,
          tempMin: 0,
          tempMax: 0
        }
        const rainMin = d.data.next_1_hours?.details.precipitation_amount_min || 0
        const rainMax = d.data.next_1_hours?.details.precipitation_amount_max || 0
        const rainProb = (d.data.next_1_hours?.details.probability_of_precipitation || 1)
        weatherDataDict[key].percipitationMin += rainMin
        weatherDataDict[key].percipitationMax += rainMax
        weatherDataDict[key].weightedPercipitationMin += rainProb * rainMin
        weatherDataDict[key].weightedPercipitationMax += rainProb * rainMax
        const wind = d.data.instant.details?.wind_speed || null;
        if (wind !== null) {
          weatherDataDict[key].wind = Math.min(weatherDataDict[key].wind, wind);
          weatherDataDict[key].windMax = Math.max(weatherDataDict[key].windMax, wind);
        }
        const temperature = d.data.instant.details?.wind_speed || null;
        if (temperature !== null) {
          weatherDataDict[key].tempMin = Math.min(weatherDataDict[key].tempMin, temperature);
          weatherDataDict[key].tempMax = Math.max(weatherDataDict[key].tempMax, temperature);
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
          windMax: keyData.windMax,
          tempMin: keyData.tempMin,
          tempMax: keyData.tempMax
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

  const rainBlue = "#134686"
  const warmColor = "#ED3F27"

  const lineChartOptions: ChartOptions = {
    scales: {
      x: { display: false },
      y: { display: false, max: 30, min: -30 },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    hover: { mode: undefined },
  }


  const lineChartDatasetSettings = {
    tension: 0.3,
    pointRadius: 0,
    borderWidth: 2,
    segment: {
      borderColor: (part: any) => {
        const prevValue = part.p0.parsed.y // start value
        const nextValue = part.p1.parsed.y // end value
        return prevValue < 0 || nextValue < 0 ? rainBlue : warmColor // return with a color by rule
      },
    }
  }

  const barChartOptions: ChartOptions = {
    scales: {
      x: { display: false },
      y: { display: false, max: 30, min: 0 },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    hover: { mode: undefined },
  }

  const barChartDatasetSettings = {
    tension: 0.3,
    pointRadius: 0,
    borderWidth: 2,
    borderColor: rainBlue,
    backgroundColor: rainBlue,
  }

  function leafletMarkerClicked(weatherSpot: ManualWeatherSpot) {
    selectedLocation.value = weatherSpot;
    const lineChartCanvases = document.querySelectorAll('.day-graph-temperature')
    const barChartCanvases = document.querySelectorAll('.day-graph-rain')
    const dayDayas = selectedLocation.value.weatherData;
    if (!dayDayas) return;
    let lineChartIndex = 0;
    let barChartIndex = 0;
    for (let day of dayArray.value) {
      const lineChartCanvas = lineChartCanvases[lineChartIndex] as HTMLCanvasElement;
      const parentRect = lineChartCanvas.parentElement?.getBoundingClientRect()
      if (parentRect) {
        lineChartCanvas.width = parentRect.width;
        lineChartCanvas.height = parentRect.height;
      }
      const dailyData = dayDayas.properties.timeseries.filter(t => {
        const hourDiff = dayjs(t.time).diff(day.dayjs, 'hour');
        return hourDiff <= 23 && hourDiff > 0
      })
      const tempData = dailyData.map(d => d.data.instant.details?.air_temperature || 0)
      const labels = new Array(tempData.length).fill(0).map((_, i) => i);
      if (lineChartArray[lineChartIndex]) lineChartArray[lineChartIndex].destroy();
      const lineChart = new Chart(
        lineChartCanvas,
        {
          type: 'line',
          data: {
            labels,
            datasets: [{
              ...lineChartDatasetSettings,
              data: tempData,
            },
            ],
          },
          options: lineChartOptions
        }
      )
      lineChartArray[lineChartIndex] = lineChart;
      lineChartIndex++
      /* BAR CHART --- */
      const barChartCanvas = barChartCanvases[barChartIndex] as HTMLCanvasElement;
      const barChartCanvasRect = barChartCanvas.parentElement?.getBoundingClientRect()
      if (barChartCanvasRect) {
        barChartCanvas.width = barChartCanvasRect.width;
        barChartCanvas.height = barChartCanvasRect.height;
      }

      if (barChartArray[barChartIndex]) barChartArray[barChartIndex].destroy();
      const rainData = dailyData.map(d => d.data.next_1_hours?.details.precipitation_amount_max || d.data.next_6_hours?.details.precipitation_amount_max || d.data.next_12_hours?.details.precipitation_amount_max || 0)
      const barChart = new Chart(
        barChartCanvas,
        {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              ...barChartDatasetSettings,
              data: rainData,
            },
            ],
          },
          options: barChartOptions
        }
      )
      barChartArray[barChartIndex] = barChart;
      barChartIndex++
    }
  }

  const tileLayer = 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png'
  const tileAttribution = '&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
  L.tileLayer(tileLayer, { attribution: tileAttribution }).addTo(map);

  async function onMapClicked() {
    // const lat = e.latlng.lat
    // const lng = e.latlng.lng
    // console.log(`{lat: ${lat}, lng: ${lng}, description: 'test'},`)
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
  grid-template-rows: 100px 1fr min-content;
  pointer-events: none;
  color: black;
}

#goto-yr-button{
  pointer-events: all;
}

#top-map-container {
  display: grid;
  grid-template-rows: 75px 1fr;
}

#middle-map-container {
  pointer-events: none;
}

#bottom-map-container {
  margin: 5px;
}

#calendar-container {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.4rem;
  z-index: 500;
  max-width: 500px;
  margin: 0 auto 0 auto;
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
  font-size: x-small;
  position: relative;
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

.day-graph-container {
  display: grid;
  grid-template-rows: 1fr;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
}

.day-graph-temperature {
  z-index: 4;
}

.day-graph-rain {
  z-index: 3;
}

.day-graph {
  width: 100%;
  height: 100%;
  z-index: 5;
}

.infront-of-chart {
  z-index: 10;
}
</style>
