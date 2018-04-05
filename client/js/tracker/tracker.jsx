const handleHomeNav = e => {
  e.preventDefault();
  createTracker();
};

const NewEntryNav = props => {
  return (
    <a href="#" onClick={createNewEntry}>New<span className="siegeLogo">Entry</span></a>
  );
};

const OperatorsAttackersComponent = props => {
  return (
    <div className="operators" id="attackers">
      <h2>Attackers</h2>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/ash.png" value="Ash" />
        <img className="opIcon" src="/assets/images/Attackers/blackbeard.png" value="Blackbeard" />
        <img className="opIcon" src="/assets/images/Attackers/blitz.png" value="Blitz" />
        <img className="opIcon" src="/assets/images/Attackers/buck.png" value="Buck" />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/capitao.png" value="Capitao" />
        <img className="opIcon" src="/assets/images/Attackers/Fuze.png" value="Fuze" />
        <img className="opIcon" src="/assets/images/Attackers/glaz.png" value="Glaz" />
        <img className="opIcon" src="/assets/images/Attackers/hibana.png" value="Hibana" />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/IQ.png" value="IQ" />
        <img className="opIcon" src="/assets/images/Attackers/Montagne.png" value="Montagne" />
        <img className="opIcon" src="/assets/images/Attackers/Sledge.png" value="Sledge" />
        <img className="opIcon" src="/assets/images/Attackers/Thatcher.png" value="Thatcher" />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/thermite.png" value="Thermite" />
        <img className="opIcon" src="/assets/images/Attackers/Twitch.png" value="Twitch" />
      </div>
    </div>
  );
};

const OperatorsDefendersComponent = props => {
  return (
    <div className="operators" id="defenders">
      <h2>Defenders</h2>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/bandit.png" value="Bandit" />
        <img className="opIcon" src="/assets/images/Defenders/Castle.png" value="Castle" />
        <img className="opIcon" src="/assets/images/Defenders/Caveira.png" value="Caveira" />
        <img className="opIcon" src="/assets/images/Defenders/doc.png" value="Doc" />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/echo.png" value="Echo" />
        <img className="opIcon" src="/assets/images/Defenders/frost.png" value="Frost" />
        <img className="opIcon" src="/assets/images/Defenders/jager.png" value="Jager" />
        <img className="opIcon" src="/assets/images/Defenders/Kapkan.png" value="Kapkan" />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/Mute.png" value="Mute" />
        <img className="opIcon" src="/assets/images/Defenders/Pulse.png" value="Pulse" />
        <img className="opIcon" src="/assets/images/Defenders/rook.png" value="Rook" />
        <img className="opIcon" src="/assets/images/Defenders/Smoke.png" value="Smoke" />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/Tachanka.png" value="Tachanka" />
        <img className="opIcon" src="/assets/images/Defenders/Valkyrie.png" value="Valkyrie" />
      </div>
    </div>
  );
};

const OperatorsList = props => {
  return (
    <div>
      <OperatorsAttackersComponent />
      <OperatorsDefendersComponent />
    </div>
  );
};

const createOperatorsList = () => {
  ReactDOM.render(
    <OperatorsList />,
    document.querySelector('#mainContent')
  );
};

const createTrackerNav = () => {
  ReactDOM.render(
    <NewEntryNav />,
    document.querySelector('nav')
  );
};

const createTracker = e => {
  if (e) {
    e.preventDefault();
  }
  createTrackerNav();
  createOperatorsList();
};

const setup = () => {
  createTracker();
};

setup();
