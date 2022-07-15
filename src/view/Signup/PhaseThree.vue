<template>
  <div>
    <span>카드번호</span>
    <div>
      <label for="card1">
        <input
          :value="card1"
          id="card1"
          type="text"
          maxlength="4"
          @input="validateCardUnitNum($event, 'card1')"
        >
      </label>
      <label for="card2">
        <input
          :value="card2"
          id="card2"
          type="text"
          maxlength="4"
          @input="validateCardUnitNum($event, 'card2')"
        >
      </label>
      <label for="card3">
        <input
          :value="card3"
          id="card3"
          type="text"
          maxlength="4"
          @input="validateCardUnitNum($event, 'card3')"
        >
      </label>
      <label for="card4" @focusout="handleFocusoutCardNum">
      <input
        :value="card4"
        id="card4"
        type="text"
        maxlength="4"
        @input="validateCardUnitNum($event, 'card4')"
      >
      </label>
    </div>
    <div>
      <button>완료</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhaseThree',
  data() {
    return {
      card1: '',
      card2: '',
      card3: '',
      card4: '',
    };
  },
  methods: {
    handleFocusoutCardNum() {
      this.validateCardNum();
    },
    validateCardNum() {
      const cardNum = this.card1 + this.card2 + this.card3 + this.card4;
      console.log(cardNum);
    },
    validateCardUnitNum(event, card) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      if (event.target.value.length === 4) {
        this[card] = event.target.value;
      } else {
        console.log('not enough');
      }
    },
  },
};
</script>

<style >

</style>
