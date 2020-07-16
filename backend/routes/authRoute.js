const express = require('express'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  key = require('../keys/key');
const User = mongoose.model('UnVierUsers');

const router = express.Router();

/* new user signup */
router.post('/newusersignup', async (req, res) => {
  const { name, email, username, password, mobile } = req.body;
  /* check if your email or username is already registered */
  const uniqueName = await User.findOne({ username });
  const userEmail = await User.findOne({ email });
  const uniqueMobile = await User.findOne({ mobile });
  if (uniqueName || userEmail || uniqueMobile)
    return res.status(422).send('username / mobile / email already registered');
  else {
    try {
      const newUser = new User({ name, email, username, password, mobile });
      await newUser.save();
      /*this token is to sign the user - a way to track the signed in user */
      const token = jwt.sign({ userId: newUser._id }, key.JWT_KEY);
      res.send({ token });
    } catch (error) {
      return res.status(422).send(error);
    }
  }
});

/* sign into app */
router.post('/signintoapp', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(422).send({ error: 'Must provide email and password' });
  const user = await User.findOne({ username });
  if (!user) return res.status(422).send({ error: 'Username is taken' });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, key.JWT_KEY);
    res.send({ token });
  } catch (error) {
    console.log({ error });
    return res.status(422).send({ error: 'Password does not match account' });
  }
});

module.exports = router;
