<template>
  <div class="signup-wrapper">
    <PhaseOne
      v-if="phase === 1"
      :phaseOneData="phaseOneData? phaseOneData : {}"
      @setPhaseOneData="setPhaseOneData"
      @setPhase="setPhase"
      @createErrorAlert="createErrorAlert"
      @createSuccessAlert="createSuccessAlert"
    />
    <PhaseTwo
      v-else-if="phase === 2"
      @setPhase="setPhase"
    />
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
    createErrorAlert({ parent, text }) {
      const errorEl = parent.querySelector('.error-alert');
      const successEl = parent.querySelector('.success-alert');
      if (errorEl) {
        errorEl.remove();
      }
      if (successEl) {
        successEl.remove();
      }
      const failElement = document.createElement('span');
      failElement.className = 'error-alert';
      failElement.innerText = text;
      parent.appendChild(failElement);
    },
    createSuccessAlert({ parent, text }) {
      const errorEl = parent.querySelector('.error-alert');
      const successEl = parent.querySelector('.success-alert');
      if (errorEl) {
        errorEl.remove();
      }
      if (successEl) {
        successEl.remove();
      }
      const successElement = document.createElement('span');
      successElement.className = 'success-alert';
      successElement.innerText = text;
      parent.appendChild(successElement);
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
