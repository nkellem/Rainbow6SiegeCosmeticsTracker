//Renders the nav bar on the home page
const handleHomeNav = e => {
  e.preventDefault();
  createTracker();
};

//Retrieves the skins for an operator from the database
const getOpWeapons = e => {
  sendAjax('GET', `/opWeapons?opName=${e.target.getAttribute('value')}`, null, data => {
    console.log(data);
  });
};

//React Component for rendering the nav bar on the Home page
const NewEntryNav = props => {
  return (
    <a href="#" onClick={createNewEntry}>New<span className="siegeLogo">Entry</span></a>
  );
};

//React Component for rendering the Attackers on the Home page
const OperatorsAttackersComponent = props => {
  return (
    <div className="operators" id="attackers">
      <h2>Attackers</h2>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/ash.png" value="Ash" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/blackbeard.png" value="Blackbeard" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/blitz.png" value="Blitz" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/buck.png" value="Buck" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/capitao.png" value="Capitao" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Fuze.png" value="Fuze" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/glaz.png" value="Glaz" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/hibana.png" value="Hibana" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/IQ.png" value="IQ" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Montagne.png" value="Montagne" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Sledge.png" value="Sledge" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Thatcher.png" value="Thatcher" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/thermite.png" value="Thermite" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Twitch.png" value="Twitch" onClick={getOpWeapons} />
      </div>
    </div>
  );
};

//React Component for rendering the Defenders on the Home page
const OperatorsDefendersComponent = props => {
  return (
    <div className="operators" id="defenders">
      <h2>Defenders</h2>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/bandit.png" value="Bandit" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Castle.png" value="Castle" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Caveira.png" value="Caveira" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/doc.png" value="Doc" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/echo.png" value="Echo" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/frost.png" value="Frost" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/jager.png" value="Jager" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Kapkan.png" value="Kapkan" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/Mute.png" value="Mute" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Pulse.png" value="Pulse" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/rook.png" value="Rook" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Smoke.png" value="Smoke" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/Tachanka.png" value="Tachanka" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Valkyrie.png" value="Valkyrie" onClick={getOpWeapons} />
      </div>
    </div>
  );
};

//React Component for rendering both the Attackers and Defenders together on the Home page
const OperatorsList = props => {
  return (
    <div>
      <OperatorsAttackersComponent />
      <OperatorsDefendersComponent />
    </div>
  );
};

//Renders the operator list on the Home page
const createOperatorsList = () => {
  ReactDOM.render(
    <OperatorsList />,
    document.querySelector('#mainContent')
  );
};

//Renders the nav bar on the Home page
const createTrackerNav = () => {
  ReactDOM.render(
    <NewEntryNav />,
    document.querySelector('nav')
  );
};

//Renders the entire Home page
const createTracker = e => {
  if (e) {
    e.preventDefault();
  }
  createTrackerNav();
  createOperatorsList();
};

//Renders the entire home page by default
const setup = () => {
  createTracker();
};

setup();
