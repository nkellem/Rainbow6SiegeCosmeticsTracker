(function() {

  let monthData = {};
  //functions to make REST requests to API
  const makeGetRequest = (url, element) => {
    //make the get request from the specified url
    let returnedJSON = {};
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      addDataToPage(data.data, element)
      return data.data;
    });
  };

  const addDataToPage = (data, element) => {
    const dataContainer = document.createElement('DIV');
    element.style.height = '100%';
    //console.dir(data);
    dataContainer.innerHTML = JSON.stringify(data);
    element.appendChild(dataContainer);
  };

  const setupClickEvents = () => {
    //setup click events for months
    document.querySelectorAll('.month').forEach(div => {
      div.onclick = e => {
        makeGetRequest(`/getEntries?month=${e.target.innerText.toLowerCase()}`, e.target.parentNode);
        //console.dir(monthData);
        //addDataToPage(monthData, e.target.parentNode);
      };
    });
  };

  window.onload = setupClickEvents;

})();
