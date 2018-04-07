"use strict";

var handleEntrySubmit = function handleEntrySubmit(e) {};

var HomeNav = function HomeNav(props) {
  return React.createElement(
    "a",
    { href: "#", onClick: createTracker },
    "Home"
  );
};

var NewEntryForm = function NewEntryForm(props) {
  return React.createElement(
    "div",
    { id: "formDiv" },
    React.createElement(
      "form",
      { action: "/addNewEntry", method: "POST", name: "newEntryForm", onSubmit: handleEntrySubmit, id: "newEntryForm" },
      React.createElement(
        "select",
        { name: "operator", id: "operatorSelect" },
        React.createElement(
          "option",
          { value: "" },
          "Select An Op"
        ),
        React.createElement(
          "option",
          { value: "Ash" },
          "Ash"
        ),
        React.createElement(
          "option",
          { value: "Blackbeard" },
          "Blackbeard"
        ),
        React.createElement(
          "option",
          { value: "Blitz" },
          "Blitz"
        ),
        React.createElement(
          "option",
          { value: "Buck" },
          "Buck"
        ),
        React.createElement(
          "option",
          { value: "Capitao" },
          "Capitao"
        ),
        React.createElement(
          "option",
          { value: "Fuze" },
          "Fuze"
        ),
        React.createElement(
          "option",
          { value: "Glaz" },
          "Glaz"
        ),
        React.createElement(
          "option",
          { value: "Hibana" },
          "Hibana"
        ),
        React.createElement(
          "option",
          { value: "IQ" },
          "IQ"
        ),
        React.createElement(
          "option",
          { value: "Montagne" },
          "Montagne"
        ),
        React.createElement(
          "option",
          { value: "Sledge" },
          "Sledge"
        ),
        React.createElement(
          "option",
          { value: "Thatcher" },
          "Thatcher"
        ),
        React.createElement(
          "option",
          { value: "Thermite" },
          "Thermite"
        ),
        React.createElement(
          "option",
          { value: "Twitch" },
          "Twitch"
        ),
        React.createElement(
          "option",
          { value: "Bandit" },
          "Bandit"
        ),
        React.createElement(
          "option",
          { value: "Castle" },
          "Castle"
        ),
        React.createElement(
          "option",
          { value: "Caveira" },
          "Caveira"
        ),
        React.createElement(
          "option",
          { value: "Doc" },
          "Doc"
        ),
        React.createElement(
          "option",
          { value: "Echo" },
          "Echo"
        ),
        React.createElement(
          "option",
          { value: "Frost" },
          "Frost"
        ),
        React.createElement(
          "option",
          { value: "Jager" },
          "Jager"
        ),
        React.createElement(
          "option",
          { value: "Kapkan" },
          "Kapkan"
        ),
        React.createElement(
          "option",
          { value: "Mute" },
          "Mute"
        ),
        React.createElement(
          "option",
          { value: "Pulse" },
          "Pulse"
        ),
        React.createElement(
          "option",
          { value: "Rook" },
          "Rook"
        ),
        React.createElement(
          "option",
          { value: "Smoke" },
          "Smoke"
        ),
        React.createElement(
          "option",
          { value: "Tachanka" },
          "Tachanka"
        ),
        React.createElement(
          "option",
          { value: "Valkyrie" },
          "Valkyrie"
        )
      ),
      React.createElement(
        "select",
        { name: "gun", id: "opGun" },
        React.createElement(
          "option",
          { value: "" },
          "Select A Gun"
        )
      ),
      React.createElement("input", { id: "gunSkin", type: "text", name: "skin", placeholder: "Enter a Skin" }),
      React.createElement("input", { id: "submitEntry", type: "submit", value: "submit" })
    )
  );
};

var createNewEntryForm = function createNewEntryForm() {
  ReactDOM.render(React.createElement(NewEntryForm, null), document.querySelector('#mainContent'));
};

var createNewEntryFormNav = function createNewEntryFormNav() {
  ReactDOM.render(React.createElement(HomeNav, null), document.querySelector('nav'));
};

var createNewEntry = function createNewEntry(e) {
  if (e) {
    e.preventDefault();
  }
  createNewEntryFormNav();
  createNewEntryForm();
};
"use strict";

var handleHomeNav = function handleHomeNav(e) {
  e.preventDefault();
  createTracker();
};

var NewEntryNav = function NewEntryNav(props) {
  return React.createElement(
    "a",
    { href: "#", onClick: createNewEntry },
    "New",
    React.createElement(
      "span",
      { className: "siegeLogo" },
      "Entry"
    )
  );
};

var OperatorsAttackersComponent = function OperatorsAttackersComponent(props) {
  return React.createElement(
    "div",
    { className: "operators", id: "attackers" },
    React.createElement(
      "h2",
      null,
      "Attackers"
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/ash.png", value: "Ash" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/blackbeard.png", value: "Blackbeard" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/blitz.png", value: "Blitz" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/buck.png", value: "Buck" })
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/capitao.png", value: "Capitao" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/Fuze.png", value: "Fuze" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/glaz.png", value: "Glaz" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/hibana.png", value: "Hibana" })
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/IQ.png", value: "IQ" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/Montagne.png", value: "Montagne" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/Sledge.png", value: "Sledge" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/Thatcher.png", value: "Thatcher" })
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/thermite.png", value: "Thermite" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Attackers/Twitch.png", value: "Twitch" })
    )
  );
};

var OperatorsDefendersComponent = function OperatorsDefendersComponent(props) {
  return React.createElement(
    "div",
    { className: "operators", id: "defenders" },
    React.createElement(
      "h2",
      null,
      "Defenders"
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/bandit.png", value: "Bandit" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Castle.png", value: "Castle" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Caveira.png", value: "Caveira" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/doc.png", value: "Doc" })
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/echo.png", value: "Echo" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/frost.png", value: "Frost" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/jager.png", value: "Jager" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Kapkan.png", value: "Kapkan" })
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Mute.png", value: "Mute" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Pulse.png", value: "Pulse" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/rook.png", value: "Rook" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Smoke.png", value: "Smoke" })
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Tachanka.png", value: "Tachanka" }),
      React.createElement("img", { className: "opIcon", src: "/assets/images/Defenders/Valkyrie.png", value: "Valkyrie" })
    )
  );
};

var OperatorsList = function OperatorsList(props) {
  return React.createElement(
    "div",
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
"use strict";

//TODO:: Implement real versions of handleError and redirect
var handleError = function handleError(message) {
  alert(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  /*fetch(action, {
  headers: {
  	'Content-Type': 'application/x-www-form-urlencoded'
  },
    method: type,
  body: data
  }).then(response => {
    return response.json();
  }).then(data => {
    if (data.error) {
      handleError(data.error);
      return;
    }
    success(data);
  });*/
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
