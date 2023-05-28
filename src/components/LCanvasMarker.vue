<template>
  <div>
    <slot />
  </div>
</template>
<script>
/* eslint-disable */
import {
  optionsMerger,
  propsBinder,
  findRealParent,
  debounce,
} from "vue2-leaflet/dist/utils/utils.js";
import 'rbush';
import L from "leaflet";
import Layer from "vue2-leaflet/dist/mixins/Layer.js";
import Options from "vue2-leaflet/dist/mixins/Options.js";
import { marker, DomEvent, Icon, latLng } from "leaflet";
var rbush = require("rbush");
window.rbush = rbush;
import "./utils/leaflet-canvas-marker";

/**
 * Marker component, lets you add and personalize markers on the map
 */
export default {
  name: "LMarker",
  mixins: [Layer, Options],
  props: {
    pane: {
      type: String,
      default: "markerPane",
    },
    draggable: {
      type: Boolean,
      custom: true,
      default: false,
    },
    markers: {
      type: [Object, Array],
      custom: true,
      default: null,
    },
    icon: {
      type: [Object],
      custom: false,
      default: () => new Icon.Default(),
    },
    opacity: {
      type: Number,
      custom: false,
      default: 1.0,
    },
    zIndexOffset: {
      type: Number,
      custom: false,
      default: null,
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  beforeDestroy() {
    if (this.debouncedLatLngSync) {
      this.debouncedLatLngSync.cancel();
    }
  },
  mounted() {
    this.doJob();
    // Adds a layer
    this.ready = true;
    this.$nextTick(() => {
      /**
       * Triggers when the component is ready
       * @type {object}
       * @property {object} mapObject - reference to leaflet map object
       */
      this.$emit("ready", this.mapObject);
    });
  },
  methods: {
    doJob() {
      const options = optionsMerger(
        {
          ...this.layerOptions,
          icon: this.icon,
          zIndexOffset: this.zIndexOffset,
          draggable: this.draggable,
          opacity: this.opacity,
        },
        this
      );

      var myThis=this;
      // Map is undefined for a short time so we wait 100ms
      setTimeout(function(){
        // Marker definition
        myThis.mapObject = L.canvasIconLayer({}).addTo(
          myThis.$parent.$el.__vue__.mapObject
        );
        myThis.mapObject.addLayers(myThis.markers);
        myThis.mapObject.addOnClickListener((e) => {
          console.log(e);
        });
        DomEvent.on(myThis.mapObject, myThis.$listeners);
        myThis.debouncedLatLngSync = debounce(myThis.latLngSync, 100);
        myThis.mapObject.on("move", myThis.debouncedLatLngSync);
        propsBinder(myThis, myThis.mapObject, myThis.$options.props);
        myThis.parentContainer = findRealParent(myThis.$parent);
      }, 100); 
    },
    setDraggable(newVal, oldVal) {
      if (this.mapObject.dragging) {
        newVal
          ? this.mapObject.dragging.enable()
          : this.mapObject.dragging.disable();
      }
    },
    setLatLng(newVal) {
      if (newVal == null) {
        return;
      }

      if (this.mapObject) {
        const oldLatLng = this.mapObject.getLatLng();
        const newLatLng = latLng(newVal);
        if (
          newLatLng.lat !== oldLatLng.lat ||
          newLatLng.lng !== oldLatLng.lng
        ) {
          this.mapObject.setLatLng(newLatLng);
        }
      }
    },
    latLngSync(event) {
      this.$emit("update:latLng", event.latlng);
      this.$emit("update:lat-lng", event.latlng);
    },
  },
  render: function (h) {
    if (this.ready && this.$slots.default) {
      return h("div", { style: { display: "none" } }, this.$slots.default);
    }
    return null;
  },
  watch: {
    markers() {
      this.mapObject.clearLayers();
      this.doJob();
    },
  },
};
</script>

<docs>
## Demo
::: demo
<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng" ></l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.313220, -1.319482],
      markerLatLng: [47.313220, -1.319482]
    };
  }
}
</script>
:::
</docs>
