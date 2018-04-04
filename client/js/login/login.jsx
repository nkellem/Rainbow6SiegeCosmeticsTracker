const handleLogin = e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const loginForm = document.querySelector('#loginForm');

  if (username === '' || password === '') {
    handleError('You must enter both a Username and a Password');
    return false;
  }

  console.dir(serialize(loginForm));
  sendAjax('POST', '/login', serialize(loginForm), redirect);

  return false;
};

const handleSignup = e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const password2 = document.querySelector('#password2').value;
  const signupForm = document.querySelector('#signupForm');
	
	const data = {
		username:	username,
		password: password,
		password2: password2,
	};

  if (username === '' || password === '' || password2 === '') {
    handleError('All fields are required');
    return false;
  }

  if (password !== password2) {
    handleError('Passwords do not match');
    return false;
  }
	
	console.dir(serialize(signupForm));
  sendAjax('POST', '/signup', serialize(signupForm), redirect);
	//console.dir(JSON.stringify(data));
	//sendAjax('POST', '/signup', JSON.stringify(data), redirect);

  return false;
};

const LoginWindow = props => {
  return (
    <form id="loginForm" name="loginForm" action="/login" onSubmit={handleLogin} method="POST" className="mainForm">
      <label htmlFor="username">Username: </label>
      <input id="username" type="text" name="username" placeholder="username" />
      <label htmlFor="password">Password: </label>
      <input id="password" type="password" name="password" placeholder="password" />
      <input className="submitForm" type="submit" value="Sign In " />
    </form>
  );
};

const SignupWindow = props => {
  return (
    <form id="signupForm" name="signupForm" action="/signup" onSubmit={handleSignup} method="POST" className="mainForm">
      <label htmlFor="username">Username: </label>
      <input id="username" type="text" name="username" placeholder="username" />
      <label htmlFor="password">Password: </label>
      <input id="password" type="password" name="password" placeholder="password" />
      <label htmlFor="password2">Confirm Password: </label>
      <input id="password2" type="password" name="password2" placeholder="confirm password" />
      <input className="submitForm" type="submit" value="Sign In " />
    </form>
  );
};

const createLoginWindow = () => {
  ReactDOM.render(
    <LoginWindow />,
    document.querySelector('#content')
  );
};

const createSignupWindow = () => {
  ReactDOM.render(
    <SignupWindow />,
    document.querySelector('#content')
  );
};

const setup = () => {
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');

  loginButton.addEventListener('click', e => {
    e.preventDefault();
    createLoginWindow();
    return false;
  });

  signupButton.addEventListener('click', e => {
    e.preventDefault();
    createSignupWindow();
    return false;
  });

  createLoginWindow();
};

setup();
