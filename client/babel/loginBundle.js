'use strict';

//
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  var username = document.querySelector('#username').value;
  var password = document.querySelector('#password').value;
  var loginForm = document.querySelector('#loginForm');

  if (username === '' || password === '') {
    handleError('You must enter both a Username and a Password');
    return false;
  }

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

  sendAjax('POST', '/signup', serialize(signupForm), redirect);

  return false;
};

var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    'form',
    { id: 'loginForm', name: 'loginForm', action: '/login', onSubmit: handleLogin, method: 'POST', className: 'mainForm' },
    React.createElement(
      'div',
      { className: 'rightAlign' },
      React.createElement(
        'label',
        { htmlFor: 'username' },
        'Username: '
      ),
      React.createElement('input', { id: 'username', type: 'text', name: 'username', placeholder: 'username' })
    ),
    React.createElement(
      'div',
      { className: 'rightAlign' },
      React.createElement(
        'label',
        { htmlFor: 'password' },
        'Password: '
      ),
      React.createElement('input', { id: 'password', type: 'password', name: 'password', placeholder: 'password' })
    ),
    React.createElement(
      'div',
      null,
      React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Sign In ' })
    )
  );
};

var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    'form',
    { id: 'signupForm', name: 'signupForm', action: '/signup', onSubmit: handleSignup, method: 'POST', className: 'mainForm' },
    React.createElement(
      'div',
      { className: 'rightAlign' },
      React.createElement(
        'label',
        { htmlFor: 'username' },
        'Username: '
      ),
      React.createElement('input', { id: 'username', type: 'text', name: 'username', placeholder: 'username' })
    ),
    React.createElement(
      'div',
      { className: 'rightAlign' },
      React.createElement(
        'label',
        { htmlFor: 'password' },
        'Password: '
      ),
      React.createElement('input', { id: 'password', type: 'password', name: 'password', placeholder: 'password' })
    ),
    React.createElement(
      'div',
      { className: 'rightAlign' },
      React.createElement(
        'label',
        { htmlFor: 'password2' },
        'Confirm ',
        React.createElement(
          'span',
          { className: 'siegeLogo' },
          'Password: '
        )
      ),
      React.createElement('input', { id: 'password2', type: 'password', name: 'password2', placeholder: 'confirm password' })
    ),
    React.createElement(
      'div',
      null,
      React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Sign In ' })
    )
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
    credentials: 'include',
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
"use strict";

var opGuns = {
  Ash: ["G36C", "R4-C", "M45 MEUSOC", "5.7 USG"],
  Blackbeard: ["MK17 CQB", "SR-25", "D-50"],
  Blitz: ["Flash Shield", "P12"],
  Buck: ["C8 SFW", "CAMRS", "MK1 9mm"],
  Capitao: ["PARA 308", "M249", "PRB92"],
  Fuze: ["Ballistic Shield", "6P41", "AK 12", "PMM", "GSH 18"],
  Glaz: ["OTs-03", "GSH 18", "PMM"],
  Hibana: ["Type 89", "Supernova", "P229", "Bearing 9"],
  IQ: ["AUG A2", "552 Commando", "G8A1", "P12"],
  Montagne: ["Extendable Shield", "P9", "LFP586"],
  Sledge: ["M590A1", "L85A2", "P226 MK-25", "SMG-11"],
  Thatcher: ["AR33", "L85A2", "M590A1", "P226 MK-25"],
  Thermite: ["M1014", "556XI", "M45 MEUSOC", "5.7 USG"],
  Twitch: ["F2", "417", "SG CQB"],
  Bandit: ["MP7", "M870", "P12"],
  Castle: ["UMP45", "M1014", "5.7 USG", "M45 MEUSOC"],
  Caveira: ["M12", "SPAS-15", "Luison"],
  Doc: ["SG CQB", "MP5", "P90", "P9", "LFP586"],
  Echo: ["Supernova", "MP5SD", "P229", "Bearing 9"],
  Frost: ["Super 90", "9mm C1", "MK1 9mm"],
  Jager: ["M870", "416-C Carbine", "P12"],
  Kapkan: ["9x19VSN", "SASG-12", "PMM", "GSH 18"],
  Smoke: ["FMG-9", "M590A1", "P226 MK-25", "SMG-11"],
  Pulse: ["M1014", "UMP45", "M45 MEUSOC", "5.7 USG"],
  Rook: ["P90", "MP5", "SG-CQB", "LFP586", "P9"],
  Mute: ["MP5K", "M590A1", "P226 MK-25"],
  Tachanka: ["SASG-12", "9x19VSN", "GSH 18", "PMM"],
  Valkyrie: ["MPX", "SPAS-12", "D-50"]
};
