const getCaptchaAnswer = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export { getCaptchaAnswer };
