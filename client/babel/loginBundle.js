'use strict';

//signs the user in
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

//creates an account for the user and signs them in
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

//React Component for rendering the login form on the login.handlebars page
var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('div', { id: 'toast' }),
    React.createElement(
      'form',
      { id: 'loginForm', name: 'loginForm', action: '/login', onSubmit: handleLogin, method: 'POST', className: 'mainForm alteredFont' },
      React.createElement(
        'div',
        { className: 'rightAlign' },
        React.createElement(
          'label',
          { htmlFor: 'username' },
          'Username: '
        ),
        React.createElement('input', { className: 'alteredFont', id: 'username', type: 'text', name: 'username', placeholder: 'USERNAME' })
      ),
      React.createElement(
        'div',
        { className: 'rightAlign' },
        React.createElement(
          'label',
          { htmlFor: 'password' },
          'Password: '
        ),
        React.createElement('input', { className: 'alteredFont', id: 'password', type: 'password', name: 'password', placeholder: 'PASSWORD' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Sign In ' })
      )
    )
  );
};

//React Component for rendering the sign up form on the login.handlebars page
var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('div', { id: 'toast' }),
    React.createElement(
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
        React.createElement('input', { className: 'alteredFont', id: 'username', type: 'text', name: 'username', placeholder: 'USERNAME' })
      ),
      React.createElement(
        'div',
        { className: 'rightAlign' },
        React.createElement(
          'label',
          { htmlFor: 'password' },
          'Password: '
        ),
        React.createElement('input', { className: 'alteredFont', id: 'password', type: 'password', name: 'password', placeholder: 'PASSWORD' })
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
        React.createElement('input', { className: 'alteredFont', id: 'password2', type: 'password', name: 'password2', placeholder: 'CONFIRM PASSWORD' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Sign In ' })
      )
    )
  );
};

//renders the login window
var createLoginWindow = function createLoginWindow() {
  ReactDOM.render(React.createElement(LoginWindow, null), document.querySelector('#content'));
};

//renders the sign up window
var createSignupWindow = function createSignupWindow() {
  ReactDOM.render(React.createElement(SignupWindow, null), document.querySelector('#content'));
};

//method for setting up click events and rendering each form appropriately
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

//render the page
setup();
'use strict';

//handles what to do in case an AJAX request sends back an error
var handleError = function handleError(message) {
		createToastMessage("toastError", message);
};

//redirects the user to a specified page
var redirect = function redirect(response) {
		window.location = response.redirect;
};

//helper method for sending out AJAX requests
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

//helper method for transferring which link is active on the cosmetic selectn nav
var makeSectionActive = function makeSectionActive(e) {
		document.querySelector('a[class="active"]').className = '';
		e.target.className = 'active';
};

//React Component for rendering sucess and error messages from the server
var ToastComponent = function ToastComponent(props) {
		return React.createElement(
				'h2',
				{ className: props.className },
				props.message
		);
};

//Renders the toast message based on success or failure of an AJAX request
var createToastMessage = function createToastMessage(className, message) {
		ReactDOM.render(React.createElement(ToastComponent, { className: className, message: message }), document.querySelector('#toast'));
};
'use strict';

//holds weapon data for each operator
//used in the newEntry.jsx file to dynamically load weapon options
var opGuns = {
  Ash: ['G36C', 'R4-C', 'M45 MEUSOC', '5.7 USG'],
  Bandit: ['MP7', 'M870', 'P12'],
  Blackbeard: ['MK17 CQB', 'SR-25', 'D-50'],
  Blitz: ['Flash Shield', 'P12'],
  Buck: ['C8 SFW', 'CAMRS', 'MK1 9mm'],
  Capitao: ['PARA 308', 'M249', 'PRB92'],
  Castle: ['UMP45', 'M1014', '5.7 USG', 'M45 MEUSOC'],
  Caveira: ['M12', 'SPAS-15', 'Luison'],
  Doc: ['SG CQB', 'MP5', 'P90', 'P9', 'LFP586'],
  Dokkaebi: ['MK 14 EBR',, 'BOSG. 12.2', 'C75 Auto', 'SMG-12'],
  Echo: ['Supernova', 'MP5SD', 'P229', 'Bearing 9'],
  Finka: ['SPEAR .308', '6P41', 'SASG-12', 'PMM', 'GSH-18'],
  Frost: ['Super 90', '9mm C1', 'MK1 9mm'],
  Fuze: ['Ballistic Shield', '6P41', 'AK 12', 'PMM', 'GSH 18'],
  Glaz: ['OTs-03', 'GSH 18', 'PMM'],
  Hibana: ['Type 89', 'Supernova', 'P229', 'Bearing 9'],
  IQ: ['AUG A2', '552 Commando', 'G8A1', 'P12'],
  Jackal: ['C7E', 'PDW9', 'ITA12L', 'ITA12S', 'USP40'],
  Jager: ['M870', '416-C Carbine', 'P12'],
  Kapkan: ['9x19VSN', 'SASG-12', 'PMM', 'GSH 18'],
  Lesion: ['SIX12 SD', 'T-5 SMG', 'Q-929'],
  Lion: ['V308', '417', 'SG-CQB', 'P9', 'LFP586'],
  Montagne: ['Extendable Shield', 'P9', 'LFP586'],
  Mute: ['MP5K', 'M590A1', 'P226 MK-25'],
  Pulse: ['M1014', 'UMP45', 'M45 MEUSOC', '5.7 USG'],
  Rook: ['P90', 'MP5', 'SG-CQB', 'LFP586', 'P9'],
  Sledge: ['M590A1', 'L85A2', 'P226 MK-25', 'SMG-11'],
  Smoke: ['FMG-9', 'M590A1', 'P226 MK-25', 'SMG-11'],
  Tachanka: ['SASG-12', '9x19VSN', 'GSH 18', 'PMM'],
  Thatcher: ['AR33', 'L85A2', 'M590A1', 'P226 MK-25'],
  Thermite: ['M1014', '556XI', 'M45 MEUSOC', '5.7 USG'],
  Twitch: ['F2', '417', 'SG CQB', 'P9', 'LFP586'],
  Valkyrie: ['MPX', 'SPAS-12', 'D-50'],
  Zofia: ['LMG-E', 'M762', 'RG15']
};
