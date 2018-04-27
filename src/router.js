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
  app.get('/getCharms', mid.requiresSecure, mid.requiresLogin, controllers.Charm.getCharms);
  app.get('/getHeadgear', mid.requiresSecure, mid.requiresLogin, controllers.Headgear.getHeadgear);
  app.get('/getUniforms', mid.requiresSecure, mid.requiresLogin, controllers.Uniform.getUniforms);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/addNewEntry', mid.requiresSecure, mid.requiresLogin, controllers.Weapon.addWeaponSkin);
  app.post('/addNewCharmEntry', mid.requiresSecure, mid.requiresLogin, controllers.Charm.addCharm);
  app.post('/addNewHeadgearEntry', mid.requiresSecure, mid.requiresLogin, controllers.Headgear.addHeadgear);
  app.post('/addNewUniformEntry', mid.requiresSecure, mid.requiresLogin, controllers.Uniform.addUniform);
  app.post('/changePassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePassword);
  app.get('*', mid.requiresSecure, mid.requiresLogin, controllers.Weapon.operatorsPage);
};

// exports the router
module.exports = router;
