'use strict';

(function () {

  var monthData = {};
  //functions to make REST requests to API
  var makeGetRequest = function makeGetRequest(url, element) {
    //make the get request from the specified url
    var returnedJSON = {};
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      addDataToPage(data.data, element);
      return data.data;
    });
  };

  var addDataToPage = function addDataToPage(data, element) {
    var dataContainer = document.createElement('DIV');
    element.style.height = '100%';
    //console.dir(data);
    dataContainer.innerHTML = JSON.stringify(data);
    element.appendChild(dataContainer);
  };

  var setupClickEvents = function setupClickEvents() {
    //setup click events for months
    document.querySelectorAll('.month').forEach(function (div) {
      div.onclick = function (e) {
        makeGetRequest('/getEntries?month=' + e.target.innerText.toLowerCase(), e.target.parentNode);
        //console.dir(monthData);
        //addDataToPage(monthData, e.target.parentNode);
      };
    });
  };

  window.onload = setupClickEvents;
})();
