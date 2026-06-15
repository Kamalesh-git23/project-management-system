export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,

        errors:
          result.error.issues.map( (issue) => issue.message),
      });
    }

    req.body = result.data;
    next();
  };