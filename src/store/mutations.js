import * as types from "@/store/mutation-types";

export default {
  [types.SET_RECORDER_VERSION](state, version) {
    state.recorderVersion = version;
  },
  [types.SET_USERS](state, users) {
    state.users = users;
  },
  [types.SET_DEVICES](state, devices) {
    state.devices = devices;
  },
  [types.SET_LAST_LOCATIONS](state, lastLocations) {
    state.lastLocations = lastLocations;
  },
  [types.SET_LOCATION_HISTORY](state, locationHistory) {
    state.locationHistory = locationHistory;
  },
  [types.SET_SELECTED_USER](state, selectedUser) {
    state.selectedUser = selectedUser;
  },
  [types.SET_SELECTED_DEVICE](state, selectedDevice) {
    state.selectedDevice = selectedDevice;
  },
  [types.SET_START_DATE](state, startDate) {
    state.startDate = startDate;
  },
  [types.SET_END_DATE](state, endDate) {
    state.endDate = endDate;
  },
  [types.SET_MAP_CENTER](state, center) {
    state.map.center = center;
  },
  [types.SET_MAP_ZOOM](state, zoom) {
    state.map.zoom = zoom;
  },
  [types.SET_MAP_LAYER_VISIBILITY](state, { layer, visibility }) {
    state.map.layers[layer] = visibility;
  },
};
