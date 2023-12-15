export function checkIds(code: string) {
  const city = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91];
  const idCardReg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let errorMessage = '';
  let isPass = true;

  if (!code) {
    errorMessage = '请输入身份证号码';
    isPass = false;
  } else if (!code.match(idCardReg)) {
    errorMessage = '请输入正确的身份证号码';
    isPass = false;
  } else if (!city.includes(Number.parseInt(code.substring(0, 2)))) {
    errorMessage = '请输入正确的身份证号码';
    isPass = false;
  } else if (code.length === 18) {
    const codeDigits = code.split('');
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i++) {
      ai = Number.parseInt(codeDigits[i]);
      wi = factor[i];
      sum += ai * wi;
    }
    const last = parity[sum % 11];
    if (last.toString() !== codeDigits[17]) {
      errorMessage = '请输入正确的身份证号码';
      isPass = false;
    }
  }
  return {
    res: isPass,
    msg: errorMessage,
  };
}
