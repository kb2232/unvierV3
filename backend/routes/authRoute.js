const express = require('express'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  key = require('../keys/key');
const User = mongoose.model('UnVierUsers');

const router = express.Router();

/* new user signup */
router.post('/newusersignup', async (req, res) => {
  const { name, email, username, password, mobile,biography } = req.body;
  /* check if your email or username is already registered */
  const uniqueName = await User.findOne({ username });
  const userEmail = await User.findOne({ email });
  const uniqueMobile = await User.findOne({ mobile });
  if(userEmail) return res.status(401).send('email registered');
  if(uniqueName) return res.status(402).send('username registered');
  if(uniqueMobile) return res.status(403).send('mobile registered');
  else {
    try {
      const newUser = new User({ name, email, username, password, mobile,biography });
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
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(402).send({ error: 'Must provide email and password' });
  const user = await User.findOne({ email });
  if (!user) return res.status(403).send({ error: 'email is not registered' });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, key.JWT_KEY);
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: 'Password does not match account' });
  }
});

/* get user profile */
router.post('/getuserprofile',async(req,res)=>{
  const {emailToken} = req.body;
  try {
    const user = await User.findOne({ email:emailToken });
    res.send({user})
  } catch (error) {
    res.send({errorMessage:'we could not get your profile'})
  }
})


module.exports = router;
