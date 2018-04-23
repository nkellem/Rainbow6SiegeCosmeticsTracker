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
	const opName = e.target.getAttribute('value');
	const imgSrc = `/assets/images/OperatorStances/${opName}.png`;
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
        <img className="opIcon" src="/assets/images/Attackers/ash.png" value="Ash" title="Ash" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/blackbeard.png" value="Blackbeard" title="Blackbeard" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/blitz.png" value="Blitz" title="Blitz" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/buck.png" value="Buck" title="Buck" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Attackers/capitao.png" value="Capitao" title="Capitao" onClick={getOpWeapons} />
				<img className="opIcon" src="/assets/images/Attackers/Dokkaebi.png" value="Dokkaebi" title="Dokkaebi" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Finka.png" value="Finka" title="Finka" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Fuze.png" value="Fuze" title="Fuze" onClick={getOpWeapons} />
      </div>
      <div className="row">
				<img className="opIcon" src="/assets/images/Attackers/glaz.png" value="Glaz" title="Glaz" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/hibana.png" value="Hibana" title="Hibana" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/IQ.png" value="IQ" title="IQ" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Jackal.png" value="Jackal" title="Jackal" onClick={getOpWeapons} />
      </div>
      <div className="row">
				<img className="opIcon" src="/assets/images/Attackers/Lion.png" value="Lion" title="Lion" onClick={getOpWeapons} />
				<img className="opIcon" src="/assets/images/Attackers/Montagne.png" value="Montagne" title="Montagne" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Sledge.png" value="Sledge" title="Sledge" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Thatcher.png" value="Thatcher" title="Thatcher" onClick={getOpWeapons} />
      </div>
			<div className="row">
				<img className="opIcon" src="/assets/images/Attackers/thermite.png" value="Thermite" title="Thermite" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Attackers/Twitch.png" value="Twitch" title="Twitch" onClick={getOpWeapons} />
				<img className="opIcon" src="/assets/images/Attackers/Zofia.png" value="Zofia" title="Zofia" onClick={getOpWeapons} />
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
        <img className="opIcon" src="/assets/images/Defenders/bandit.png" value="Bandit" title="Bandit" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Castle.png" value="Castle" title="Castle" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Caveira.png" value="Caveira" title="Caveira" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/doc.png" value="Doc" title="Doc" onClick={getOpWeapons} />
      </div>
      <div className="row">
        <img className="opIcon" src="/assets/images/Defenders/echo.png" value="Echo" title="Echo" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/frost.png" value="Frost" title="Frost" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/jager.png" value="Jager" title="Jager" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Kapkan.png" value="Kapkan" title="Kapkan" onClick={getOpWeapons} />
      </div>
      <div className="row">
				<img className="opIcon" src="/assets/images/Defenders/Lesion.png" value="Lesion" title="Lesion" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Mute.png" value="Mute" title="Mute" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Pulse.png" value="Pulse" title="Pulse" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/rook.png" value="Rook" title="Rook" onClick={getOpWeapons} />
      </div>
      <div className="row">
				<img className="opIcon" src="/assets/images/Defenders/Smoke.png" value="Smoke" title="Smoke" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Tachanka.png" value="Tachanka" title="Tachanka" onClick={getOpWeapons} />
        <img className="opIcon" src="/assets/images/Defenders/Valkyrie.png" value="Valkyrie" title="Valkyrie" onClick={getOpWeapons} />
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
				<img src={props.imgSrc} />
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
	handleChangePasswordClick();
	//handleUpgradeAccountClick();
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
