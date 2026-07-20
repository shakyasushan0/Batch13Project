import User from "../model/User.js";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  const { jwt: token } = req.cookies;
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(_id);
    req.user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

const checkAdmin = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) next();
  else
    return res
      .status(403)
      .send({ error: "You dont have permission to perform this operation" });
};

export { checkAuth, checkAdmin };
