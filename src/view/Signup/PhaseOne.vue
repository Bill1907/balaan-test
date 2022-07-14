<template>
  <div>
    <div ref="email">
      <label for="signupEmail">
        <span>이메일</span>
        <input
          id="signupEmail"
          type="email"
          v-model="email"
          @focusout="handleEmailFocusout"
        />
      </label>
    </div>
    <div ref="password">
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
    <div ref="passwordCheck">
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
  <div>
    <button>다음</button>
  </div>
</template>

<script>
export default {
  name: 'PhaseOne',
  data() {
    return {
      email: '',
      password: '',
      passwordCheck: '',
    };
  },
  // props readonly
  props: {
    phaseOneData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleEmailFocusout() {
      const isValid = this.validateEmail(this.email);
      if (isValid) {
        this.createSuccessAlert(this.$refs.email, '사용가능한 이메일입니다.');
      } else {
        this.createErrorAlert(this.$refs.email, '이메일 주소가 유효하지 않습니다.');
      }
    },
    handlePasswordFocusout() {
      const isValid = this.validatePassword(this.password);
      if (isValid) {
        this.createSuccessAlert(this.$refs.password, '사용가능한 비밀번호입니다.');
      } else {
        this.createErrorAlert(this.$refs.password, '비밀번호를 다시 입력해 주세요');
      }
    },
    handlePasswordCheckFocusout() {
      const isValid = this.validatePasswordCheck(this.password, this.passwordCheck);
      if (isValid) { // 성공일 경우 성공 알림
        this.createSuccessAlert(this.$refs.passwordCheck, '');
      } else { // 실패일 경우 실패 알림
        this.createErrorAlert(this.$refs.passwordCheck, '비밀번호를 확인해 주세요');
      }
    },
    // validation check
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !!email.match(re);
    },
    validatePassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      return !!password.match(re);
    },
    validatePasswordCheck(password1, password2) {
      return password1 === password2;
    },
    createErrorAlert(parent, text) {
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
    createSuccessAlert(parent, text) {
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

<styles>

</styles>
