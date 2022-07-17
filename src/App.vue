<template>
  <SignUpPage/>
</template>

<script>
import SignUpPage from './view/SignUpPage.vue';

export default {
  name: 'App',
  components: {
    SignUpPage,
  },
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
