const { validationResult, checkSchema } = require("express-validator");

const sequentialValidate = (...validations) => {
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

const parallelValidate = (...validations) => {
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

const validateSchema = (schema) => {
  return async (req, res, next) => {
    await checkSchema(schema).run(req)
    var errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      errors: errors.array(),
    });
  }
}

const validate = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);
    var errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      errors: errors.array()
    });
  }
}

module.exports = {
  parallelValidate,
  sequentialValidate,
  validateSchema,
  validate
}