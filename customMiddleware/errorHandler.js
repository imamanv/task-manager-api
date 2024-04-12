const showError = (req, res) => {
  res.status(404).send("Page doesn't exist please check the url");
};

module.exports = showError;
