const validation = (value, rules, form) => {
  let valid = true;

  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = validateRequired(value);
        break;
      case 'isEmail':
        valid = validateEmail(value);
        break;
      case 'minLength':
        valid = validateMinLength(value, rules[rule]);
        break;
      case 'maxLength':
        valid = validateMaxLength(value, rules[rule]);
        break;
      case 'confirmPass':
        valid = validateConfirmPass(value, form[rules.confirmPass].value);
        break;
      default:
        valid = true;
    }
  }

  return valid;
};

const validateRequired = value => {
  if (value !== '') {
    return true;
  }
  return false;
};

const validateEmail = email => {
  const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return expression.test(String(email).toLocaleLowerCase());
};

const validateMinLength = (value, ruleValue) => {
  return value.length >= ruleValue ? true : false;
};

const validateMaxLength = (value, ruleValue) => {
  return value.length <= ruleValue ? true : false;
};

const validateConfirmPass = (confirmPass, pass) => {
  return confirmPass === pass;
};

export default validation;
