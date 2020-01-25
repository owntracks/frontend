<template>
  <LPopup>
    <div class="device">{{ deviceName }}</div>
    <div class="wrapper">
      <img v-if="face" :src="faceImageDataURI" alt="" />
      <ul class="info-list">
        <li :title="$t('Timestamp')">
          <ClockIcon size="1x" aria-hidden="true" role="img" />
          {{ new Date(timestamp * 1000).toLocaleString($config.locale) }}
        </li>
        <li :title="$t('Location')">
          <MapPinIcon size="1x" aria-hidden="true" role="img" />
          {{ lat }}
          <br />
          {{ lon }}
          <br />
          {{ alt }}m
        </li>
        <li v-if="address" :title="$t('Address')">
          <HomeIcon size="1x" aria-hidden="true" role="img" />
          {{ address }}
        </li>
        <li v-if="typeof battery === 'number'" :title="$t('Battery')">
          <BatteryIcon size="1x" aria-hidden="true" role="img" />
          {{ battery }} %
        </li>
        <li v-if="typeof speed === 'number'" :title="$t('Speed')">
          <ZapIcon size="1x" aria-hidden="true" role="img" />
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
    /**
     * Return the face image as a data URI string which can be used for an image's src attribute.
     *
     * @return {String} base64-encoded face image data URI
     */
    faceImageDataURI() {
      return `data:image/png;base64,${this.face}`;
    },
    /**
     * Return the device name for displaying with <user identifier>/<device identifier> as fallback.
     *
     * @return {String} device name for displaying
     */
    deviceName() {
      return this.name ? this.name : `${this.user}/${this.device}`;
    },
  },
};
</script>
