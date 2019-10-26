<template>
  <div />
</template>

<style scoped>
div {
  display: none;
}
</style>

<script>
// See https://github.com/KoRiGaN/Vue2Leaflet/blob/e0cf0f29bc519f0a70f0f1eb6e579f947e7ea4ce/src/utils/utils.js
// to understand the `custom` attribute of each prop, how the `set<Prop>`
// methods are being used and why `mapObject` has to be named `mapObject`.

import { findRealParent, propsBinder } from "vue2-leaflet";
import L, { DomEvent } from "leaflet";
import "leaflet.heat";

const props = {
  latLng: {
    type: Array,
    default: () => [],
    custom: false,
  },
  minOpacity: {
    type: Number,
    custom: true,
    default: 0.05,
  },
  maxZoom: {
    type: Number,
    custom: true,
    default: 18,
  },
  radius: {
    type: Number,
    custom: true,
    default: 25,
  },
  blur: {
    type: Number,
    custom: true,
    default: 15,
  },
  max: {
    type: Number,
    custom: true,
    default: 1.0,
  },
  gradient: {
    type: Object,
    custom: true,
    default: null,
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  },
};

export default {
  props,
  mounted() {
    const options = {};
    if (this.minOpacity) {
      options.minOpacity = this.minOpacity;
    }
    if (this.maxZoom) {
      options.maxZoom = this.maxZoom;
    }
    if (this.radius) {
      options.radius = this.radius;
    }
    if (this.blur) {
      options.blur = this.blur;
    }
    if (this.max) {
      options.max = this.max;
    }
    if (this.gradient) {
      options.gradient = this.gradient;
    }
    this.mapObject = L.heatLayer(this.latLng, options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
    this.$watch(
      "latLng",
      newVal => {
        this.mapObject.setLatLngs(newVal);
      },
      { deep: true }
    );
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    setMinOpacity(minOpacity) {
      this.mapObject.setOptions({ minOpacity });
    },
    setMaxZoom(maxZoom) {
      this.mapObject.setOptions({ maxZoom });
    },
    setRadius(radius) {
      this.mapObject.setOptions({ radius });
    },
    setBlur(blur) {
      this.mapObject.setOptions({ blur });
    },
    setMax(max) {
      this.mapObject.setOptions({ max });
    },
    setGradient(gradient) {
      this.mapObject.setOptions({ gradient });
    },
    setVisible(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
    addLatLng(value) {
      this.mapObject.addLatLng(value);
    },
  },
};
</script>
