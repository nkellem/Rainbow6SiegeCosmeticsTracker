// Load the models module
const models = require('../models');

// Account model extracted from models module
const { Account } = models;

// Renders the login page
const loginPage = (req, res) => {
  res.render('login');
};

// Handles server-side account authentication for users logging in
const login = (req, res) => {
  const request = req;
  const response = res;

  // force cast to strings to overcome some security flaws
  const username = `${request.body.username}`;
  const password = `${request.body.password}`;

  if (!username || !password) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return response.status(401).json({ error: 'Wrong username or password' });
    }

    request.session.account = Account.AccountModel.toAPI(account);
		console.log(request.session.account);

    return response.json({ redirect: '/home' });
  });
};

// Logs out the user and resets their session
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// Creates an account for the user and logs them in
// Adds account details to their session
const signup = (req, res) => {
  const request = req;
  const response = res;

  // cast to strings to cover up some security measures
  request.body.username = `${request.body.username}`;
  request.body.password = `${request.body.password}`;
  request.body.password2 = `${request.body.password2}`;

  if (!request.body.username || !request.body.password || !request.body.password2) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  if (request.body.password !== request.body.password2) {
    return response.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(request.body.password, (salt, hash) => {
    const accountData = {
      username: request.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      request.session.account = Account.AccountModel.toAPI(newAccount);
      response.json({ redirect: '/home' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'username already in user' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// Changes the user's password
// It makes sure the user entered their current password correctly
// Then it changes password
const changePassword = (req, res) => {
  const request = req;
  const response = res;

  // force cast to strings to cover up some security measures
  request.body.password = `${request.body.password}`;
  request.body.newPassword = `${request.body.newPassword}`;
  request.body.newPassword2 = `${request.body.newPassword2}`;

  if (!request.body.password || !request.body.newPassword || !request.body.newPassword2) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  if (request.body.newPassword !== request.body.newPassword2) {
    return response.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.authenticate(`${request.session.account.username}`, request.body.password, (err, pass) => {
    if (err || !pass) {
      return response.status(401).json({ error: 'Current Passwords do not match' });
    }

    return Account.AccountModel.generateHash(request.body.newPassword, (salt, hash) => {
      const search = {
        username: `${request.session.account.username}`,
      };

      Account.AccountModel.update(search, { $set: { password: hash, salt } }, {}, (error) => {
        if (error) {
          return response.status(500).json({ error: 'Unable to update Password' });
        }

        return response.status(200).json({ redirect: '/home' });
      });
    });
  });
};

//changes the user's account premium status to true
const upgradeAccount = (req, res) => {
	const request = req;
	const response = res;
	
	const search = {
		username: `${request.session.account.username}`,
	};
	
	return Account.AccountModel.update(search, { $set: { premium: true } }, {}, (err) => {
		if (err) {
			return response.status(500).json({ error: 'Unable to update Premium account status' });
		}
		
		request.session.account.premium = true;
		return response.status(200).json({ message: 'Account upgraded successfully!' });
	});
};

// Exports methods for the module so they can be used by other files
module.exports = {
  loginPage,
  login,
  logout,
  signup,
  changePassword,
	upgradeAccount,
};
