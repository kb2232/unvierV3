require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  //production
  console.log({
    currentKeyUsed: 'production',
  });
  module.exports = require('./prod');
} else {
  console.log({
    currentKeyUsed: 'development',
  });
  //dev stuff
  module.exports = require('./dev');
}
