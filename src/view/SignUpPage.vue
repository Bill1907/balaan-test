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
      :phaseTwoData="phaseTwoData? phaseTwoData : {}"
      @setPhase="setPhase"
      @setPhaseTwoData="setPhaseTwoData"
      @createErrorAlert="createErrorAlert"
      @createSuccessAlert="createSuccessAlert"
    />
    <PhaseThree
      v-else-if="phase === 3"
      :phaseThreeData="phaseTwoData? phaseTwoData : {}"
      @setPhase="setPhase"
      @setPhaseThreeData="setPhaseThreeData"
      @createErrorAlert="createErrorAlert"
      @createSuccessAlert="createSuccessAlert"
    />
    <PhaseFour
      v-else-if="phase === 4"
      :phaseOneData="phaseOneData"
      :phaseTwoData="phaseTwoData"
    />
  </div>
</template>

<script>
import PhaseOne from './Signup/PhaseOne.vue';
import PhaseTwo from './Signup/PhaseTwo.vue';
import PhaseThree from './Signup/PhaseThree.vue';
import PhaseFour from './Signup/PhaseFour.vue';

export default {
  name: 'SignUpPage',
  components: {
    PhaseOne, PhaseTwo, PhaseThree, PhaseFour,
  },
  data() {
    return {
      phase: 1,
      phaseOneData: null,
      phaseTwoData: null,
      phaseThreeData: null,
    };
  },
  methods: {
    setPhase(number) {
      this.phase = number;
    },
    setPhaseOneData(value) {
      this.phaseOneData = value;
    },
    setPhaseTwoData(value) {
      this.phaseTwoData = value;
    },
    setPhaseThreeData(value) {
      this.phaseThreeData = value;
    },
    createErrorAlert({ parent, message }) {
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
      failElement.innerText = message;
      parent.appendChild(failElement);
    },
    createSuccessAlert({ parent, message }) {
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
      successElement.innerText = message;
      parent.appendChild(successElement);
    },
  },
};
</script>

<style>
.signup-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 50vh;
  border: 1px solid black;
  border-radius: 50px;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 0.5vh;
}
.input-wrapper label {
  display: flex;
  justify-content: space-between;
}

.btn-wrapper{
  display: flex;
  justify-content: space-between;
}

.error-alert {
  font-size: 13px;
  color: red;
}
.success-alert {
  font-size: 13px;
  color: rgba(0, 42, 255, 0.84);
}
</style>
