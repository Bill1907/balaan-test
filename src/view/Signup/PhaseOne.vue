<template>
  <div class="phase-one-input-wrapper">
    <div class="input-wrapper" ref="email">
      <label for="signupEmail">
        <span class="input-text">
          이메일
        </span>
        <input
          class="phase-one-input"
          id="signupEmail"
          type="email"
          v-model="email"
          @focusout="handleEmailFocusout"
        />
      </label>
    </div>
    <div class="input-wrapper" ref="password">
      <label for="signupPassword">
        <span>비밀번호</span>
        <input
          id="signupPassword"
          type="password"
          v-model="password"
          @focusout="handlePasswordFocusout"
        />
      </label>
    </div>
    <div class="input-wrapper" ref="passwordCheck">
      <label for="signupPasswordCheck">
        <span>비밀번호 확인</span>
        <input
          id="signupPasswordCheck"
          type="password"
          v-model="passwordCheck"
          @focusout="handlePasswordCheckFocusout"
        />
      </label>
    </div>
  </div>
  <div class="btn-wrapper">
    <div/>
    <button @click="handleNextBtn">다음</button>
  </div>
</template>

<script>
export default {
  name: 'PhaseOne',
  data() {
    return {
      isValidEmail: false,
      isValidPassword: false,
      isValidPasswordCheck: false,
      email: '',
      password: '',
      passwordCheck: '',
    };
  },
  props: {
    phaseOneData: {
      type: Object,
      required: true,
    },
  },
  emits: ['setPhaseOneData', 'setPhase', 'createErrorAlert', 'createSuccessAlert'],
  mounted() {
    if (Object.keys(this.phaseOneData).length > 0) {
      this.email = this.phaseOneData.email;
      this.password = this.phaseOneData.password;
      this.passwordCheck = this.phaseOneData.password;
    }
  },
  methods: {
    // event handler
    handleEmailFocusout() {
      const isValid = this.validateEmail(this.email);
      this.isValidEmail = isValid;
      if (isValid) {
        this.$emit('createSuccessAlert', {
          parent: this.$refs.email,
          message: '사용가능한 이메일입니다.',
        });
      } else {
        this.$emit('createErrorAlert', {
          parent: this.$refs.email,
          message: '이메일 주소가 유효하지 않습니다.',
        });
      }
    },
    handlePasswordFocusout() {
      const isValid = this.validatePassword(this.password);
      this.isValidPassword = isValid;
      if (isValid) {
        this.$emit('createSuccessAlert', {
          parent: this.$refs.password,
          message: '사용가능한 비밀번호입니다.',
        });
      } else {
        this.$emit('createErrorAlert', {
          parent: this.$refs.password,
          message: '비밀번호를 다시 입력해 주세요',
        });
      }
    },
    handlePasswordCheckFocusout() {
      const isValid = this.validatePasswordCheck(this.password, this.passwordCheck);
      this.isValidPasswordCheck = isValid;
      if (isValid) { // 성공일 경우 성공 알림
        this.$emit('createSuccessAlert', {
          parent: this.$refs.passwordCheck,
          message: '비밀번호 확인되었습니다.',
        });
      } else { // 실패일 경우 실패 알림
        this.$emit('createErrorAlert', {
          parent: this.$refs.passwordCheck,
          message: '비밀번호를 확인해 주세요',
        });
      }
    },
    handleNextBtn() {
      if (this.isValidEmail && this.isValidPassword && this.isValidPasswordCheck) {
        this.$emit('setPhaseOneData', {
          email: this.email,
          password: this.password,
        });
        this.$emit('setPhase', 2);
      }
    },
    // validation check
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !!email.match(re);
    },
    validatePassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
      return !!password.match(re);
    },
    validatePasswordCheck(password1, password2) {
      return password1 === password2;
    },
  },
};
</script>

<style>
.phase-one-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3vh;
  margin: 20px 10px;
}
</style>
