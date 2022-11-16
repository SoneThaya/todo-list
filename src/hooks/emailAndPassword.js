export const useEmailValidation = (email) => {
  const isEmailValid = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,50}$/i.test(email);
  return isEmailValid;
};

export const usePasswordValidation = (password) => {
  const isPasswordValid = /^[A-Za-z]\w{4,16}$/.test(password);
  return isPasswordValid;
};
