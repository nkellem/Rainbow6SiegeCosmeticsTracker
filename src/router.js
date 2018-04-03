const controllers = require('./controllers');

const router = app => {
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.post('/signup', controllers.Account.signup);
  app.get('/', controllers.Account.loginPage);
};

module.exports = router;
