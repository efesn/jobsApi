const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthenticatedError("Authentication invalid"));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new UnauthenticatedError("Authentication invalid - Token not found"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to the job routes
    req.user = { userId: payload.userId, name:payload.name };
    next();
  } catch (error) {
    return next(new UnauthenticatedError('Authentication invalid - Token verification failed'));
  }
};

module.exports = auth;