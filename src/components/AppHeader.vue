<template>
  <header>
    <nav>
      <div class="nav-item">
        <button
          class="button button-outline"
          title="Automatically center the map view and zoom in to relevant data"
          @click="$root.$emit('fitView')"
        >
          Fit View
        </button>
      </div>
      <div class="nav-item">
        <LayersIcon size="1x" />
        <div class="dropdown">
          <button class="dropdown-button button" title="Show/hide layers">
            Layer Settings
          </button>
          <div class="dropdown-body">
            <label tabindex="0">
              <input
                type="checkbox"
                :checked="map.layers.last"
                @change="
                  setMapLayerVisibility({
                    layer: 'last',
                    visibility: $event.target.checked,
                  })
                "
              />
              Show last known locations
            </label>
            <label tabindex="0">
              <input
                type="checkbox"
                :checked="map.layers.line"
                @change="
                  setMapLayerVisibility({
                    layer: 'line',
                    visibility: $event.target.checked,
                  })
                "
              />
              Show location history (line)
            </label>
            <label tabindex="0">
              <input
                type="checkbox"
                :checked="map.layers.points"
                @change="
                  setMapLayerVisibility({
                    layer: 'points',
                    visibility: $event.target.checked,
                  })
                "
              />
              Show location history (points)
            </label>
            <label tabindex="0">
              <input
                type="checkbox"
                :checked="map.layers.heatmap"
                @change="
                  setMapLayerVisibility({
                    layer: 'heatmap',
                    visibility: $event.target.checked,
                  })
                "
              />
              Show location heatmap
            </label>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <CalendarIcon size="1x" />
        <Datepicker
          v-model="startDate"
          :use-utc="true"
          :disabled-dates="startDateDisabledDates"
          title="Select start date"
        />
        to
        <Datepicker
          v-model="endDate"
          :use-utc="true"
          :disabled-dates="endDateDisabledDates"
          title="Select end date"
        />
      </div>
      <div class="nav-item">
        <UserIcon size="1x" />
        <select
          v-model="selectedUser"
          class="dropdown-button button"
          title="Select user"
        >
          <option :value="null">
            Show All
          </option>
          <option v-for="user in users" :value="user" :key="user">
            {{ user }}
          </option>
        </select>
      </div>
      <div v-if="selectedUser" class="nav-item">
        <SmartphoneIcon size="1x" />
        <select
          v-model="selectedDevice"
          class="dropdown-button button"
          title="Select device"
        >
          <option :value="null">
            Show All
          </option>
          <option
            v-for="device in devices[selectedUser]"
            :value="device"
            :key="`${selectedUser}-${device}`"
          >
            {{ device }}
          </option>
        </select>
      </div>
    </nav>
    <nav class="nav-shrink">
      <div class="nav-item">
        <button
          class="button button-flat button-icon"
          title="Download raw data"
          @click="
            setModalVisibility({
              modal: 'download',
              visibility: true,
            })
          "
        >
          <DownloadIcon size="1x" />
        </button>
      </div>
      <div class="nav-item">
        <button
          class="button button-flat button-icon"
          title="Information"
          @click="
            setModalVisibility({
              modal: 'information',
              visibility: true,
            })
          "
        >
          <InfoIcon size="1x" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import {
  CalendarIcon,
  DownloadIcon,
  InfoIcon,
  LayersIcon,
  SmartphoneIcon,
  UserIcon,
} from "vue-feather-icons";
import Datepicker from "vuejs-datepicker";

import * as types from "@/store/mutation-types";

export default {
  components: {
    CalendarIcon,
    DownloadIcon,
    InfoIcon,
    LayersIcon,
    SmartphoneIcon,
    UserIcon,
    Datepicker,
  },
  computed: {
    ...mapState(["users", "devices", "map"]),
    ...mapGetters(["startDateDisabledDates", "endDateDisabledDates"]),
    selectedUser: {
      get() {
        return this.$store.state.selectedUser;
      },
      set(value) {
        this.setSelectedUser(value);
      },
    },
    selectedDevice: {
      get() {
        return this.$store.state.selectedDevice;
      },
      set(value) {
        this.setSelectedDevice(value);
      },
    },
    startDate: {
      get() {
        return this.$store.state.startDate;
      },
      set(value) {
        this.setStartDate(value);
      },
    },
    endDate: {
      get() {
        return this.$store.state.endDate;
      },
      set(value) {
        this.setEndDate(value);
      },
    },
  },
  methods: {
    ...mapMutations({
      setMapLayerVisibility: types.SET_MAP_LAYER_VISIBILITY,
      setModalVisibility: types.SET_MODAL_VISIBILITY,
    }),
    ...mapActions([
      "setSelectedUser",
      "setSelectedDevice",
      "setStartDate",
      "setEndDate",
    ]),
  },
};
</script>
