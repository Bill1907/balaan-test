<template>
  <div>
    <div ref="name">
      <label for="signupName">
        <span>이름</span>
        <input
          id="signupName"
          type="text"
          v-model="name"
          @focusout="handleFocusoutName"
        />
      </label>
    </div>
    <div ref="contact">
      <label for="signupContact">
        <span>연락처</span>
        <input
          id="signupContact"
          type="text"
          v-model="contact"
          @focusout="handleFocusoutContact"
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
  props: {
    phaseTwoData: {
      type: Object,
      required: true,
    },
  },
  emits: ['setPhase', 'setPhaseTwoData', 'createErrorAlert', 'createSuccessAlert'],
  mounted() {
    if (Object.keys(this.phaseTwoData).length > 0) {
      this.name = this.phaseTwoData.name;
      this.contact = this.phaseTwoData.contact;
    }
  },
  methods: {
    // 이벤트 핸들러
    handleFocusoutName() {
      const isValid = this.validateName(this.name);
      console.log(isValid);
      console.log(this.$refs.name);
      if (isValid) {
        this.$emit('createSuccessAlert', {
          parent: this.$refs.name,
          message: 'good',
        });
      } else {
        this.$emit('createErrorAlert', {
          parent: this.$refs.name,
          message: '다시 확인해 주세요.',
        });
      }
    },
    handleFocusoutContact() {
      const isValid = this.validateContact(this.contact);
      console.log(isValid);
    },
    handlePreviousBtn() {
      this.$emit('setPhase', 1);
    },
    // 유효성 검사
    validateName(name) {
      /**
       * 1. 특수문자 필터링
       * 2. 한글 필터링
       * 3. 영어 필터링
       */
      if (this.isExceptionExpression(name)) {
        return (this.isKorean(name) && name.length > 2)
          || (this.isEnglish(name) && name.length > 3);
      }
      return false;
    },
    validateContact(contact) {
      console.log(contact);
    },
    isExceptionExpression(value) {
      const specialReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
      const blankReg = /\s/g;
      const numberReg = /[0-9]/g;
      return !specialReg.test(value) && !blankReg.test(value) && !numberReg.test(value);
    },
    isKorean(value) {
      const koreanReg = /^[가-힣]+$/;
      return koreanReg.test(value);
    },
    isEnglish(value) {
      const englishReg = /^[a-zA-Z]+$/;
      return englishReg.test(value);
    },
  },
};
</script>

<style >

</style>
