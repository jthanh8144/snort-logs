const { index } = require('../controllers/index');

const route = (app) => {
  app.get('/', index);
};

module.exports = { route };
