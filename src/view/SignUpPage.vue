<template>
  <div class="signup-wrapper">
    <PhaseOne/>
    <PhaseTwo/>
    <PhaseThree/>
  </div>
</template>

<script>
import PhaseOne from './Signup/PhaseOne.vue';
import PhaseTwo from './Signup/PhaseTwo.vue';
import PhaseThree from './Signup/PhaseThree.vue';

export default {
  name: 'SignUpPage',
  components: { PhaseOne, PhaseTwo, PhaseThree },
};
</script>

<style>
.signup-wrapper {
  border: 1px solid black;
}

</style>
