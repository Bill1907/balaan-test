<template>
  <div class="phase-one-input-wrapper">
    <div class="input-wrapper" ref="name">
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
    <div class="input-wrapper" ref="contact">
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
      :postcodeInfo="postcodeInfo? postcodeInfo : {}"
      @setPostcodeInfo="setPostcodeInfo"
    />
  </div>
  <div class="btn-wrapper">
    <button @click="handlePreviousBtn">이전</button>
    <button @click="handleNextBtn">다음</button>
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
      this.postcodeInfo = { ...this.phaseTwoData.postcodeInfo };
    }
  },
  methods: {
    // emit 함수
    setPostcodeInfo(value) {
      this.postcodeInfo = value;
    },
    // 이벤트 핸들러
    handlePreviousBtn() {
      this.$emit('setPhase', 1);
    },
    handleNextBtn() {
      if (this.isValidContact && this.isValidName && this.postcodeInfo) {
        this.$emit('setPhase', 3);
        this.$emit('setPhaseTwoData', {
          name: this.name,
          contact: this.contact,
          postcodeInfo: this.postcodeInfo,
        });
      }
    },
    handleFocusoutName() {
      this.isValidName = this.validateName(this.name);
      if (this.isValidName) {
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
      this.isValidContact = this.validateContact(this.contact);
      if (this.isValidContact) {
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
