//handles what to do in case an AJAX request sends back an error
const handleError = message => {
  createToastMessage("toastError", message);
};

//redirects the user to a specified page
const redirect = response => {
  window.location = response.redirect;
};

//helper method for sending out AJAX requests
const sendAjax = (type, action, data, success) => {
  fetch(action, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
    credentials: 'include',
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
  });
};

//helper method for transferring which link is active on the cosmetic selectn nav
const makeSectionActive = e => {
	document.querySelector('a[class="active"]').className = '';
	e.target.className = 'active';
};

//React Component for rendering sucess and error messages from the server
const ToastComponent = props => {
	return (
		<h2 className={props.className}>
			{props.message}
		</h2>
	);
};

//Renders the toast message based on success or failure of an AJAX request
const createToastMessage = (className, message) => {
	ReactDOM.render(
		<ToastComponent className={className} message={message} />,
		document.querySelector('#toast')
	);
};