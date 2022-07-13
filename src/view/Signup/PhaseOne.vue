<template>
  <div>
    <div>
      <label for="signupEmail">
        <span>이메일</span>
        <input id="signupEmail" type="text" value=""/>
      </label>
    </div>
    <div>
      <label for="signupPassword">
        <span>비밀번호</span>
        <input id="signupPassword" type="password" value=""/>
      </label>
    </div>
    <div>
      <label for="signupPasswordCheck">
        <span>비밀번호 확인</span>
        <input id="signupPasswordCheck" type="password" value=""/>
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
};
</script>

<style scoped lang='scss'>

</style>
