<template>
  <modal name="loading" :click-to-close="false" adaptive>
    <LoaderIcon class="loader-icon" size="1.5x" />
    {{ $t("Loading data, please wait...") }}
    <br />
    <button
      type="button"
      class="button button-primary button-cancel"
      @click="requestAbortController.abort()"
    >
      {{ $t("Cancel") }}
    </button>
  </modal>
</template>

<script>
import { mapState } from "vuex";
import { LoaderIcon } from "vue-feather-icons";

export default {
  components: {
    LoaderIcon,
  },
  computed: {
    ...mapState(["requestAbortController"]),
  },
};
</script>

<style scoped>
.loader-icon {
  animation: spinning 2s linear infinite;
  margin-right: 5px;
}

.button-cancel {
  display: block;
  margin: 20px auto 0;
}

@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
