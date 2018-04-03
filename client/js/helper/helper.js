//TODO:: Implement real versions of handleError and redirect
const handleError = message => {
  alert(message);
};

const redirect = response => {
  alert('Redirecting');
};

const sendAjax = (type, action, data, success) => {
  fetch(action, {
    body: data,
    method: type
  }).then(response => {
    if (response.status !== 204) {
      return response.json();
    }
    return;
  }).then(data => {
    success();
  });
};
