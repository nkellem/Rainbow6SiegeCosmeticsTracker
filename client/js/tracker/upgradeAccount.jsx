//method for sending out the request to upgrade the account in the DB
const handleUpgradeAccount = e => {
	e.preventDefault();
	
	sendAjax('POST', '/upgradeAccount', null, data => {
		alert(data.message);
	});
};

//React component for rendering the content of the Upgrade Account Page
const UpgradeAccountInfoComponent = props => {
	return (
		<div>
			<h2 className="pageHeader">Upgrade <span className="siegeLogo">Account</span></h2>
			<h2 className="alteredFont" id="upgradeHeader">With an upgraded account, you can also keep track of:</h2>
			<ul className="alteredFont" id="upgradeList">
				<li>Charms</li>
				<li>Headgear</li>
				<li>Uniforms</li>
			</ul>
			<p className="alteredFont" id="upgradeInfo">For a yearly fee of $5.00 (USD), you can extend the power of this app and keep track of all 
				 categories of cosmetic items found in Rainbow Six Siege!
			</p>
			<a href="#" onClick={handleUpgradeAccount}>Click here to upgrade your account!</a>
		</div>
	);
};

//React component for rendering the content of the nav bar on the Upgrade Account Page
const UpgradeAccountNavComponent = props => {
	return (
		<a href="#" onClick={createTracker}>Home</a>
	);
};

//Renders the upgraded account info
const createUpgradeAccountInfo = () => {
	ReactDOM.render(
		<UpgradeAccountInfoComponent />,
		document.querySelector('#mainContent')
	);
};

//Renders the nav for the upgraded account page
const createUpgradeAccountNav = () => {
	ReactDOM.render(
		<UpgradeAccountNavComponent />,
		document.querySelector('nav')
	);
};

//Renders the entire upgraded account info view
const createUpgradeAccountInfoView = () => {
	createUpgradeAccountInfo();
	createUpgradeAccountNav();
};

//Sets up click event to render upgraded account info view
const handleUpgradeAccountClick = () => {
	const upgradeIcon = document.querySelector('#upgradeAccount');
	
	upgradeIcon.addEventListener('click', e => {
		e.preventDefault();
		createUpgradeAccountInfoView();
	});
};

handleUpgradeAccountClick();