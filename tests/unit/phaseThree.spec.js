import PhaseThree from '@/view/Signup/PhaseThree.vue';

describe('PhaseThree.vue', () => {
  it('카드 번호 유효성 확인', () => {
    expect(typeof PhaseThree.methods.validateCardNum).toBe('function');
    const case1 = '5678567856785678';
    expect(PhaseThree.methods.validateCardNum(case1)).toBeTruthy();
    const case2 = '5673562856485658';
    expect(PhaseThree.methods.validateCardNum(case2)).toBeFalsy();
  });
});
