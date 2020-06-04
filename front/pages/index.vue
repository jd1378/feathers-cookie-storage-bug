<template>
  <div class="container flex flex-col justify-center items-center mx-auto p-5">
    <h1 class="text-5xl mb-2">
      Login:
    </h1>
    <span class="text-base mb-5">(for getting cookie)</span>
    <nuxt-link
      class="p-2 bg-gray-300 hover:bg-gray-400 text-2xl"
      :to="{ name: 'login' }"
    >
      Login
    </nuxt-link>
    <div class="my-5 text-5xl">Press To Crash</div>
    <nuxt-link
      class="p-2 bg-gray-300 hover:bg-gray-400 text-2xl"
      :to="{ name: 'crash', query: { id: 'sth' } }"
    >
      Crash it
    </nuxt-link>
  </div>
</template>

<script>
export default {
  methods: {
    crashIt() {
      this.$store.dispatch('user/get', '5ed86d623d1636963d11d9e1');
    },
  },
};
</script>

<style lang="scss"></style>
