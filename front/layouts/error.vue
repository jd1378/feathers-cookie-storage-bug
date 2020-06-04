<template>
  <section>
    <div
      class="h-full w-full flex flex-col justify-center items-center p-5 text-center"
    >
      <h1 v-if="error.statusCode === 404" class="text-6xl text-lessdark">
        404
      </h1>
      <h2 v-if="error.statusCode === 404" class="mb-4 text-3xl text-lessdark">
        NotFound
      </h2>
      <div v-else>
        <h1 class="text-danger mb-4">Something went wrong</h1>
        <!-- 
        <h6 v-if="error.message" class="text-warning">
          {{ error.message }}
        </h6> 
        -->
      </div>
      <nuxt-link to="/" class="p-4 border rounded-sm">Back to index</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  head() {
    return {
      title: this.error.statusCode === 404 ? 'Not found' : 'Error',
    };
  },
};
</script>
