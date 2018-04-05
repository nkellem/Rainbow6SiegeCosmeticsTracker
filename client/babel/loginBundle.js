'use strict';

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  var username = document.querySelector('#username').value;
  var password = document.querySelector('#password').value;
  var loginForm = document.querySelector('#loginForm');

  if (username === '' || password === '') {
    handleError('You must enter both a Username and a Password');
    return false;
  }

  console.dir(serialize(loginForm));
  sendAjax('POST', '/login', serialize(loginForm), redirect);

  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  var username = document.querySelector('#username').value;
  var password = document.querySelector('#password').value;
  var password2 = document.querySelector('#password2').value;
  var signupForm = document.querySelector('#signupForm');

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

  return false;
};

var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    'form',
    { id: 'loginForm', name: 'loginForm', action: '/login', onSubmit: handleLogin, method: 'POST', className: 'mainForm' },
    React.createElement(
      'label',
      { htmlFor: 'username' },
      'Username: '
    ),
    React.createElement('input', { id: 'username', type: 'text', name: 'username', placeholder: 'username' }),
    React.createElement(
      'label',
      { htmlFor: 'password' },
      'Password: '
    ),
    React.createElement('input', { id: 'password', type: 'password', name: 'password', placeholder: 'password' }),
    React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Sign In ' })
  );
};

var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    'form',
    { id: 'signupForm', name: 'signupForm', action: '/signup', onSubmit: handleSignup, method: 'POST', className: 'mainForm' },
    React.createElement(
      'label',
      { htmlFor: 'username' },
      'Username: '
    ),
    React.createElement('input', { id: 'username', type: 'text', name: 'username', placeholder: 'username' }),
    React.createElement(
      'label',
      { htmlFor: 'password' },
      'Password: '
    ),
    React.createElement('input', { id: 'password', type: 'password', name: 'password', placeholder: 'password' }),
    React.createElement(
      'label',
      { htmlFor: 'password2' },
      'Confirm Password: '
    ),
    React.createElement('input', { id: 'password2', type: 'password', name: 'password2', placeholder: 'confirm password' }),
    React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Sign In ' })
  );
};

var createLoginWindow = function createLoginWindow() {
  ReactDOM.render(React.createElement(LoginWindow, null), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow() {
  ReactDOM.render(React.createElement(SignupWindow, null), document.querySelector('#content'));
};

var setup = function setup() {
  var loginButton = document.querySelector('#loginButton');
  var signupButton = document.querySelector('#signupButton');

  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    createLoginWindow();
    return false;
  });

  signupButton.addEventListener('click', function (e) {
    e.preventDefault();
    createSignupWindow();
    return false;
  });

  createLoginWindow();
};

setup();
'use strict';

//TODO:: Implement real versions of handleError and redirect
var handleError = function handleError(message) {
  alert(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  fetch(action, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: type,
    body: data
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.error) {
      handleError(data.error);
      return;
    }
    success(data);
  });
};
