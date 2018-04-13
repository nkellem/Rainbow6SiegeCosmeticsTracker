// Pulls in Controllers and Middleware modules
const controllers = require('./controllers');
const mid = require('./middleware');

// handles routing for the app
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/home', mid.requiresLogin, controllers.Weapon.operatorsPage);
  app.get('/opWeapons', mid.requiresSecure, mid.requiresLogin, controllers.Weapon.getWeaponSkins);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/addNewEntry', mid.requiresSecure, mid.requiresLogin, controllers.Weapon.addWeaponSkin);
};

// exports the router
module.exports = router;
