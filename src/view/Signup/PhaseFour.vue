<template>
  <div>
    <div>
      <span>'{{ phaseTwoData.name }}'님</span>
      <span>회원가입되었습니다.</span>
    </div>
    <div>
      <span>이메일 : </span>
      <span>{{ phaseOneData.email }}</span>
    </div>
    <div>
      <span>주소 : </span>
      <span>{{ phaseTwoData.postcodeInfo.address }}</span>
    </div>
    <div>
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
};
</script>

<style>

</style>
