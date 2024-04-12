const customError = (err, req, res) => {
  console.log("aman");
  return res.status(500).json({ error: err });
};

module.exports = customError;
