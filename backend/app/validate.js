const { validationResult, checkSchema } = require("express-validator");

exports.sequentialValidate = (...validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      errors: errors.array(),
    });
  };
};

exports.parallelValidate = (...validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      errors: errors.array(),
    });
  };
};

exports.validateSchema = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      var errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      res.status(400).json({
        errors: errors.array(),
      });
    },
  ];
};
