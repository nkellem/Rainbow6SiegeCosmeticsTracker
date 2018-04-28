//Sends op cosmetic data to the server to save skins
const handleEntrySubmit = e => {
	e.preventDefault();
	const cosmetic = document.querySelector('#cosmeticEntry').value;
	const entryForm = document.querySelector('#newEntryForm');
	let charmEntry = true;
	let skinEntry = false;
	
	if (entryForm.name === 'newEntryForm') {
		skinEntry = true;
		
		const weaponName = document.querySelector('#opGun').value;
		
		if (weaponName === '') {
			handleError('All fields are required');
			return false;
		}
	}
	
	if (entryForm.name !== 'newCharmEntryForm') {
		charmEntry = false;
		
		const opName = document.querySelector('#operatorSelect').value;
		
		if (opName === '') {
			handleError('All fields are required');
			return false;
		}
	}

	if (cosmetic === '') {
		handleError('All fields are required');
		return false;
	}

	sendAjax(entryForm.getAttribute('method'), entryForm.getAttribute('action'), serialize(entryForm), () => {
		alert('Cosmetic added!');
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
const HomeNav = props => {
  return (
    <div>
			<a href="#" onClick={createTracker}>Home</a>
			<div id="subNav">
				<a className="active" href="#" onClick={createNewEntryForm}>Skin</a>
				<a href="#" onClick={createNewCharmEntryForm}>Charm</a>
				<a href="#" onClick={createNewUniformEntryForm}>Uniform</a>
				<a href="#" onClick={createNewHeadgearEntryForm}>Headgear</a>
			</div>
		</div>
  );
};

//React Component to create dynamic options for the weapons select
const OpWeaponOption = props => {
	return (
		<option value={props.weaponName}>{props.weaponName}</option>
	);
};

//React Component that creates the weapons select
const OpWeaponOptions = props => {
	let options = [];

	props.weapons.forEach(weapon => {
		options.push(<OpWeaponOption weaponName={weapon}/>);
	});

	if (props.summary) {
		return (
			<select name="weaponName" onChange={e => loadWeaponSkinList(e, props.skins)}>
	    	<option value="">Select A Gun</option>
				{options}
	    </select>
		);
	} else {
		return (
			<select name="weaponName">
	    	<option value="">Select A Gun</option>
				{options}
	    </select>
		);
	}
};

//React Component that creates an operator option
const OpOption = props => {
	return (
		<option value={props.operator}>{props.operator}</option>
	);
};

//React Component that creates the  operator select dropdown
const OpOptions = props => {
	let options = [];
	
	Object.keys(opGuns).forEach(operator => {
		options.push(<OpOption operator={operator} />);
	});
	
	if (props.onChangeMethod) {
		return (
			<select name="opName" id="operatorSelect" onChange={props.onChangeMethod}>
				<option value="">Select An Op</option>
				{options}
			</select>
		);
	} else {
		return (
			<select name="opName" id="operatorSelect">
				<option value="">Select An Op</option>
				{options}
			</select>
		);
	}
};

//React Component for rendering the New Skin Entry form
const NewEntryForm = props => {
  return (
    <div id="formDiv">
      <form action="/addNewEntry" method="POST" name="newEntryForm" onSubmit={handleEntrySubmit} id="newEntryForm">
        <OpOptions onChangeMethod={loadOpWeaponOptions} />
				<span id="opGun"></span>
        <input id="cosmeticEntry" type="text" name="skin" placeholder="Enter a Skin" />
        <input id="submitEntry" type="submit" value="submit" />
      </form>
    </div>
  );
};

//React Component for rendering the New Charm Entry form
const NewCharmEntryForm = props => {
	return (
		<div id="formDiv">
			<form action="/addNewCharmEntry" method="POST" name="newCharmEntryForm" onSubmit={handleEntrySubmit} id="newEntryForm">
				<input id="cosmeticEntry" type="text" name="charmName" placeholder="Enter a Charm" />
				<input id="submitEntry" type="submit" value="submit" />
			</form>
		</div>
	);
};

//React Component for rendering the New Uniform Entry form
const NewUniformEntryForm = props => {
	return (
		<div id="formDiv">
			<form action="/addNewUniformEntry" method="POST" name="newUniformEntryForm" onSubmit={handleEntrySubmit} id="newEntryForm">
				<OpOptions />
				<input id="cosmeticEntry" type="text" name="uniformName" placeholder="Enter a Uniform" />
				<input id="submitEntry" type="submit" value="submit" />
			</form>
		</div>
	);
};

//React Component for rendering the New Headgear Entry form
const NewHeadgearEntryForm = props => {
	return (
		<div id="formDiv">
			<form action="/addNewHeadgearEntry" method="POST" name="newHeadgearEntryForm" onSubmit={handleEntrySubmit} id="newEntryForm">
				<OpOptions />
				<input id="cosmeticEntry" type="text" name="headgearName" placeholder="Enter Headgear" />
				<input id="submitEntry" type="submit" value="submit" />
			</form>
		</div>
	);
};

//Renders the new entry form
const createNewEntryForm = e => {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}
	
  ReactDOM.render(
    <NewEntryForm />,
    document.querySelector('#mainContent')
  );
	
	createWeaponSelect([]);
};

//Renders the new charm entry form
const createNewCharmEntryForm = e => {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}
	
  ReactDOM.render(
    <NewCharmEntryForm />,
    document.querySelector('#mainContent')
  );
};

//Renders the new uniform entry form
const createNewUniformEntryForm = e => {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}
	
  ReactDOM.render(
    <NewUniformEntryForm />,
    document.querySelector('#mainContent')
  );
};

//Renders the new headgear entry form
const createNewHeadgearEntryForm = e => {
	if (e) {
		e.preventDefault();
		makeSectionActive(e);
	}
	
  ReactDOM.render(
    <NewHeadgearEntryForm />,
    document.querySelector('#mainContent')
  );
};

//Renders the nav bar for the new entry page
const createNewEntryFormNav = () => {
  ReactDOM.render(
    <HomeNav />,
    document.querySelector('nav')
  );
};

//Renders the weapon select in the new entry form
const createWeaponSelect = weapons => {
	ReactDOM.render(
		<OpWeaponOptions weapons={weapons}/>,
		document.querySelector('#opGun')
	);
};

//Renders the entire new entry page
const createNewEntry = e => {
  if (e) {
    e.preventDefault();
  }
  createNewEntryFormNav();
  createNewEntryForm();
};

//Renders the Weapon select and dynamically loads the weapon options based on the operator selected
const loadOpWeaponOptions = e => {
	let opWeapons = opGuns[e.target.value];
	createWeaponSelect(opWeapons);
};
