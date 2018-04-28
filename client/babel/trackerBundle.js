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
		handleError('All Fields Are Required');
		return false;
	}

	if (newPass !== newPass2) {
		handleError('Passwords Do Not Match');
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
		),
		React.createElement('div', { id: 'toast' })
	);
};

//Renders the change password form
var createChangePasswordForm = function createChangePasswordForm() {
	ReactDOM.render(React.createElement(ChangePasswordComponent, null), document.querySelector('#mainContent'));
};

//Renders the entire change password view
var createChangePasswordView = function createChangePasswordView() {
	createChangePasswordForm();
	createUpgradeAccountNav();
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

//Sends op cosmetic data to the server to save skins
var handleEntrySubmit = function handleEntrySubmit(e) {
	e.preventDefault();
	var cosmetic = document.querySelector('#cosmeticEntry').value;
	var entryForm = document.querySelector('#newEntryForm');
	var charmEntry = true;
	var skinEntry = false;

	if (entryForm.name === 'newEntryForm') {
		skinEntry = true;

		var weaponName = document.querySelector('#opGun').value;

		if (weaponName === '') {
			handleError('All Fields Are Required');
			return false;
		}
	}

	if (entryForm.name !== 'newCharmEntryForm') {
		charmEntry = false;

		var opName = document.querySelector('#operatorSelect').value;

		if (opName === '') {
			handleError('All Fields Are Required');
			return false;
		}
	}

	if (cosmetic === '') {
		handleError('All Fields Are Required');
		return false;
	}

	sendAjax(entryForm.getAttribute('method'), entryForm.getAttribute('action'), serialize(entryForm), function () {
		createToastMessage("toastSuccess", "Cosmetic added!");

		document.querySelector('#cosmeticEntry').value = '';

		if (!charmEntry) {
			document.querySelector('#operatorSelect').value = '';
		}

		if (skinEntry) {
			createWeaponSelect([]);
		}
	});

	return false;
};

//React Component for the nav bar so the user can go back to the home page
var HomeNav = function HomeNav(props) {
	return React.createElement(
		'div',
		null,
		React.createElement(
			'a',
			{ href: '#', onClick: createTracker },
			'Home'
		),
		React.createElement(
			'div',
			{ id: 'subNav' },
			React.createElement(
				'a',
				{ className: 'active', href: '#', onClick: createNewEntryForm },
				'Skin'
			),
			React.createElement(
				'a',
				{ href: '#', onClick: createNewCharmEntryForm },
				'Charm'
			),
			React.createElement(
				'a',
				{ href: '#', onClick: createNewUniformEntryForm },
				'Uniform'
			),
			React.createElement(
				'a',
				{ href: '#', onClick: createNewHeadgearEntryForm },
				'Headgear'
			)
		)
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

//React Component that creates an operator option
var OpOption = function OpOption(props) {
	return React.createElement(
		'option',
		{ value: props.operator },
		props.operator
	);
};

//React Component that creates the  operator select dropdown
var OpOptions = function OpOptions(props) {
	var options = [];

	Object.keys(opGuns).forEach(function (operator) {
		options.push(React.createElement(OpOption, { operator: operator }));
	});

	if (props.onChangeMethod) {
		return React.createElement(
			'select',
			{ name: 'opName', id: 'operatorSelect', onChange: props.onChangeMethod },
			React.createElement(
				'option',
				{ value: '' },
				'Select An Op'
			),
			options
		);
	} else {
		return React.createElement(
			'select',
			{ name: 'opName', id: 'operatorSelect' },
			React.createElement(
				'option',
				{ value: '' },
				'Select An Op'
			),
			options
		);
	}
};

//React Component for rendering the New Skin Entry form
var NewEntryForm = function NewEntryForm(props) {
	return React.createElement(
		'div',
		{ id: 'formDiv' },
		React.createElement(
			'form',
			{ action: '/addNewEntry', method: 'POST', name: 'newEntryForm', onSubmit: handleEntrySubmit, id: 'newEntryForm' },
			React.createElement(OpOptions, { onChangeMethod: loadOpWeaponOptions }),
			React.createElement('span', { id: 'opGun' }),
			React.createElement('input', { id: 'cosmeticEntry', type: 'text', name: 'skin', placeholder: 'Enter a Skin' }),
			React.createElement('input', { id: 'submitEntry', type: 'submit', value: 'submit' })
		),
		React.createElement('div', { id: 'toast' })
	);
};

//React Component for rendering the New Charm Entry form
var NewCharmEntryForm = function NewCharmEntryForm(props) {
	return React.createElement(
		'div',
		{ id: 'formDiv' },
		React.createElement(
			'form',
			{ action: '/addNewCharmEntry', method: 'POST', name: 'newCharmEntryForm', onSubmit: handleEntrySubmit, id: 'newEntryForm' },
			React.createElement('input', { id: 'cosmeticEntry', type: 'text', name: 'charmName', placeholder: 'Enter a Charm' }),
			React.createElement('input', { id: 'submitEntry', type: 'submit', value: 'submit' })
		),
		React.createElement('div', { id: 'toast' })
	);
};

//React Component for rendering the New Uniform Entry form
var NewUniformEntryForm = function NewUniformEntryForm(props) {
	return React.createElement(
		'div',
		{ id: 'formDiv' },
		React.createElement(
			'form',
			{ action: '/addNewUniformEntry', method: 'POST', name: 'newUniformEntryForm', onSubmit: handleEntrySubmit, id: 'newEntryForm' },
			React.createElement(OpOptions, null),
			React.createElement('input', { id: 'cosmeticEntry', type: 'text', name: 'uniformName', placeholder: 'Enter a Uniform' }),
			React.createElement('input', { id: 'submitEntry', type: 'submit', value: 'submit' })
		),
		React.createElement('div', { id: 'toast' })
	);
};

//React Component for rendering the New Headgear Entry form
var NewHeadgearEntryForm = function NewHeadgearEntryForm(props) {
	return React.createElement(
		'div',
		{ id: 'formDiv' },
		React.createElement(
			'form',
			{ action: '/addNewHeadgearEntry', method: 'POST', name: 'newHeadgearEntryForm', onSubmit: handleEntrySubmit, id: 'newEntryForm' },
			React.createElement(OpOptions, null),
			React.createElement('input', { id: 'cosmeticEntry', type: 'text', name: 'headgearName', placeholder: 'Enter Headgear' }),
			React.createElement('input', { id: 'submitEntry', type: 'submit', value: 'submit' })
		),
		React.createElement('div', { id: 'toast' })
	);
};

//Renders the new entry form
var createNewEntryForm = function createNewEntryForm(e) {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}

	ReactDOM.render(React.createElement(NewEntryForm, null), document.querySelector('#mainContent'));

	createWeaponSelect([]);
};

//Renders the new charm entry form
var createNewCharmEntryForm = function createNewCharmEntryForm(e) {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}

	ReactDOM.render(React.createElement(NewCharmEntryForm, null), document.querySelector('#mainContent'));
};

//Renders the new uniform entry form
var createNewUniformEntryForm = function createNewUniformEntryForm(e) {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}

	ReactDOM.render(React.createElement(NewUniformEntryForm, null), document.querySelector('#mainContent'));
};

//Renders the new headgear entry form
var createNewHeadgearEntryForm = function createNewHeadgearEntryForm(e) {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}

	ReactDOM.render(React.createElement(NewHeadgearEntryForm, null), document.querySelector('#mainContent'));
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

//Retrieves the charms for a user from the database
var getCharms = function getCharms(e) {
  var newE = {
    target: e.target
  };
  e.preventDefault();

  sendAjax('GET', '/getCharms', null, function (data) {
    makeSectionActive(newE);

    var cosmetics = [];

    if (data.charms !== null) {
      cosmetics = data.charms.charmNames;
    }

    loadOtherCosmetics('Charms', cosmetics);
  });
};

//resets the skins summary option
var handleSkinsLinkClick = function handleSkinsLinkClick(e) {
  makeSectionActive(e);
  e.preventDefault();

  document.querySelector('#summaryLeft select').style.display = 'inline-block';

  ReactDOM.render(React.createElement(OperatorSummaryRightSideComponent, null), document.querySelector('#summaryRight'));
};

//Retrieves the uniforms for an operator from the database
var getOpUniforms = function getOpUniforms(e) {
  var newE = {
    target: e.target
  };
  e.preventDefault();

  var opName = document.querySelector('#summaryLeft h2').innerHTML;

  sendAjax('GET', 'getUniforms?opName=' + opName, null, function (data) {
    makeSectionActive(newE);

    var cosmetics = [];

    if (data.uniforms !== null) {
      cosmetics = data.uniforms.uniforms;
    }

    loadOtherCosmetics('Uniforms', cosmetics);
  });
};

//Retrieves the uniforms for an operator from the database
var getOpHeadgear = function getOpHeadgear(e) {
  var newE = {
    target: e.target
  };
  e.preventDefault();

  var opName = document.querySelector('#summaryLeft h2').innerHTML;

  sendAjax('GET', 'getHeadgear?opName=' + opName, null, function (data) {
    makeSectionActive(newE);

    var cosmetics = [];

    if (data.headgear !== null) {
      cosmetics = data.headgear.headgear;
    }

    loadOtherCosmetics('Headgear', cosmetics);
  });
};

//Hides the Op Summary window and resets the skin list
var hideSummary = function hideSummary(e) {
  document.querySelector('#operatorContent').style.display = 'none';
  document.querySelector('#summaryLeft select').value = '';
  document.querySelector('#skinsLink').click();
  ReactDOM.render(React.createElement(OperatorSummaryRightSideComponent, null), document.querySelector('#summaryRight'));
};

//Renders the weapon skin list in the op summary window
var loadWeaponSkinList = function loadWeaponSkinList(e, weapons) {
  var weapon = e.target.value;
  var skins = [];
  var header = weapon + ' Skins';

  if (weapon === '') {
    header = 'Select a Gun';
  }

  Object.keys(weapons).forEach(function (gun) {
    if (weapons[gun].weaponName === weapon) {
      skins = weapons[gun].skins;
      return;
    }
  });

  ReactDOM.render(React.createElement(CosmeticListComponent, { header: header, cosmetics: skins }), document.querySelector('#summaryRight'));
};

//Renders the cosmetics lists for all other cosmetics
var loadOtherCosmetics = function loadOtherCosmetics(type, cosmetics) {
  document.querySelector('#summaryLeft select').style.display = 'none';
  ReactDOM.render(React.createElement(CosmeticListComponent, { header: type, cosmetics: cosmetics }), document.querySelector('#summaryRight'));
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

//React Component for rendering the cosmetic nav in the summary lightbox
var CosmeticSummarySubNavComponent = function CosmeticSummarySubNavComponent(props) {
  return React.createElement(
    'div',
    { id: 'summarySubNav' },
    React.createElement(
      'a',
      { id: 'skinsLink', className: 'active', href: '#', onClick: handleSkinsLinkClick },
      'Skins'
    ),
    React.createElement(
      'a',
      { href: '#', onClick: getCharms },
      'Charms'
    ),
    React.createElement(
      'a',
      { href: '#', onClick: getOpUniforms },
      'Uniforms'
    ),
    React.createElement(
      'a',
      { href: '#', onClick: getOpHeadgear },
      'Headgear'
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
var CosmeticListItemComponent = function CosmeticListItemComponent(props) {
  return React.createElement(
    'li',
    null,
    props.cosmetic
  );
};

//React Component for rendering Gun List
var CosmeticListComponent = function CosmeticListComponent(props) {
  var items = [];

  props.cosmetics.forEach(function (cosmetic) {
    items.push(React.createElement(CosmeticListItemComponent, { cosmetic: cosmetic }));
  });

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      { className: 'skinListHeader' },
      props.header
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
    'h2',
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
    React.createElement(CosmeticSummarySubNavComponent, null),
    React.createElement(
      'div',
      { id: 'summaryLeft', className: 'summary' },
      React.createElement(
        'h2',
        null,
        props.opName
      ),
      React.createElement(OpWeaponOptions, { weapons: weaponNames, skins: props.weapons, summary: true }),
      React.createElement('img', { src: props.imgSrc })
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
};

setup();
'use strict';

//method for sending out the request to upgrade the account in the DB
var handleUpgradeAccount = function handleUpgradeAccount(e) {
	e.preventDefault();

	sendAjax('POST', '/upgradeAccount', null, function (data) {
		createToastMessage("toastSuccess", data.message);
	});
};

//React component for rendering the content of the Upgrade Account Page
var UpgradeAccountInfoComponent = function UpgradeAccountInfoComponent(props) {
	return React.createElement(
		'div',
		null,
		React.createElement('div', { id: 'toast' }),
		React.createElement(
			'h2',
			{ className: 'pageHeader' },
			'Upgrade ',
			React.createElement(
				'span',
				{ className: 'siegeLogo' },
				'Account'
			)
		),
		React.createElement(
			'h2',
			{ className: 'alteredFont', id: 'upgradeHeader' },
			'With an upgraded account, you can also keep track of:'
		),
		React.createElement(
			'ul',
			{ className: 'alteredFont', id: 'upgradeList' },
			React.createElement(
				'li',
				null,
				'Charms'
			),
			React.createElement(
				'li',
				null,
				'Headgear'
			),
			React.createElement(
				'li',
				null,
				'Uniforms'
			)
		),
		React.createElement(
			'p',
			{ className: 'alteredFont', id: 'upgradeInfo' },
			'For a yearly fee of $5.00 (USD), you can extend the power of this app and keep track of all categories of cosmetic items found in Rainbow Six Siege!'
		),
		React.createElement(
			'a',
			{ href: '#', onClick: handleUpgradeAccount },
			'Click here to upgrade your account!'
		)
	);
};

//React component for rendering the content of the nav bar on the Upgrade Account Page
var UpgradeAccountNavComponent = function UpgradeAccountNavComponent(props) {
	return React.createElement(
		'a',
		{ href: '#', onClick: createTracker },
		'Home'
	);
};

//Renders the upgraded account info
var createUpgradeAccountInfo = function createUpgradeAccountInfo() {
	ReactDOM.render(React.createElement(UpgradeAccountInfoComponent, null), document.querySelector('#mainContent'));
};

//Renders the nav for the upgraded account page
var createUpgradeAccountNav = function createUpgradeAccountNav() {
	ReactDOM.render(React.createElement(UpgradeAccountNavComponent, null), document.querySelector('nav'));
};

//Renders the entire upgraded account info view
var createUpgradeAccountInfoView = function createUpgradeAccountInfoView() {
	createUpgradeAccountInfo();
	createUpgradeAccountNav();
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
