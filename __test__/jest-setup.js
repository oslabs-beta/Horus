module.exports = async () => {
  global.testClientWrapper = await require('./HorusClientWrapper.js');
};