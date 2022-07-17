<template>
  <div class="result-wrapper">
    <div class="text-wrapper">
      <span class="name-text">'{{ phaseTwoData.name }}'님</span>
      <span>회원가입되었습니다.</span>
    </div>
    <div class="text-wrapper">
      <span>이메일 : </span>
      <span>{{ phaseOneData.email }}</span>
    </div>
    <div class="text-wrapper">
      <span>주소 : </span>
      <span>{{ phaseTwoData.postcodeInfo.address }}</span>
    </div>
    <div class="text-wrapper">
      <span>연락처 : </span>
      <span>{{ phaseTwoData.contact }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhaseFour',
  props: {
    phaseOneData: {
      type: Object,
      required: true,
    },
    phaseTwoData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.phaseOneData);
    console.log(this.phaseTwoData);
  },
};
</script>

<style>
.result-wrapper{
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.text-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.name-text {
  font-size: 20px;
}
</style>
