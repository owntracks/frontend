<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <DownloadModal />
    <InformationModal />
  </div>
</template>

<style lang="scss">
@import "styles/main";
</style>

<script>
import { mapActions } from "vuex";

import config from "@/config";
import * as types from "@/store/mutation-types";
import AppHeader from "@/components/AppHeader";
import DownloadModal from "@/components/modals/Download";
import InformationModal from "@/components/modals/Information";

export default {
  components: { AppHeader, DownloadModal, InformationModal },
  created() {
    document.documentElement.style.setProperty(
      "--color-primary",
      config.primaryColor
    );
    this.populateStateFromQuery(this.$route.query);
    this.loadData();
    // Update URL query params when relevant values changes
    this.$store.subscribe(
      mutation =>
        [
          types.SET_SELECTED_USER,
          types.SET_SELECTED_DEVICE,
          types.SET_START_DATE,
          types.SET_END_DATE,
          types.SET_MAP_CENTER,
          types.SET_MAP_ZOOM,
          types.SET_MAP_LAYER_VISIBILITY,
        ].includes(mutation.type) && this.updateUrlQuery()
    );
    // Initially update URL query params from state
    this.updateUrlQuery();
  },
  methods: {
    ...mapActions(["populateStateFromQuery", "loadData"]),
    /**
     * Update all URL query parameters. This is called whenever any
     * of the relevant values change in the Vuex store.
     */
    updateUrlQuery() {
      const {
        map,
        startDate: start,
        endDate: end,
        selectedUser: user,
        selectedDevice: device,
      } = this.$store.state;
      const activeLayers = Object.keys(map.layers).filter(
        key => map.layers[key] === true
      );
      const query = {
        lat: map.center.lat,
        lng: map.center.lng,
        zoom: map.zoom,
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
        ...(user !== null && { user }),
        ...(user !== null && device !== null && { device }),
        ...(activeLayers.length > 0 && { layers: activeLayers.join(",") }),
      };
      this.$router.replace({ query }).catch(() => {}); // https://github.com/vuejs/vue-router/issues/2872#issuecomment-519073998
    },
  },
};
</script>
