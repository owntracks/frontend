<template>
  <div class="modal" v-show="modals[name]" @click.self="close">
    <div class="modal-container">
      <button class="modal-close-button" title="Close" @click="close">
        &times;
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import * as types from "@/store/mutation-types";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["modals"]),
  },
  methods: {
    ...mapMutations({
      setModalVisibility: types.SET_MODAL_VISIBILITY,
    }),
    close() {
      this.setModalVisibility({
        modal: this.name,
        visibility: false,
      });
    },
  },
};
</script>
