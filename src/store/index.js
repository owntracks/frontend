import Vue from "vue";
import Vuex from "vuex";

import getters from "@/store/getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import config from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    frontendVersion: process.env.PACKAGE_VERSION,
    recorderVersion: "",
    users: [],
    devices: {},
    lastLocations: [],
    locationHistory: {},
    selectedUser: config.selectedUser,
    selectedDevice: config.selectedUser !== null ? config.selectedDevice : null,
    startDate: config.startDate,
    endDate: config.endDate,
    map: {
      center: config.map.center,
      zoom: config.map.zoom,
      layers: config.map.layers,
    },
  },
  getters,
  mutations,
  actions,
});
