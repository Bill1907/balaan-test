<template>
  <div>
    <div>
      <label for="signupName">
        <span>이름</span>
        <input
          id="signupName"
          type="text"
          v-model="name"
        />
      </label>
    </div>
    <div>
      <label for="signupContact">
        <span>연락처</span>
        <input
          id="signupContact"
          type="text"
          v-model="contact"
        />
      </label>
    </div>
    <div>
      address
    </div>
  </div>
  <div>
    <button @click="handlePreviousBtn">이전</button>
    <button>다음</button>
  </div>
</template>

<script>
export default {
  name: 'PhaseTwo',
  data() {
    return {
      isValidName: false,
      isValidContact: false,
      name: '',
      contact: '',
    };
  },
  emits: ['setPhase'],
  methods: {
    handlePreviousBtn() {
      this.$emit('setPhase', 1);
    },
  },
};
</script>

<style >

</style>
