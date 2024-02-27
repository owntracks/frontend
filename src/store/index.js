import Vue from "vue";
import Vuex from "vuex";

import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import config from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    frontendVersion: import.meta.env.PACKAGE_VERSION,
    recorderVersion: "",
    users: [],
    devices: {},
    lastLocations: [],
    locationHistory: {},
    selectedUser: config.selectedUser,
    selectedDevice: config.selectedUser !== null ? config.selectedDevice : null,
    // Convert to UTC and get rid of milliseconds
    startDateTime: config.startDateTime.toISOString().slice(0, 19),
    endDateTime: config.endDateTime.toISOString().slice(0, 19),
    map: {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 19,
      layers: config.map.layers,
    },
    distanceTravelled: 0,
    elevationGain: 0,
    elevationLoss: 0,
    requestAbortController: null,
  },
  getters,
  mutations,
  actions,
});
