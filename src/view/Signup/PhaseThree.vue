<template>
  <div class="phase-one-input-wrapper">
    <span>카드번호</span>
    <div class="card-input-wrapper" ref="card">
      <div class="input-wrapper" ref="card1">
        <label for="card1">
          <input
            :value="card1"
            id="card1"
            type="text"
            maxlength="4"
            @input="validateCardUnitNum($event, 'card1')"
          >
        </label>
      </div>
      <div class="input-wrapper" ref="card2">
        <label for="card2">
          <input
            :value="card2"
            id="card2"
            type="text"
            maxlength="4"
            @input="validateCardUnitNum($event, 'card2')"
          >
        </label>
      </div>
      <div class="input-wrapper" ref="card3">
        <label for="card3" ref="card3">
          <input
            :value="card3"
            id="card3"
            type="text"
            maxlength="4"
            @input="validateCardUnitNum($event, 'card3')"
          >
        </label>
      </div>
      <div class="input-wrapper" ref="card4">
        <label for="card4" ref="card4" @focusout="handleFocusoutCardNum">
        <input
          :value="card4"
          id="card4"
          type="text"
          maxlength="4"
          @input="validateCardUnitNum($event, 'card4')"
        >
        </label>
      </div>
    </div>
    <div ref="validationAlert"/>
    <div>
      <button @click="handleCompleteBtn">완료</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhaseThree',
  data() {
    return {
      isValidCard: false,
      card1: '',
      card2: '',
      card3: '',
      card4: '',
    };
  },
  props: {
    phaseThreeData: {
      type: Object,
      required: true,
    },
  },
  emits: ['setPhase', 'setPhaseThreeData', 'createErrorAlert', 'createSuccessAlert'],
  mounted() {
    if (Object.keys(this.phaseThreeData).length > 0) {
      this.card1 = this.phaseThreeData.card1;
      this.card2 = this.phaseThreeData.card2;
      this.card3 = this.phaseThreeData.card3;
      this.card4 = this.phaseThreeData.card4;
    }
  },
  methods: {
    handleCompleteBtn() {
      if (this.isValidCard) {
        this.$emit('setPhase', 4);
        this.$emit('setPhaseThreeData', {
          card1: this.card1,
          card2: this.card2,
          card3: this.card3,
          card4: this.card4,
        });
      }
    },
    handleFocusoutCardNum() {
      this.isValidCard = this.validateCardNum(this.card1 + this.card2 + this.card3 + this.card4);
      if (this.isValidCard) {
        this.$emit('createSuccessAlert', {
          parent: this.$refs.validationAlert,
          message: '유효한 카드 정보입니다.',
        });
      } else {
        this.$emit('createErrorAlert', {
          parent: this.$refs.validationAlert,
          message: '카드 정보를 확인해주세요.',
        });
      }
    },
    validateCardNum(cardNum) {
      if (cardNum.length !== 16) return false;
      const cardNumArr = cardNum.split('').reverse();
      const sum = cardNumArr.reduce((acc, cur, idx) => {
        if ((idx + 1) % 2 === 0) {
          const tempNum = Number(cur) * 2;
          if (tempNum >= 9) {
            return Number(acc) + tempNum + Number(cur);
          }
          return Number(acc) + tempNum;
        }
        return Number(acc) + Number(cur);
      }, 0);
      return sum % 10 === 0;
    },
    validateCardUnitNum(event, card) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      if (event.target.value.length === 4) {
        this[card] = event.target.value;
        this.$emit('createSuccessAlert', {
          parent: this.$refs[card],
          message: '',
        });
      } else {
        this.$emit('createErrorAlert', {
          parent: this.$refs[card],
          message: '입력값이 부족합니다.',
        });
      }
    },
  },
};
</script>

<style >
.card-input-wrapper {
  display: flex;
  gap: 1vw;
}

.card-input-wrapper input {
  width: 4vw;
}
</style>
