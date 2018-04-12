//TODO:: Implement real versions of handleError and redirect
//handles what to do in case an AJAX request sends back an error
const handleError = message => {
  alert(message);
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
