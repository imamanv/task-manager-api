class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const customError = (msg, status) => {
  throw new CustomError(msg, status);
};

module.exports = { customError, CustomError };
