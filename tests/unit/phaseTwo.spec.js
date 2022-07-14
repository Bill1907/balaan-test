import PhaseTwo from '@/view/Signup/PhaseTwo.vue';

describe('PhaseTwo.vue', () => {
  it('이름: 유효성 체크', async () => {
    expect(typeof PhaseTwo.methods.validateName).toBe('function');
    // 한글 이름
    const kr = '김한글';
    const case1 = PhaseTwo.methods.validateName(kr);
    expect(case1).toBeTruthy();
    // 영어 이름
    const en = 'kimKorean';
    const case2 = PhaseTwo.methods.validateName(en);
    expect(case2).toBeTruthy();
    // 특수 문자일 경우
    const specialEx = '123 #$%';
    const case3 = PhaseTwo.methods.validateName(specialEx);
    expect(case3).toBeFalsy();
    // 한글  + 특수 문자
    const mixKr = '1김한글#$%';
    const case4 = PhaseTwo.methods.validateName(mixKr);
    expect(case4).toBeFalsy();
    // 영어  + 특수 문자
    const mixEn = '1KIm#$%';
    const case5 = PhaseTwo.methods.validateName(mixEn);
    expect(case5).toBeFalsy();
  });
  it('연락처: 유효성 체크', () => {
    expect(typeof PhaseTwo.methods.validateContact).toBe('function');
    // hyphen 포함
    const hyphen = '010-1234-1234';
    const case1 = PhaseTwo.methods.validateContact(hyphen);
    expect(case1).toBeTruthy();
    // 띄어쓰기 포함
    const space = '010 1234 1234';
    const case2 = PhaseTwo.methods.validateContact(space);
    expect(case2).toBeTruthy();
    // 붙어있는 조합
    const stuck = '01012341234';
    const case3 = PhaseTwo.methods.validateContact(stuck);
    expect(case3).toBeTruthy();
    // 0으로 시작하지 않음
    const startOne = '11012341234';
    const case4 = PhaseTwo.methods.validateContact(startOne);
    expect(case4).toBeFalsy();
  });
});
