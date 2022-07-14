<template>
  <div class="signup-wrapper">
    <PhaseOne
      v-if="phase === 1"
      :phaseOneData="phaseOneData? phaseOneData : {}"
      @setPhaseOneData="setPhaseOneData"
      @setPhase="setPhase"
    />
    <PhaseTwo v-else-if="phase === 2" />
    <PhaseThree v-else-if="phase === 3"/>
  </div>
</template>

<script>
import PhaseOne from './Signup/PhaseOne.vue';
import PhaseTwo from './Signup/PhaseTwo.vue';
import PhaseThree from './Signup/PhaseThree.vue';

export default {
  name: 'SignUpPage',
  components: { PhaseOne, PhaseTwo, PhaseThree },
  data() {
    return {
      phase: 1,
      phaseOneData: null,
    };
  },
  methods: {
    setPhase(number) {
      this.phase = number;
    },
    setPhaseOneData(value) {
      this.phaseOneData = value;
    },
  },
};
</script>

<style>
.signup-wrapper {
  border: 1px solid black;
  display: flex;
}

</style>
