//Serializess the form data and sends it to the server
//Handles the request to change user password
const handleChangePassword = e => {
	e.preventDefault();
	
	const currPass = document.querySelector('#password').value;
	const newPass = document.querySelector('#newPassword').value;
	const newPass2 = document.querySelector('#newPassword2').value;
	const changePassForm = document.querySelector('#changePassForm');
	
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
const ChangePasswordComponent = props => {
	return (
		<div>
			<h2 className="pageHeader">Change <span className="siegeLogo">Password</span></h2>
			<form id="changePassForm" name="changePassForm" action="/changePassword" onSubmit={handleChangePassword} method="POST">
				<div className="rightAlign">
					<label htmlFor="password">Current Password: </label>
    	  	<input id="password" type="password" name="password" placeholder="password" />
				</div>
				<div className="rightAlign">
					<label htmlFor="newPassword">New Password: </label>
    	  	<input id="newPassword" type="password" name="newPassword" placeholder="new password" />
				</div>
				<div className="rightAlign">
					<label htmlFor="newPassword2">Confirm <span className="siegeLogo">Password: </span></label>
    	  	<input id="newPassword2" type="password" name="newPassword2" placeholder="confirm password" />
				</div>
				<div>
					<input className="submitForm" type="submit" value="Change Password" />
				</div>
    	</form>
			<div id="toast"></div>
		</div>
	);
};

//Renders the change password form
const createChangePasswordForm = () => {
	ReactDOM.render(
		<ChangePasswordComponent />,
		document.querySelector('#mainContent')
	);
};

//Renders the entire change password view
const createChangePasswordView = () => {
	createChangePasswordForm();
	createUpgradeAccountNav();
};

//Sets up event listener for change password
const handleChangePasswordClick = () => {
	const changePass = document.querySelector('#changePassword');
	
	changePass.addEventListener('click', e => {
		e.preventDefault();
		createChangePasswordView();
	});
};

