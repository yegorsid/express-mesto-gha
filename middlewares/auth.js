// const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UserAuthError = require('../errors/UserAuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UserAuthError('Unauthorized');
  }

  let payload;

  const token = req.cookies.jwt;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UserAuthError('Unauthorized'));
  }

  req.user = payload;

  return next();
};
