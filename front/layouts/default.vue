<template>
  <div class="flex flex-col w-full flex-auto">
    <div class="flex justify-center w-full border-b p-3">
      isAuthenticated? {{ isAuthenticated }}
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
};
</script>
