<template>
  <LPopup>
    <img v-if="face" class="location-popup-face" :src="faceImageDataURI" />
    <b v-if="name">{{ name }}</b>
    <b v-else>{{ user }}/{{ device }}</b>
    <div class="location-popup-detail">
      <span class="mdi mdi-16px mdi-calendar-clock"></span>
      {{ new Date(timestamp * 1000).toLocaleString() }}
    </div>
    <div class="location-popup-detail">
      <span class="mdi mdi-16px mdi-crosshairs-gps"></span>
      {{ lat }}, {{ lon }}, {{ alt }}m
    </div>
    <div v-if="address" class="location-popup-detail">
      <span class="mdi mdi-16px mdi-map-marker"></span>
      {{ address }}
    </div>
    <div v-if="typeof battery === 'number'" class="location-popup-detail">
      <span class="mdi mdi-16px mdi-battery"></span>
      {{ battery }} %
    </div>
    <div v-if="typeof speed === 'number'" class="location-popup-detail">
      <span class="mdi mdi-16px mdi-speedometer"></span>
      {{ speed }} km/h
    </div>
  </LPopup>
</template>

<script>
import { LPopup } from "vue2-leaflet";

export default {
  name: "LDeviceLocationPopup",
  components: {
    LPopup,
  },
  props: {
    user: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    face: {
      type: String,
      default: null,
    },
    timestamp: {
      type: Number,
      default: 0,
    },
    lat: {
      type: Number,
      default: 0,
    },
    lon: {
      type: Number,
      default: 0,
    },
    alt: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: null,
    },
    battery: {
      type: Number,
      default: null,
    },
    speed: {
      type: Number,
      default: null,
    },
  },
  computed: {
    faceImageDataURI() {
      return `data:image/png;base64,${this.face}`;
    },
  },
};
</script>