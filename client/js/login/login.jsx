//signs the user in
const handleLogin = e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const loginForm = document.querySelector('#loginForm');

  if (username === '' || password === '') {
    handleError('You must enter both a Username and a Password');
    return false;
  }

  sendAjax('POST', '/login', serialize(loginForm), redirect);

  return false;
};

//creates an account for the user and signs them in
const handleSignup = e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const password2 = document.querySelector('#password2').value;
  const signupForm = document.querySelector('#signupForm');

  if (username === '' || password === '' || password2 === '') {
    handleError('All fields are required');
    return false;
  }

  if (password !== password2) {
    handleError('Passwords do not match');
    return false;
  }

  sendAjax('POST', '/signup', serialize(signupForm), redirect);

  return false;
};

//React Component for rendering the login form on the login.handlebars page
const LoginWindow = props => {
  return (
    <form id="loginForm" name="loginForm" action="/login" onSubmit={handleLogin} method="POST" className="mainForm alteredFont">
			<div className="rightAlign">
				<label htmlFor="username">Username: </label>
      	<input className="alteredFont" id="username" type="text" name="username" placeholder="USERNAME" />
			</div>
			<div className="rightAlign">
				<label htmlFor="password">Password: </label>
      	<input className="alteredFont" id="password" type="password" name="password" placeholder="PASSWORD" />
			</div>
			<div>
				<input className="submitForm" type="submit" value="Sign In " />
			</div>
    </form>
  );
};

//React Component for rendering the sign up form on the login.handlebars page
const SignupWindow = props => {
  return (
    <form id="signupForm" name="signupForm" action="/signup" onSubmit={handleSignup} method="POST" className="mainForm">
			<div className="rightAlign">
				<label htmlFor="username">Username: </label>
      	<input className="alteredFont" id="username" type="text" name="username" placeholder="USERNAME" />
			</div>
			<div className="rightAlign">
				<label htmlFor="password">Password: </label>
      	<input className="alteredFont" id="password" type="password" name="password" placeholder="PASSWORD" />
			</div>
			<div className="rightAlign">
				<label htmlFor="password2">Confirm <span className="siegeLogo">Password: </span></label>
      	<input className="alteredFont" id="password2" type="password" name="password2" placeholder="CONFIRM PASSWORD" />
			</div>
			<div>
				<input className="submitForm" type="submit" value="Sign In " />
			</div>
    </form>
  );
};

//renders the login window
const createLoginWindow = () => {
  ReactDOM.render(
    <LoginWindow />,
    document.querySelector('#content')
  );
};

//renders the sign up window
const createSignupWindow = () => {
  ReactDOM.render(
    <SignupWindow />,
    document.querySelector('#content')
  );
};

//method for setting up click events and rendering each form appropriately
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

//render the page
setup();
