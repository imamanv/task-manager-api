const { CustomError } = require("../CustomErrorClass");

const customError = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ error: err });
};

module.exports = customError;
