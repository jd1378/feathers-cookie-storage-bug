<template>
  <button
    class="flex justify-center p-2 bg-gray-300 hover:bg-gray-400 text-xl outline-none focus:outline-none"
    v-on="$listeners"
  >
    <slot v-if="!busy" />
    <BSpinner v-else></BSpinner>
  </button>
</template>

<script>
import BSpinner from '@/components/BSpinner';
export default {
  components: {
    BSpinner,
  },
  props: {
    busy: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
