import User from "../model/User.js";
import setToken from "../utils/createToken.js";

const signup = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ error: "User already exists!" });
    // let err = new Error("User Already Exists");
    // err.status = 400;
    // throw err;
  }

  const user = await User.create({ fullname, email, password, isAdmin });
  res.status(201).send({ message: "User created!", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found!" });
  }
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    setToken(user._id, res);
    res.send({
      message: "Login Success",
      user: {
        email: user.email,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(400).send({ error: "Invalid password!" });
  }
};

export { signup, login };
