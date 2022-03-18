<template>
  <LMap
    ref="map"
    :center="map.center"
    :zoom="map.zoom"
    :options="{ zoomControl: false }"
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
      :tileSize="tileSize"
      :options="{ maxNativeZoom, maxZoom, zoomOffset }"
    />

    <template v-if="map.layers.last">
      <LCircle
        v-for="l in lastLocations"
        :key="`${l.topic}-circle`"
        :lat-lng="[l.lat, l.lon]"
        :radius="l.acc"
        v-bind="circle"
      />

      <LMarker
        v-for="l in lastLocations"
        :key="`${l.topic}-marker`"
        :lat-lng="[l.lat, l.lon]"
        :icon="markerIcon"
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
          :regions="l.inregions"
          :wifi="{ ssid: l.SSID, bssid: l.BSSID }"
          :options="{ className: 'leaflet-popup--for-pin' }"
          :address="l.addr"
        />
      </LMarker>
    </template>

    <template v-if="map.layers.line">
      <LPolyline
        v-for="(group, i) in filteredLocationHistoryLatLngGroups"
        :key="i"
        :lat-lngs="group"
        v-bind="polyline"
      />
    </template>

    <template v-if="map.layers.points">
      <template v-for="(userDevices, user) in filteredLocationHistory">
        <template v-for="(deviceLocations, device) in userDevices">
          <LCircleMarker
            v-for="(l, n) in deviceLocationsWithNameAndFace(
              user,
              device,
              deviceLocations
            )"
            :key="`${user}-${device}-${n}`"
            :lat-lng="[l.lat, l.lon]"
            v-bind="circleMarker"
          >
            <LDeviceLocationPopup
              :user="user"
              :device="device"
              :name="l.name"
              :face="l.face"
              :timestamp="l.tst"
              :lat="l.lat"
              :lon="l.lon"
              :alt="l.alt"
              :battery="l.batt"
              :speed="l.vel"
              :regions="l.inregions"
              :wifi="{ ssid: l.SSID, bssid: l.BSSID }"
              :address="l.addr"
            ></LDeviceLocationPopup>
          </LCircleMarker>
        </template>
      </template>
    </template>

    <template v-if="map.layers.heatmap">
      <LHeatmap
        v-if="filteredLocationHistoryLatLngs.length"
        :lat-lng="filteredLocationHistoryLatLngs"
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
import * as types from "@/store/mutation-types";
import LCustomMarker from "@/components/LCustomMarker";
import LHeatmap from "@/components/LHeatmap";
import LDeviceLocationPopup from "@/components/LDeviceLocationPopup";

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
      attribution: this.$config.map.attribution,
      center: this.$store.state.map.center,
      controls: this.$config.map.controls,
      heatmap: this.$config.map.heatmap,
      markerIcon: LCustomMarker,
      maxZoom: this.$config.map.maxZoom,
      maxNativeZoom: this.$config.map.maxNativeZoom,
      tileSize: this.$config.map.tileSize,
      url: this.$config.map.url,
      zoom: this.$store.state.map.zoom,
      zoomOffset: this.$config.map.zoomOffset,
      circle: {
        ...this.$config.map.circle,
        color: this.$config.map.circle.color || this.$config.primaryColor,
        fillColor:
          this.$config.map.circle.fillColor || this.$config.primaryColor,
      },
      circleMarker: {
        ...this.$config.map.circleMarker,
        color: this.$config.map.circleMarker.color || this.$config.primaryColor,
      },
      polyline: {
        ...this.$config.map.polyline,
        color: this.$config.map.polyline.color || this.$config.primaryColor,
      },
    };
  },
  mounted() {
    this.$root.$on("fitView", () => {
      this.fitView();
    });
  },
  computed: {
    ...mapGetters([
      "filteredLocationHistory",
      "filteredLocationHistoryLatLngs",
      "filteredLocationHistoryLatLngGroups",
    ]),
    ...mapState(["lastLocations", "map"]),
  },
  methods: {
    ...mapMutations({
      setMapCenter: types.SET_MAP_CENTER,
      setMapZoom: types.SET_MAP_ZOOM,
    }),
    /**
     * Fit all objects on the map into view.
     */
    fitView() {
      if (
        (this.map.layers.line ||
          this.map.layers.points ||
          this.map.layers.heatmap) &&
        this.filteredLocationHistoryLatLngs.length > 0
      ) {
        this.$refs.map.mapObject.fitBounds(
          new L.LatLngBounds(this.filteredLocationHistoryLatLngs)
        );
      } else if (this.map.layers.last && this.lastLocations.length > 0) {
        const locations = this.lastLocations.map((l) => L.latLng(l.lat, l.lon));
        this.$refs.map.mapObject.fitBounds(new L.LatLngBounds(locations), {
          maxZoom: this.maxNativeZoom,
        });
      }
    },
    /**
     * Find a the last location object for a user/device combination from the
     * local cache and backfill name and face attributes to each item from the
     * passed array of location objects.
     *
     * @param {User} user Username
     * @param {Device} device Device name
     * @param {OTLocation[]} deviceLocations Device name
     * @returns {OTLocation[]} Updated locations
     */
    deviceLocationsWithNameAndFace(user, device, deviceLocations) {
      const lastLocation = this.lastLocations.find(
        (l) => l.username === user && l.device === device
      );
      if (!lastLocation) {
        return deviceLocations;
      }
      return deviceLocations.map((l) => ({
        ...l,
        name: lastLocation.name,
        face: lastLocation.face,
      }));
    },
  },
  watch: {
    lastLocations() {
      if (this.$config.onLocationChange.fitView) {
        this.fitView();
      }
    },
    filteredLocationHistory() {
      this.fitView();
    },
  },
};
</script>
