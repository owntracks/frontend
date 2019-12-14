<template>
  <modal name="download" adaptive>
    <pre class="data"><code>{{ data }}</code></pre>
    <div class="options">
      <input
        v-model="options.minifyJson"
        type="checkbox"
        id="option-minify-json"
      />
      <label for="option-minify-json">
        {{ $t("Minify JSON") }}
      </label>
    </div>
    <div class="buttons">
      <button
        class="button button-outline button-primary"
        :title="$t('Copy to clipboard')"
        @click="copy"
      >
        {{ $t("Copy to clipboard") }}
      </button>
      <button
        class="button button-primary"
        :title="$t('Download')"
        @click="download"
      >
        {{ $t("Download") }}
      </button>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
.data {
  max-height: 300px;
}

.options {
  margin-top: 30px;
}

.buttons {
  display: flex;
  margin-top: 30px;

  button {
    flex: 1;

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>

<script>
import { mapState } from "vuex";
import copy from "clipboard-copy";

import { download } from "@/util";

export default {
  data() {
    return {
      options: {
        minifyJson: false,
      },
    };
  },
  computed: {
    ...mapState([
      "startDateTime",
      "endDateTime",
      "selectedUser",
      "selectedDevice",
      "locationHistory",
    ]),
    data() {
      return this.locationHistory;
    },
  },
  methods: {
    copy() {
      const data = JSON.stringify(
        this.data,
        null,
        this.options.minifyJson ? 0 : 2
      );
      copy(data);
    },
    download() {
      const data = JSON.stringify(
        this.data,
        null,
        this.options.minifyJson ? 0 : 2
      );
      const start = this.startDateTime;
      const end = this.endDateTime;
      const user = this.selectedUser ? `_${this.selectedUser}` : "";
      const device = this.selectedDevice ? `_${this.selectedDevice}` : "";
      const filename = `data_${start}_${end}${user}${device}.json`;
      download(data, filename, "application/json");
    },
  },
};
</script>
