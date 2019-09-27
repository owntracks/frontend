<template>
  <LMap
    ref="map"
    :center="map.center"
    :zoom="map.zoom"
    @update:center="setMapCenter"
    @update:zoom="setMapZoom"
  >
    <LControlZoom
      v-if="controls.zoom.display"
      :position="controls.zoom.position"
    />
    <LControlScale
      v-if="controls.scale.display"
      :position="controls.scale.position"
      :maxWidth="controls.scale.maxWidth"
      :metric="controls.scale.metric"
      :imperial="controls.scale.imperial"
    />
    <LTileLayer
      :url="url"
      :attribution="attribution"
      :options="{ maxNativeZoom, maxZoom }"
    />

    <template v-if="map.layers.last">
      <LCircle
        v-for="l in lastLocations"
        :key="`${l.topic}-circle`"
        :lat-lng="{ lat: l.lat, lng: l.lon }"
        :radius="l.acc"
        :color="circle.color"
        :fill-color="circle.fillColor"
        :fill-opacity="circle.fillOpacity"
      />

      <LMarker
        v-for="l in lastLocations"
        :key="`${l.topic}-marker`"
        :lat-lng="[l.lat, l.lon]"
      >
        <LDeviceLocationPopup
          :user="l.username"
          :device="l.device"
          :name="l.name"
          :face="l.face"
          :timestamp="l.tst"
          :lat="l.lat"
          :lon="l.lon"
          :alt="l.alt"
          :battery="l.batt"
          :speed="l.vel"
        />
      </LMarker>
    </template>

    <template v-if="map.layers.line">
      <LPolyline
        v-for="(group, i) in locationHistoryLatLngGroups"
        :key="i"
        :lat-lngs="group"
        :color="polyline.color"
        :fill-color="polyline.fillColor"
      />
    </template>

    <template v-if="map.layers.points">
      <template v-for="(userDevices, user) in locationHistory">
        <template v-for="(deviceLocations, device) in userDevices">
          <LCircleMarker
            v-for="(l, n) in deviceLocations"
            :key="`${user}-${device}-${n}`"
            :lat-lng="[l.lat, l.lon]"
            :radius="circleMarker.radius"
            :color="circleMarker.color"
            :fill-color="circleMarker.fillColor"
            :fill-opacity="circleMarker.fillOpacity"
          >
            <LDeviceLocationPopup
              :user="user"
              :device="device"
              :timestamp="l.tst"
              :lat="l.lat"
              :lon="l.lon"
              :alt="l.alt"
              :battery="l.batt"
              :speed="l.vel"
            ></LDeviceLocationPopup>
          </LCircleMarker>
        </template>
      </template>
    </template>

    <template v-if="map.layers.heatmap">
      <LHeatmap
        v-if="locationHistoryLatLngs.length"
        :lat-lng="locationHistoryLatLngs"
        :max="heatmap.max"
        :radius="heatmap.radius"
        :blur="heatmap.blur"
        :gradient="heatmap.gradient"
      />
    </template>
  </LMap>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import L from "leaflet";
import "leaflet.heat";
import {
  LMap,
  LTileLayer,
  LControlScale,
  LControlZoom,
  LMarker,
  LCircleMarker,
  LCircle,
  LPolyline,
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import LHeatmap from "vue2-leaflet-heatmap";

import * as types from "@/store/mutation-types";
import config from "@/config";
import LDeviceLocationPopup from "@/components/LDeviceLocationPopup";

// See https://github.com/KoRiGaN/Vue2Leaflet/issues/28#issuecomment-299038157
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default {
  components: {
    LMap,
    LTileLayer,
    LControlScale,
    LControlZoom,
    LMarker,
    LCircleMarker,
    LCircle,
    LPolyline,
    LDeviceLocationPopup,
    LHeatmap,
  },
  data() {
    return {
      center: this.$store.state.map.center,
      zoom: this.$store.state.map.zoom,
      maxNativeZoom: config.map.maxNativeZoom,
      maxZoom: config.map.maxZoom,
      url: config.map.url,
      attribution: config.map.attribution,
      controls: config.map.controls,
      polyline: {
        ...config.map.polyline,
        color: config.map.polyline.color || config.accentColor,
      },
      circle: {
        ...config.map.circle,
        color: config.map.circle.color || config.accentColor,
        fillColor: config.map.circle.fillColor || config.accentColor,
      },
      circleMarker: {
        ...config.map.circleMarker,
        color: config.map.circleMarker.color || config.accentColor,
      },
      heatmap: config.map.heatmap,
    };
  },
  mounted() {
    this.$root.$on("fitView", () => {
      this.fitView();
    });
  },
  computed: {
    ...mapGetters(["locationHistoryLatLngs", "locationHistoryLatLngGroups"]),
    ...mapState(["lastLocations", "locationHistory", "map"]),
  },
  methods: {
    ...mapMutations({
      setMapCenter: types.SET_MAP_CENTER,
      setMapZoom: types.SET_MAP_ZOOM,
    }),
    fitView() {
      if (
        (this.map.layers.line ||
          this.map.layers.loints ||
          this.map.layers.heatmap) &&
        this.locationHistoryLatLngs.length > 0
      ) {
        this.$refs.map.mapObject.fitBounds(
          new L.LatLngBounds(this.locationHistoryLatLngs)
        );
      } else if (this.map.layers.last && this.lastLocations.length > 0) {
        const locations = this.lastLocations.map(l => L.latLng(l.lat, l.lon));
        this.$refs.map.mapObject.fitBounds(new L.LatLngBounds(locations), {
          maxZoom: this.maxNativeZoom,
        });
      }
    },
  },
};
</script>
