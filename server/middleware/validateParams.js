// server/middleware/validateParams.js
const validateParams = (requiredParams) => {
  return (req, res, next) => {
    const missingParams = requiredParams.filter(
      (param) => !(param in req.body)
    );

    if (missingParams.length > 0) {
      return res.status(400).json({
        error: `Missing required parameters: ${missingParams.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = validateParams;
