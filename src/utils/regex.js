export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validatePassword = (password, pass) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!()-<>?.,])(?=.{6,})/;
  const test = pass
    ? passwordRegex.test(password) && password === pass
    : passwordRegex.test(password);
  return test;
};
