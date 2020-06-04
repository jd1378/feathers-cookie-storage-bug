<template>
  <div class="b-spinner"></div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: 'auto',
    },
    height: {
      type: String,
      default: '100%',
    },
  },
  computed: {
    spinnerStyle() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.b-spinner {
  animation: spin 1s linear infinite;
  border-radius: 50%;
  border: 1.5px solid rgb(202, 202, 202);
  border-bottom: 1.6px solid rgb(0, 153, 255);
  object-fit: contain;
  min-height: 1em;
  min-width: 1em;
}
</style>
