const controllers = require('./controllers');

const router = app => {
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.post('/signup', controllers.Account.signup);
  app.get('/', controllers.Account.loginPage);
  app.get('/home', controllers.Operators.operatorsPage);
};

module.exports = router;
