<template>
  <div class="flex flex-col mb-5">
    <span class="flex mb-2">{{ $attrs.placeholder }}</span>
    <input
      class="p-2 text-lg outline-none focus:shadow-outline border"
      v-bind="$attrs"
      v-on="listeners"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
  },
  methods: {
    input(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
