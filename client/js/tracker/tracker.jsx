//Renders the nav bar on the home page
const handleHomeNav = e => {
  e.preventDefault();
  createTracker();
};

//shows the operatorContent div if it is hidden
const showOpContent = () => {
	const opContent = document.querySelector('#operatorContent');
	if (opContent.style.display === 'none' || opContent.style.display === '') {
		opContent.style.display = 'block';
	}
};

//Retrieves the skins for an operator from the database
const getOpWeapons = e => {
	const imgSrc = e.target.src;
	const opName = e.target.getAttribute('value');
  sendAjax('GET', `/opWeapons?opName=${opName}`, null, data => {
		ReactDOM.render(
			<OperatorSummaryComponent weapons={data.weapons} imgSrc={imgSrc} opName={opName} />,
			document.querySelector('#operatorContent')
		);

		showOpContent();
  });
};

//Hides the Op Summary window and resets the skin list
const hideSummary = e => {
  resetOpSummaryView();
  document.querySelector('#operatorContent').style.display = 'none';
  document.querySelector('#summaryLeft select').value = '';
  ReactDOM.render(
    <OperatorSummaryRightSideComponent />,
    document.querySelector('#summaryRight')
  );
};

//Renders the weapon skin list in the op summary window
const loadWeaponSkinList = (e, weapons) => {
  let weapon = e.target.value;
  let skins = [];

  if (weapon === '') {
    weapon = 'Select a Gun';
  }

  Object.keys(weapons).forEach(gun => {
    if (weapons[gun].weaponName === weapon) {
      skins = weapons[gun].skins;
      return;
    }
  });

  ReactDOM.render(
    <WeaponSkinListComponent weapon={weapon} skins={skins} />,
    document.querySelector('#summaryRight'),
    resizeOpSummary
  );
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

//React Component for rendering individual items in the Summary skin list
const WeaponSkinListItemComponent = props => {
  return (
    <li>{props.skin}</li>
  );
};

//React Component for rendering Gun List
const WeaponSkinListComponent = props => {
  let items = [];

  props.skins.forEach(skin => {
    items.push(<WeaponSkinListItemComponent skin={skin} />);
  });

  return (
    <div>
      <h1 className="skinListHeader">{props.weapon} Skins</h1>
      <ul className="skinList">
        {items}
      </ul>
    </div>
  );
};

//React component for rendering the default right side of the op summery
const OperatorSummaryRightSideComponent = props => {
  return (
    <h1 className="skinListHeader">Select a Gun</h1>
  );
};

//React Component for rendering the Operator's summary
const OperatorSummaryComponent = props => {
	let weaponNames = opGuns[props.opName];

	return (
		<div id="opSummary">
      <div id="exitSummary" onClick={hideSummary}>
        x
      </div>
			<div id="summaryLeft" className="summary">
				<h1>{props.opName}</h1>
				<img className="opIcon" src={props.imgSrc} />
				<OpWeaponOptions weapons={weaponNames} skins={props.weapons} summary={true}/>
			</div>
      <div id="summaryRight" className="summary">
        <OperatorSummaryRightSideComponent />
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

//Method that resizes the height of the op summary based on skin list height
const resizeOpSummary = () => {
  const baseHeight = document.querySelector('#summaryLeft').clientHeight;
  let listHeight = document.querySelector('.skinList').clientHeight - 100;

  if (listHeight > baseHeight) {
    document.querySelector('#opSummary').style.height = `${baseHeight + listHeight}px`;
  } else {
    document.querySelector('#opSummary').style.height = `${baseHeight}px`;
  }
};

//Method that resets the height of the op summary view
const resetOpSummaryView = () => {
  const baseHeight = document.querySelector('#summaryLeft').clientHeight;
  document.querySelector('#opSummary').style.height = `${baseHeight}px`;
};

setup();
