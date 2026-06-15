import jwt from "jsonwebtoken";

export const generateToken = ( userId, role = "USER") => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};