/*  MODELS */
require('./models/User');
/* INCLUDES */
const express = require('express'),
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session');
(bodyParser = require('body-parser')), (key = require('./keys/key'));
/* routes */
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoute');

/* mongo setup */
const mongoURI = key.mongoURI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongo db');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

//---app
const app = express();

/* middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(indexRoutes);
app.use(authRoutes);

/* --cookies--- */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [key.COOKIE_KEY],
  })
);

/* app listen */
app.listen(key.backendPORT, () => {
  console.log(`listening on port ${key.backendPORT}`);
});
