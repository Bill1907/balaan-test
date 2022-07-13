<template>
  <div class="signup-wrapper">
    <PhaseOne
      v-if="phase === 1"
      :phaseOneData="phaseOneData"
    />
    <PhaseTwo v-else-if="phase === 2" />
    <PhaseThree v-else-if="phase === 3"/>
  </div>
</template>

<script>
import PhaseOne from './Signup/PhaseOne.vue';
import PhaseTwo from './Signup/PhaseTwo.vue';
import PhaseThree from './Signup/PhaseThree.vue';

const PHASE_ONE_DATA = {
  email: '',
  password: '',
  passwordCheck: '',
};

export default {
  name: 'SignUpPage',
  components: { PhaseOne, PhaseTwo, PhaseThree },
  data() {
    return {
      phase: 1,
      phaseOneData: PHASE_ONE_DATA,
    };
  },
};
</script>

<style>
.signup-wrapper {
  border: 1px solid black;
  display: flex;
}

</style>
