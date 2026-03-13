module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(422).json({
        message: "Validation failed",
        errors: error.details.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }

    req.validated = value;
    next();
  };
};