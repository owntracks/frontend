<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <Modal name="download">
      Not implemented.
    </Modal>
    <Modal name="information">
      <ul>
        <li>
          <a href="https://github.com/owntracks/frontend">
            owntracks/frontend
          </a>
          ({{ frontendVersion }})
        </li>
        <li>
          <a href="https://github.com/owntracks/recorder">
            owntracks/recorder
          </a>
          ({{ recorderVersion }})
        </li>
        <li>
          <a href="https://owntracks.org/booklet/">
            OwnTracks Recorder Documentation
          </a>
        </li>
        <li>
          <a href="https://twitter.com/OwnTracks">@OwnTracks</a>
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

import config from "@/config";
import * as types from "@/store/mutation-types";
import AppHeader from "@/components/AppHeader";
import Modal from "@/components/Modal";

export default {
  components: { AppHeader, Modal },
  created() {
    document.documentElement.style.setProperty(
      "--color-primary",
      config.primaryColor
    );
    this.populateStateFromQuery(this.$route.query);
    this.loadData();
    // Update URL query params when relevant state changes
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
  computed: {
    ...mapState(["frontendVersion", "recorderVersion"]),
  },
  methods: {
    ...mapMutations({
      setModalVisibility: types.SET_MODAL_VISIBILITY,
    }),
    ...mapActions(["populateStateFromQuery", "loadData"]),
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

<style lang="scss">
@import "styles/main";
</style>
