//TODO:: Implement real versions of handleError and redirect
const handleError = message => {
  alert(message);
};

const redirect = response => {
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  fetch(action, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
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
