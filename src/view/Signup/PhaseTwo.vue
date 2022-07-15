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
    <PostcodeComponent
      @setPostcodeInfo="setPostcodeInfo"
    />
  </div>
  <div>
    <button @click="handlePreviousBtn">이전</button>
    <button>다음</button>
  </div>
</template>

<script>
import PostcodeComponent from '../../components/PostcodeComponent.vue';

export default {
  name: 'PhaseTwo',
  components: { PostcodeComponent },
  data() {
    return {
      isValidName: false,
      isValidContact: false,
      name: '',
      contact: '',
      postcodeInfo: null,
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
    setPostcodeInfo(value) {
      this.postcodeInfo = value;
    },
    // 이벤트 핸들러
    handleFocusoutName() {
      const isValid = this.validateName(this.name);
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
      if (isValid) {
        this.$emit('createSuccessAlert', {
          parent: this.$refs.contact,
          message: 'good',
        });
      } else {
        this.$emit('createErrorAlert', {
          parent: this.$refs.contact,
          message: '연락처를 다시 확인해 주세요.',
        });
      }
    },
    handlePreviousBtn() {
      this.$emit('setPhase', 1);
    },
    // 유효성 검사
    validateName(name) {
      if (this.isExceptionExpression(name)) {
        return (this.isKorean(name) && name.length > 2)
          || (this.isEnglish(name) && name.length > 3);
      }
      return false;
    },
    validateContact(contact) {
      const contactReg = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
      if (this.isStartZero(contact)) {
        const filteredContact = this.filterContact(contact);
        return contactReg.test(filteredContact);
      }
      return false;
    },
    // 정규식 체크
    isExceptionExpression(value) {
      const specialReg = /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&\\\\=\\(\\'\\"]/g;
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
    isStartZero(value) {
      return value[0] === '0';
    },
    // filter
    filterContact(value) {
      let result = '';
      if (value.includes('-')) {
        result = value.split('-').join('');
      } else if (value.includes(' ')) {
        result = value.split(' ').join('');
      } else {
        result = value;
      }
      return result;
    },
  },
};
</script>

<style >

</style>
