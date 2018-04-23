'use strict';

//Serializess the form data and sends it to the server
//Handles the request to change user password
var handleChangePassword = function handleChangePassword(e) {
	e.preventDefault();

	var currPass = document.querySelector('#password').value;
	var newPass = document.querySelector('#newPassword').value;
	var newPass2 = document.querySelector('#newPassword2').value;
	var changePassForm = document.querySelector('#changePassForm');

	if (currPass === '' || newPass === '' || newPass2 === '') {
		handleError('All fields are required');
		return false;
	}

	if (newPass !== newPass2) {
		handleError('Passwords do not match');
		return false;
	}

	sendAjax('POST', '/changePassword', serialize(changePassForm), redirect);

	return false;
};

//React Component for rendering the Change Password view
var ChangePasswordComponent = function ChangePasswordComponent(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'h2',
			{ className: 'pageHeader' },
			'Change ',
			React.createElement(
				'span',
				{ className: 'siegeLogo' },
				'Password'
			)
		),
		React.createElement(
			'form',
			{ id: 'changePassForm', name: 'changePassForm', action: '/changePassword', onSubmit: handleChangePassword, method: 'POST' },
			React.createElement(
				'div',
				{ className: 'rightAlign' },
				React.createElement(
					'label',
					{ htmlFor: 'password' },
					'Current Password: '
				),
				React.createElement('input', { id: 'password', type: 'password', name: 'password', placeholder: 'password' })
			),
			React.createElement(
				'div',
				{ className: 'rightAlign' },
				React.createElement(
					'label',
					{ htmlFor: 'newPassword' },
					'New Password: '
				),
				React.createElement('input', { id: 'newPassword', type: 'password', name: 'newPassword', placeholder: 'new password' })
			),
			React.createElement(
				'div',
				{ className: 'rightAlign' },
				React.createElement(
					'label',
					{ htmlFor: 'newPassword2' },
					'Confirm ',
					React.createElement(
						'span',
						{ className: 'siegeLogo' },
						'Password: '
					)
				),
				React.createElement('input', { id: 'newPassword2', type: 'password', name: 'newPassword2', placeholder: 'confirm password' })
			),
			React.createElement(
				'div',
				null,
				React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Change Password' })
			)
		)
	);
};

//Renders the change password form
var createChangePasswordForm = function createChangePasswordForm() {
	ReactDOM.render(React.createElement(ChangePasswordComponent, null), document.querySelector('#mainContent'));
};

//Renders the entire change password view
var createChangePasswordView = function createChangePasswordView() {
	createChangePasswordForm();
	createNewEntryFormNav();
};

//Sets up event listener for change password
var handleChangePasswordClick = function handleChangePasswordClick() {
	var changePass = document.querySelector('#changePassword');

	changePass.addEventListener('click', function (e) {
		e.preventDefault();
		createChangePasswordView();
	});
};
'use strict';

//Sends op weapon data to the server to save skins
var handleEntrySubmit = function handleEntrySubmit(e) {
  e.preventDefault();
  var opName = document.querySelector('#operatorSelect').value;
  var weaponName = document.querySelector('#opGun').value;
  var skin = document.querySelector('#gunSkin').value;
  var entryForm = document.querySelector('#newEntryForm');

  if (opName === '' || weaponName === '' || skin === '') {
    handleError('All fields are required');
    return false;
  }

  sendAjax(entryForm.getAttribute('method'), entryForm.getAttribute('action'), serialize(newEntryForm), function () {
    alert('Skin added!');
    document.querySelector('#operatorSelect').value = '';
    document.querySelector('#gunSkin').value = '';
    createWeaponSelect([]);
  });

  return false;
};

//React Component for the nav bar so the user can go back to the home page
var HomeNav = function HomeNav(props) {
  return React.createElement(
    'a',
    { href: '#', onClick: createTracker },
    'Home'
  );
};

//React Component to create dynamic options for the weapons select
var OpWeaponOption = function OpWeaponOption(props) {
  return React.createElement(
    'option',
    { value: props.weaponName },
    props.weaponName
  );
};

//React Component that creates the weapons select
var OpWeaponOptions = function OpWeaponOptions(props) {
  var options = [];

  props.weapons.forEach(function (weapon) {
    options.push(React.createElement(OpWeaponOption, { weaponName: weapon }));
  });

  if (props.summary) {
    return React.createElement(
      'select',
      { name: 'weaponName', onChange: function onChange(e) {
          return loadWeaponSkinList(e, props.skins);
        } },
      React.createElement(
        'option',
        { value: '' },
        'Select A Gun'
      ),
      options
    );
  } else {
    return React.createElement(
      'select',
      { name: 'weaponName' },
      React.createElement(
        'option',
        { value: '' },
        'Select A Gun'
      ),
      options
    );
  }
};

//React Component for rendring the New Entry form
var NewEntryForm = function NewEntryForm(props) {
  return React.createElement(
    'div',
    { id: 'formDiv' },
    React.createElement(
      'form',
      { action: '/addNewEntry', method: 'POST', name: 'newEntryForm', onSubmit: handleEntrySubmit, id: 'newEntryForm' },
      React.createElement(
        'select',
        { name: 'opName', id: 'operatorSelect', onChange: loadOpWeaponOptions },
        React.createElement(
          'option',
          { value: '' },
          'Select An Op'
        ),
        React.createElement(
          'option',
          { value: 'Ash' },
          'Ash'
        ),
        React.createElement(
          'option',
          { value: 'Blackbeard' },
          'Blackbeard'
        ),
        React.createElement(
          'option',
          { value: 'Blitz' },
          'Blitz'
        ),
        React.createElement(
          'option',
          { value: 'Buck' },
          'Buck'
        ),
        React.createElement(
          'option',
          { value: 'Capitao' },
          'Capitao'
        ),
        React.createElement(
          'option',
          { value: 'Fuze' },
          'Fuze'
        ),
        React.createElement(
          'option',
          { value: 'Glaz' },
          'Glaz'
        ),
        React.createElement(
          'option',
          { value: 'Hibana' },
          'Hibana'
        ),
        React.createElement(
          'option',
          { value: 'IQ' },
          'IQ'
        ),
        React.createElement(
          'option',
          { value: 'Montagne' },
          'Montagne'
        ),
        React.createElement(
          'option',
          { value: 'Sledge' },
          'Sledge'
        ),
        React.createElement(
          'option',
          { value: 'Thatcher' },
          'Thatcher'
        ),
        React.createElement(
          'option',
          { value: 'Thermite' },
          'Thermite'
        ),
        React.createElement(
          'option',
          { value: 'Twitch' },
          'Twitch'
        ),
        React.createElement(
          'option',
          { value: 'Bandit' },
          'Bandit'
        ),
        React.createElement(
          'option',
          { value: 'Castle' },
          'Castle'
        ),
        React.createElement(
          'option',
          { value: 'Caveira' },
          'Caveira'
        ),
        React.createElement(
          'option',
          { value: 'Doc' },
          'Doc'
        ),
        React.createElement(
          'option',
          { value: 'Echo' },
          'Echo'
        ),
        React.createElement(
          'option',
          { value: 'Frost' },
          'Frost'
        ),
        React.createElement(
          'option',
          { value: 'Jager' },
          'Jager'
        ),
        React.createElement(
          'option',
          { value: 'Kapkan' },
          'Kapkan'
        ),
        React.createElement(
          'option',
          { value: 'Mute' },
          'Mute'
        ),
        React.createElement(
          'option',
          { value: 'Pulse' },
          'Pulse'
        ),
        React.createElement(
          'option',
          { value: 'Rook' },
          'Rook'
        ),
        React.createElement(
          'option',
          { value: 'Smoke' },
          'Smoke'
        ),
        React.createElement(
          'option',
          { value: 'Tachanka' },
          'Tachanka'
        ),
        React.createElement(
          'option',
          { value: 'Valkyrie' },
          'Valkyrie'
        )
      ),
      React.createElement('span', { id: 'opGun' }),
      React.createElement('input', { id: 'gunSkin', type: 'text', name: 'skin', placeholder: 'Enter a Skin' }),
      React.createElement('input', { id: 'submitEntry', type: 'submit', value: 'submit' })
    )
  );
};

//Renders the new entry form
var createNewEntryForm = function createNewEntryForm() {
  ReactDOM.render(React.createElement(NewEntryForm, null), document.querySelector('#mainContent'));
};

//Renders the nav bar for the new entry page
var createNewEntryFormNav = function createNewEntryFormNav() {
  ReactDOM.render(React.createElement(HomeNav, null), document.querySelector('nav'));
};

//Renders the weapon select in the new entry form
var createWeaponSelect = function createWeaponSelect(weapons) {
  ReactDOM.render(React.createElement(OpWeaponOptions, { weapons: weapons }), document.querySelector('#opGun'));
};

//Renders the entire new entry page
var createNewEntry = function createNewEntry(e) {
  if (e) {
    e.preventDefault();
  }
  createNewEntryFormNav();
  createNewEntryForm();
  createWeaponSelect([]);
};

//Renders the Weapon select and dynamically loads the weapon options based on the operator selected
var loadOpWeaponOptions = function loadOpWeaponOptions(e) {
  var opWeapons = opGuns[e.target.value];
  createWeaponSelect(opWeapons);
};
'use strict';

//Renders the nav bar on the home page
var handleHomeNav = function handleHomeNav(e) {
  e.preventDefault();
  createTracker();
};

//shows the operatorContent div if it is hidden
var showOpContent = function showOpContent() {
  var opContent = document.querySelector('#operatorContent');
  if (opContent.style.display === 'none' || opContent.style.display === '') {
    opContent.style.display = 'block';
  }
};

//Retrieves the skins for an operator from the database
var getOpWeapons = function getOpWeapons(e) {
  var opName = e.target.getAttribute('value');
  var imgSrc = '/assets/images/OperatorStances/' + opName + '.png';
  sendAjax('GET', '/opWeapons?opName=' + opName, null, function (data) {
    ReactDOM.render(React.createElement(OperatorSummaryComponent, { weapons: data.weapons, imgSrc: imgSrc, opName: opName }), document.querySelector('#operatorContent'));

    showOpContent();
  });
};

//Hides the Op Summary window and resets the skin list
var hideSummary = function hideSummary(e) {
  resetOpSummaryView();
  document.querySelector('#operatorContent').style.display = 'none';
  document.querySelector('#summaryLeft select').value = '';
  ReactDOM.render(React.createElement(OperatorSummaryRightSideComponent, null), document.querySelector('#summaryRight'));
};

//Renders the weapon skin list in the op summary window
var loadWeaponSkinList = function loadWeaponSkinList(e, weapons) {
  var weapon = e.target.value;
  var skins = [];

  if (weapon === '') {
    weapon = 'Select a Gun';
  }

  Object.keys(weapons).forEach(function (gun) {
    if (weapons[gun].weaponName === weapon) {
      skins = weapons[gun].skins;
      return;
    }
  });

  ReactDOM.render(React.createElement(WeaponSkinListComponent, { weapon: weapon, skins: skins }), document.querySelector('#summaryRight'), resizeOpSummary);
};

//React Component for rendering the nav bar on the Home page
var NewEntryNav = function NewEntryNav(props) {
  return React.createElement(
    'a',
    { href: '#', onClick: createNewEntry },
    'New',
    React.createElement(
      'span',
      { className: 'siegeLogo' },
      'Entry'
    )
  );
};

//React Component for rendering the Attackers on the Home page
var OperatorsAttackersComponent = function OperatorsAttackersComponent(props) {
  return React.createElement(
    'div',
    { className: 'operators', id: 'attackers' },
    React.createElement(
      'h2',
      null,
      'Attackers'
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/ash.png', value: 'Ash', title: 'Ash', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/blackbeard.png', value: 'Blackbeard', title: 'Blackbeard', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/blitz.png', value: 'Blitz', title: 'Blitz', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/buck.png', value: 'Buck', title: 'Buck', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/capitao.png', value: 'Capitao', title: 'Capitao', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Dokkaebi.png', value: 'Dokkaebi', title: 'Dokkaebi', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Finka.png', value: 'Finka', title: 'Finka', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Fuze.png', value: 'Fuze', title: 'Fuze', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/glaz.png', value: 'Glaz', title: 'Glaz', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/hibana.png', value: 'Hibana', title: 'Hibana', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/IQ.png', value: 'IQ', title: 'IQ', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Jackal.png', value: 'Jackal', title: 'Jackal', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Lion.png', value: 'Lion', title: 'Lion', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Montagne.png', value: 'Montagne', title: 'Montagne', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Sledge.png', value: 'Sledge', title: 'Sledge', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Thatcher.png', value: 'Thatcher', title: 'Thatcher', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/thermite.png', value: 'Thermite', title: 'Thermite', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Twitch.png', value: 'Twitch', title: 'Twitch', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Zofia.png', value: 'Zofia', title: 'Zofia', onClick: getOpWeapons })
    )
  );
};

//React Component for rendering the Defenders on the Home page
var OperatorsDefendersComponent = function OperatorsDefendersComponent(props) {
  return React.createElement(
    'div',
    { className: 'operators', id: 'defenders' },
    React.createElement(
      'h2',
      null,
      'Defenders'
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/bandit.png', value: 'Bandit', title: 'Bandit', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Castle.png', value: 'Castle', title: 'Castle', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Caveira.png', value: 'Caveira', title: 'Caveira', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/doc.png', value: 'Doc', title: 'Doc', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/echo.png', value: 'Echo', title: 'Echo', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/frost.png', value: 'Frost', title: 'Frost', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/jager.png', value: 'Jager', title: 'Jager', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Kapkan.png', value: 'Kapkan', title: 'Kapkan', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Lesion.png', value: 'Lesion', title: 'Lesion', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Mute.png', value: 'Mute', title: 'Mute', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Pulse.png', value: 'Pulse', title: 'Pulse', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/rook.png', value: 'Rook', title: 'Rook', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Smoke.png', value: 'Smoke', title: 'Smoke', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Tachanka.png', value: 'Tachanka', title: 'Tachanka', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Valkyrie.png', value: 'Valkyrie', title: 'Valkyrie', onClick: getOpWeapons })
    )
  );
};

//React Component for rendering individual items in the Summary skin list
var WeaponSkinListItemComponent = function WeaponSkinListItemComponent(props) {
  return React.createElement(
    'li',
    null,
    props.skin
  );
};

//React Component for rendering Gun List
var WeaponSkinListComponent = function WeaponSkinListComponent(props) {
  var items = [];

  props.skins.forEach(function (skin) {
    items.push(React.createElement(WeaponSkinListItemComponent, { skin: skin }));
  });

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      { className: 'skinListHeader' },
      props.weapon,
      ' Skins'
    ),
    React.createElement(
      'ul',
      { className: 'skinList' },
      items
    )
  );
};

//React component for rendering the default right side of the op summery
var OperatorSummaryRightSideComponent = function OperatorSummaryRightSideComponent(props) {
  return React.createElement(
    'h1',
    { className: 'skinListHeader' },
    'Select a Gun'
  );
};

//React Component for rendering the Operator's summary
var OperatorSummaryComponent = function OperatorSummaryComponent(props) {
  var weaponNames = opGuns[props.opName];

  return React.createElement(
    'div',
    { id: 'opSummary' },
    React.createElement(
      'div',
      { id: 'exitSummary', onClick: hideSummary },
      'x'
    ),
    React.createElement(
      'div',
      { id: 'summaryLeft', className: 'summary' },
      React.createElement(
        'h1',
        null,
        props.opName
      ),
      React.createElement('img', { src: props.imgSrc }),
      React.createElement(OpWeaponOptions, { weapons: weaponNames, skins: props.weapons, summary: true })
    ),
    React.createElement(
      'div',
      { id: 'summaryRight', className: 'summary' },
      React.createElement(OperatorSummaryRightSideComponent, null)
    )
  );
};

//React Component for rendering both the Attackers and Defenders together on the Home page
var OperatorsList = function OperatorsList(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(OperatorsAttackersComponent, null),
    React.createElement(OperatorsDefendersComponent, null)
  );
};

//Renders the operator list on the Home page
var createOperatorsList = function createOperatorsList() {
  ReactDOM.render(React.createElement(OperatorsList, null), document.querySelector('#mainContent'));
};

//Renders the nav bar on the Home page
var createTrackerNav = function createTrackerNav() {
  ReactDOM.render(React.createElement(NewEntryNav, null), document.querySelector('nav'));
};

//Renders the entire Home page
var createTracker = function createTracker(e) {
  if (e) {
    e.preventDefault();
  }
  createTrackerNav();
  createOperatorsList();
};

//Renders the entire home page by default
var setup = function setup() {
  createTracker();
  handleChangePasswordClick();
  //handleUpgradeAccountClick();
};

//Method that resizes the height of the op summary based on skin list height
var resizeOpSummary = function resizeOpSummary() {
  var baseHeight = document.querySelector('#summaryLeft').clientHeight;
  var listHeight = document.querySelector('.skinList').clientHeight - 100;

  if (listHeight > baseHeight) {
    document.querySelector('#opSummary').style.height = baseHeight + listHeight + 'px';
  } else {
    document.querySelector('#opSummary').style.height = baseHeight + 'px';
  }
};

//Method that resets the height of the op summary view
var resetOpSummaryView = function resetOpSummaryView() {
  var baseHeight = document.querySelector('#summaryLeft').clientHeight;
  document.querySelector('#opSummary').style.height = baseHeight + 'px';
};

setup();
"use strict";

//React component for rendering the content of the Upgrade Account Page
var UpgradeAccountInfoComponent = function UpgradeAccountInfoComponent(props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"h2",
			{ className: "pageHeader" },
			"Upgrade ",
			React.createElement(
				"span",
				{ className: "siegeLogo" },
				"Account"
			)
		),
		React.createElement(
			"h2",
			{ className: "alteredFont", id: "upgradeHeader" },
			"With an upgraded account, you can also keep track of:"
		),
		React.createElement(
			"ul",
			{ className: "alteredFont", id: "upgradeList" },
			React.createElement(
				"li",
				null,
				"Charms"
			),
			React.createElement(
				"li",
				null,
				"Headgear"
			),
			React.createElement(
				"li",
				null,
				"Uniforms"
			)
		),
		React.createElement(
			"p",
			{ className: "alteredFont", id: "upgradeInfo" },
			"For a yearly fee of $5.00 (USD), you can extend the power of this app and keep track of all categories of cosmetic items found in Rainbow Six Siege!"
		)
	);
};

//Renders the upgraded account info
var createUpgradeAccountInfo = function createUpgradeAccountInfo() {
	ReactDOM.render(React.createElement(UpgradeAccountInfoComponent, null), document.querySelector('#mainContent'));
};

//Renders the entire upgraded account info view
var createUpgradeAccountInfoView = function createUpgradeAccountInfoView() {
	createUpgradeAccountInfo();
	createNewEntryFormNav();
};

//Sets up click event to render upgraded account info view
var handleUpgradeAccountClick = function handleUpgradeAccountClick() {
	var upgradeIcon = document.querySelector('#upgradeAccount');

	upgradeIcon.addEventListener('click', function (e) {
		e.preventDefault();
		createUpgradeAccountInfoView();
	});
};

handleUpgradeAccountClick();
'use strict';

//TODO:: Implement real versions of handleError and redirect
//handles what to do in case an AJAX request sends back an error
var handleError = function handleError(message) {
  alert(message);
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
