// config/config.js
module.exports = {
  config: {
    baseUrl: 'https://hackthefuture.bignited.be',
    headless: false,
    slowMo: 200,
    timeouts: {
      default: 30000,
      popup: 20000,
      crystal: 10000
    }
  }
};