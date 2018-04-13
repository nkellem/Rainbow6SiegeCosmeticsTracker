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
		</div>
	);
};

//Renders the upgraded account info
const createUpgradeAccountInfo = () => {
	ReactDOM.render(
		<UpgradeAccountInfoComponent />,
		document.querySelector('#mainContent')
	);
};

//Renders the entire upgraded account info view
const createUpgradeAccountInfoView = () => {
	createUpgradeAccountInfo();
	createNewEntryFormNav();
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