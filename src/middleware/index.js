//Checks to make sure the user is logged in and redirects them if not
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

//Checks to make sure the user is logged out and redirects them if not
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/home');
  }

  return next();
};

//Checks to make sure the user is connected via HTTPS and forces them to be if not
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

//Bypasses the requiresSecure check if not on a Production environment
const bypassSecure = (req, res, next) => {
  next();
};

//Exports methods for the module so they can be used by other files
module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
