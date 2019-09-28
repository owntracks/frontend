<template>
  <LPopup>
    <div v-if="name" class="device">{{ name }}</div>
    <div v-else class="device">{{ user }}/{{ device }}</div>
    <div class="wrapper">
      <img v-if="face" :src="faceImageDataURI" />
      <ul class="info-list">
        <li>
          <ClockIcon size="1x" />
          {{ new Date(timestamp * 1000).toLocaleString() }}
        </li>
        <li>
          <MapPinIcon size="1x" />
          {{ lat }}, {{ lon }}, {{ alt }}m
        </li>
        <li v-if="address">
          <HomeIcon size="1x" />
          {{ address }}
        </li>
        <li v-if="typeof battery === 'number'">
          <BatteryIcon size="1x" />
          {{ battery }} %
        </li>
        <li v-if="typeof speed === 'number'">
          <ZapIcon size="1x" />
          {{ speed }} km/h
        </li>
      </ul>
    </div>
  </LPopup>
</template>

<style lang="scss" scoped>
.device {
  display: inline-block;
  position: relative;
  top: -5px;
  color: var(--color-primary);
  font-weight: bold;
}
.wrapper {
  display: flex;
  margin-top: 10px;
  margin-right: 20px;

  img {
    align-self: start;
    margin-right: 20px;
  }
}
</style>

<script>
import {
  BatteryIcon,
  ClockIcon,
  HomeIcon,
  MapPinIcon,
  ZapIcon,
} from "vue-feather-icons";
import { LPopup } from "vue2-leaflet";

export default {
  name: "LDeviceLocationPopup",
  components: {
    BatteryIcon,
    ClockIcon,
    HomeIcon,
    MapPinIcon,
    ZapIcon,
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
