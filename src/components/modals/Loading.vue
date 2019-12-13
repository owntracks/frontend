<template>
  <modal name="loading" :click-to-close="false" adaptive>
    <LoaderIcon class="loader" size="1.5x" />
    {{ $t("Loading data, please wait...") }}
  </modal>
</template>

<style scoped>
.loader {
  animation: spinning 2s linear infinite;
  margin-right: 5px;
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

<script>
import { LoaderIcon } from "vue-feather-icons";

export default {
  components: {
    LoaderIcon,
  },
};
</script>
