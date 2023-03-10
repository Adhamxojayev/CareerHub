import jwt from "../utils/jwt.js";

export default (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("token required");
    }

    const user = jwt.verify(authorization);

    if (!user.id) {
      throw new Error("Unauthorized");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};
