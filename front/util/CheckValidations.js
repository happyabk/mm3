
class CheckValidations {
 
    
  /**-------------------------------------------------------
    * @Function 명		: isAlphabet
    * @Function 설명	: 입력값이 영문인지 Check(Case2)
    * @Param 			: 1. str	: (String) 입력값
    * @return값			: boolean
    * @사용 Event 		:
    * @see 				:
    ------------------------------------------------------- */
  static isAlphabet(str) {
    if (str.length === 0) {
      return false;
    }
    str = str.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      if (!(str.charAt(i) >= 'A' && str.charAt(i) <= 'Z')) {
        return false;
      }
    }
    return true;
  }

  /**-------------------------------------------------------
     * 문자열이 순수하게 숫자로만 이루어져 있는지를 검사(부호나 소수점도 포함해서는 안된다.)
     *
     * @param   numStr   숫자형 문자열
     * @return  boolean  순수한 숫자형이면 true, 그외 false
    ------------------------------------------------------- */
  static isPureNumber(numStr) {
    const regExp = /^[0-9]+$/;
  
    return regExp.test(numStr);
  }

  /**-------------------------------------------------------
    * @Function 명		: isAlphaNumberic
    * @Function 설명	: 입력값이 영문과 숫자로 되었는지 Check
    * @Param 			: 1. str	: (String) 입력값
    * @return값			: boolean
    * @사용 Event 		:
    * @see 				:
    ------------------------------------------------------- */
  static isAlphaNumeric(str) {
    if (str.length === 0) {
      return false;
    }
    str = str.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      if (!((str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') || (str.charAt(i) >= '0' && str.charAt(i) <= '9'))) {
        return false;
      }
    }
    return true;
  }
    

    
}
  
  
export default CheckValidations;
  
export {
  CheckValidations,
};
  
