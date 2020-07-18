const jwt = require('jsonwebtoken'),
  key = require('../keys/key'),
  mongoose = require('mongoose');
const User = mongoose.model('UnVierUsers');

module.exports = (req, res, next) => {
  // authenticate the user with the token sent to the user
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      error: 'You must be logged in.',
    });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, key.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({
        error: 'You must be logged in.',
      });
    }
    const { userId } = payload;
    const Userwhomadereuqest = await User.findById(userId);
    req.user = Userwhomadereuqest;
    next();
  });
};
