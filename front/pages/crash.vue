<template>
  <div class="p-5">
    <nuxt-link
      class="p-2 bg-gray-300 hover:bg-gray-400 text-2xl"
      :to="{ name: 'index' }"
    >
      Go to index
    </nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData({ route }) {
    if (route.query.id) {
      return {
        id: route.query.id,
      };
    }
    return {};
  },
  async mounted() {
    if (this.id) {
      await this.$store.dispatch('user/get', this.id);
    }
  },
};
</script>
