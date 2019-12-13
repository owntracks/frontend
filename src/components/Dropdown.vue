<template>
  <div class="dropdown" v-focus-outside="hide" v-click-outside="hide">
    <button class="dropdown-button button" :title="title" @click="toggle">
      {{ label }}
    </button>
    <div v-if="active" class="dropdown-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    hide() {
      this.active = false;
    },
  },
};
</script>
