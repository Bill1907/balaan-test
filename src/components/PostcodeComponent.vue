<template>
  <div>
    <label for="postcode">
      <input id="postcode" type="text" v-model="postcode" placeholder="우편번호">
    </label>
    <label for="searchPostcode">
      <input id="searchPostcode" type="button" @click="execDaumPostcode()" value="우편번호 찾기">
    </label>
    <br>
    <label for="address">
      <input type="text" v-model="address" id="address" placeholder="주소">
    </label>
    <br>
    <label for="detailAddress" @focusout="handleFocusoutPostcodeInput">
      <input type="text" v-model="detailAddress" id="detailAddress" placeholder="상세주소">
    </label>
    <label for="extraAddress">
      <input type="text" v-model="extraAddress" id="extraAddress" placeholder="참고항목">
    </label>
  </div>
</template>

<script>
export default {
  name: 'PostcodeComponent',
  data() {
    return {
      postcode: '',
      address: '',
      detailAddress: '',
      extraAddress: '',
    };
  },
  props: {
    postcodeInfo: {
      type: Object,
      required: true,
    },
  },
  emits: ['setPostcodeInfo'],
  mounted() {
    if (Object.keys(this.postcodeInfo).length > 0) {
      this.postcode = this.postcodeInfo.postcode;
      this.address = this.postcodeInfo.address;
      this.detailAddress = this.postcodeInfo.detailAddress;
      this.extraAddress = this.postcodeInfo.extraAddress;
    }
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== '') {
            this.extraAddress = '';
          }
          if (data.userSelectedType === 'R') {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }
          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.extraAddress
                += this.extraAddress !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            if (this.extraAddress !== '') {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = '';
          }
          this.postcode = data.zonecode;
        },
      }).open();
    },
    handleFocusoutPostcodeInput() {
      this.$emit('setPostcodeInfo', {
        postcode: this.postcode,
        address: this.address,
        detailAddress: this.detailAddress,
        extraAddress: this.extraAddress,
      });
    },
  },
};
</script>

<style>

</style>
