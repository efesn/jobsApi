const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid Credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestError("Invalid Credentials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
