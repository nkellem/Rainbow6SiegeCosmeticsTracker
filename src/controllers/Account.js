const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login');
};

const login = (req, res) => {
  const request = req;
  const response = res;

  // force cast to strings to overcome some security flaws
  const username = `${request.body.username}`;
  const password = `${request.body.password}`;

  console.dir(req);
  console.dir(password);

  if (!username || !password) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return response.status(401).json({ error: 'Wrong username or password' });
    }

    //request.session.account = Account.AccountModel.toAPI(account);

    return response.json({ redirect: '/assets/index.html' });
  });
};

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
      //request.session.account = Account.AccountModel.toAPI(newAccount);
      response.json({ redirect: '/assets/index.html' });
    });

    savePromise.catch(err => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'username already in user' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

module.exports = {
  loginPage,
  login,
  signup,
};
