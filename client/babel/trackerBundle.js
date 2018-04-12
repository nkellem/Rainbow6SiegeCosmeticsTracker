'use strict';

var handleEntrySubmit = function handleEntrySubmit(e) {
  e.preventDefault();
  var opName = document.querySelector('#newEntryForm').value;
  var weaponName = document.querySelector('#opGun').value;
  var skin = document.querySelector('#gunSkin').value;
  var entryForm = document.querySelector('#newEntryForm');

  if (opName === '' || weaponName === '' || skin === '') {
    handleError('All fields are required');
    return false;
  }

  sendAjax(entryForm.getAttribute('method'), entryForm.getAttribute('action'), serialize(newEntryForm), function () {
    alert('Data sent');
  });

  return false;
};

var HomeNav = function HomeNav(props) {
  return React.createElement(
    'a',
    { href: '#', onClick: createTracker },
    'Home'
  );
};

var OpWeaponOption = function OpWeaponOption(props) {
  return React.createElement(
    'option',
    { value: props.weaponName },
    props.weaponName
  );
};

var OpWeaponOptions = function OpWeaponOptions(props) {
  var options = [];

  props.weapons.forEach(function (weapon) {
    options.push(React.createElement(OpWeaponOption, { weaponName: weapon }));
  });

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
};

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

var createNewEntryForm = function createNewEntryForm() {
  ReactDOM.render(React.createElement(NewEntryForm, null), document.querySelector('#mainContent'));
};

var createNewEntryFormNav = function createNewEntryFormNav() {
  ReactDOM.render(React.createElement(HomeNav, null), document.querySelector('nav'));
};

var createWeaponSelect = function createWeaponSelect(weapons) {
  ReactDOM.render(React.createElement(OpWeaponOptions, { weapons: weapons }), document.querySelector('#opGun'));
};

var createNewEntry = function createNewEntry(e) {
  if (e) {
    e.preventDefault();
  }
  createNewEntryFormNav();
  createNewEntryForm();
  createWeaponSelect([]);
};

var loadOpWeaponOptions = function loadOpWeaponOptions(e) {
  var opWeapons = opGuns[e.target.value];
  createWeaponSelect(opWeapons);
};
'use strict';

var handleHomeNav = function handleHomeNav(e) {
  e.preventDefault();
  createTracker();
};

var getOpWeapons = function getOpWeapons(e) {
  sendAjax('GET', '/opWeapons?opName=' + e.target.getAttribute('value'), null, function (data) {
    console.log(data);
  });
};

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
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/ash.png', value: 'Ash', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/blackbeard.png', value: 'Blackbeard', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/blitz.png', value: 'Blitz', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/buck.png', value: 'Buck', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/capitao.png', value: 'Capitao', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Fuze.png', value: 'Fuze', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/glaz.png', value: 'Glaz', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/hibana.png', value: 'Hibana', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/IQ.png', value: 'IQ', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Montagne.png', value: 'Montagne', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Sledge.png', value: 'Sledge', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Thatcher.png', value: 'Thatcher', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/thermite.png', value: 'Thermite', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Attackers/Twitch.png', value: 'Twitch', onClick: getOpWeapons })
    )
  );
};

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
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/bandit.png', value: 'Bandit', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Castle.png', value: 'Castle', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Caveira.png', value: 'Caveira', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/doc.png', value: 'Doc', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/echo.png', value: 'Echo', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/frost.png', value: 'Frost', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/jager.png', value: 'Jager', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Kapkan.png', value: 'Kapkan', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Mute.png', value: 'Mute', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Pulse.png', value: 'Pulse', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/rook.png', value: 'Rook', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Smoke.png', value: 'Smoke', onClick: getOpWeapons })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Tachanka.png', value: 'Tachanka', onClick: getOpWeapons }),
      React.createElement('img', { className: 'opIcon', src: '/assets/images/Defenders/Valkyrie.png', value: 'Valkyrie', onClick: getOpWeapons })
    )
  );
};

var OperatorsList = function OperatorsList(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(OperatorsAttackersComponent, null),
    React.createElement(OperatorsDefendersComponent, null)
  );
};

var createOperatorsList = function createOperatorsList() {
  ReactDOM.render(React.createElement(OperatorsList, null), document.querySelector('#mainContent'));
};

var createTrackerNav = function createTrackerNav() {
  ReactDOM.render(React.createElement(NewEntryNav, null), document.querySelector('nav'));
};

var createTracker = function createTracker(e) {
  if (e) {
    e.preventDefault();
  }
  createTrackerNav();
  createOperatorsList();
};

var setup = function setup() {
  createTracker();
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
'use strict';

var opGuns = {
  Ash: ['G36C', 'R4-C', 'M45 MEUSOC', '5.7 USG'],
  Blackbeard: ['MK17 CQB', 'SR-25', 'D-50'],
  Blitz: ['Flash Shield', 'P12'],
  Buck: ['C8 SFW', 'CAMRS', 'MK1 9mm'],
  Capitao: ['PARA 308', 'M249', 'PRB92'],
  Fuze: ['Ballistic Shield', '6P41', 'AK 12', 'PMM', 'GSH 18'],
  Glaz: ['OTs-03', 'GSH 18', 'PMM'],
  Hibana: ['Type 89', 'Supernova', 'P229', 'Bearing 9'],
  IQ: ['AUG A2', '552 Commando', 'G8A1', 'P12'],
  Montagne: ['Extendable Shield', 'P9', 'LFP586'],
  Sledge: ['M590A1', 'L85A2', 'P226 MK-25', 'SMG-11'],
  Thatcher: ['AR33', 'L85A2', 'M590A1', 'P226 MK-25'],
  Thermite: ['M1014', '556XI', 'M45 MEUSOC', '5.7 USG'],
  Twitch: ['F2', '417', 'SG CQB'],
  Bandit: ['MP7', 'M870', 'P12'],
  Castle: ['UMP45', 'M1014', '5.7 USG', 'M45 MEUSOC'],
  Caveira: ['M12', 'SPAS-15', 'Luison'],
  Doc: ['SG CQB', 'MP5', 'P90', 'P9', 'LFP586'],
  Echo: ['Supernova', 'MP5SD', 'P229', 'Bearing 9'],
  Frost: ['Super 90', '9mm C1', 'MK1 9mm'],
  Jager: ['M870', '416-C Carbine', 'P12'],
  Kapkan: ['9x19VSN', 'SASG-12', 'PMM', 'GSH 18'],
  Smoke: ['FMG-9', 'M590A1', 'P226 MK-25', 'SMG-11'],
  Pulse: ['M1014', 'UMP45', 'M45 MEUSOC', '5.7 USG'],
  Rook: ['P90', 'MP5', 'SG-CQB', 'LFP586', 'P9'],
  Mute: ['MP5K', 'M590A1', 'P226 MK-25'],
  Tachanka: ['SASG-12', '9x19VSN', 'GSH 18', 'PMM'],
  Valkyrie: ['MPX', 'SPAS-12', 'D-50']
};
