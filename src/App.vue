<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <DownloadModal />
    <InformationModal />
    <LoadingModal />
  </div>
</template>

<style lang="scss">
@import "styles/main";
</style>

<script>
import { mapActions } from "vuex";

import * as types from "@/store/mutation-types";
import { log } from "@/logging";
import AppHeader from "@/components/AppHeader";
import DownloadModal from "@/components/modals/Download";
import InformationModal from "@/components/modals/Information";
import LoadingModal from "@/components/modals/Loading";

export default {
  components: { AppHeader, DownloadModal, InformationModal, LoadingModal },
  created() {
    document.documentElement.style.setProperty(
      "--color-primary",
      this.$config.primaryColor
    );
    this.populateStateFromQuery(this.$route.query);
    this.loadData();
    // Update URL query params when relevant values changes
    this.$store.subscribe(mutation => {
      if (
        [
          types.SET_SELECTED_USER,
          types.SET_SELECTED_DEVICE,
          types.SET_START_DATE_TIME,
          types.SET_END_DATE_TIME,
          types.SET_MAP_CENTER,
          types.SET_MAP_ZOOM,
          types.SET_MAP_LAYER_VISIBILITY,
        ].includes(mutation.type)
      ) {
        this.updateUrlQuery();
      }

      if (mutation.type === types.SET_IS_LOADING) {
        this.$store.state.isLoading
          ? this.$modal.show("loading")
          : this.$modal.hide("loading");
      }
    });
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
        startDateTime: start,
        endDateTime: end,
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
        start,
        end,
        ...(user !== null && { user }),
        ...(user !== null && device !== null && { device }),
        ...(activeLayers.length > 0 && { layers: activeLayers.join(",") }),
      };
      log("STATE", "Updating URL query from state");
      log(
        "STATE",
        JSON.parse(JSON.stringify({ map, start, end, user, device }))
      );
      this.$router.replace({ query }).catch(() => {}); // https://github.com/vuejs/vue-router/issues/2872#issuecomment-519073998
    },
  },
};
</script>
