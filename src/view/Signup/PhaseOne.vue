<template>
  <div>
    <div>
      <label for="signupEmail">
        <span>이메일</span>
        <input id="signupEmail" type="text" v-model="email"/>
      </label>
    </div>
    <div>
      <label for="signupPassword">
        <span>비밀번호</span>
        <input id="signupPassword" type="password" v-model="password"/>
      </label>
    </div>
    <div>
      <label for="signupPasswordCheck">
        <span>비밀번호 확인</span>
        <input id="signupPasswordCheck" type="password" v-model="passwordCheck"/>
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
  mounted() {
  },
};
</script>

<style scoped lang='scss'>

</style>
