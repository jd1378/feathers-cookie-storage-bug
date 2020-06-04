<template>
  <form
    class="container mx-auto flex flex-col w-64 m-3"
    @submit.prevent="login"
  >
    <div v-if="error" class="flex bg-red-300 p-3 mb-3 justify-center">
      Error: {{ error }}
    </div>
    <BInput v-model="username" type="text" placeholder="username" />
    <BInput
      v-model="password"
      type="password"
      placeholder="password"
      maxlength="50"
    />
    <BButton type="submit" maxlength="50" :busy="busy">Login</BButton>
    <hr class="my-3" />
    <div class="flex justify-center">
      <span>Not registered?&nbsp;</span>
      <nuxt-link class="hover:text-blue-600" :to="{ name: 'register' }"
        >Register now</nuxt-link
      >
    </div>
    <hr class="my-3" />
    <nuxt-link
      class="text-center p-2 bg-gray-300 hover:bg-gray-400"
      :to="{ name: 'index' }"
    >
      back to index
    </nuxt-link>
  </form>
</template>

<script>
import BInput from '@/components/BInput';
import BButton from '@/components/BButton';

export default {
  components: {
    BInput,
    BButton,
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
      busy: false,
    };
  },
  methods: {
    async login() {
      if (this.busy) return;
      this.busy = true;
      this.error = '';
      try {
        await this.$store.dispatch('auth/authenticate', {
          username: this.username,
          password: this.password,
          strategy: 'local',
        });
        this.$router.push({ name: 'index' });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style lang="scss"></style>
