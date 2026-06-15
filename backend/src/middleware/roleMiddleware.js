import AppError from "../utils/AppError.js";

export const authorize = (...roles) => (req, res, next) => {
    if ( !roles.includes(req.user.role) ) {
      return next(
        new AppError( "Access Denied", 403)
      );
    }
    next();
  };