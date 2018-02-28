'use strict';

(function () {
  //processes the data received from get requests and adds that data to the home screen
  var addDataToPage = function addDataToPage(data, operator) {
    var opName = document.querySelector('#operatorName');
    var weaponSkins = document.querySelector('#weaponSkins');
    var op = document.querySelector('#operatorContent');
    op.style.display = 'block';
    opName.innerHTML = operator;
    weaponSkins.innerHTML = '';
    //loops through our data and creates html containers for each
    Object.keys(data.skins).forEach(function (gun) {
      var gunSpan = document.createElement('div');
      var gunTitle = document.createElement('h2');
      var skinList = document.createElement('ul');
      var skinItems = '';

      gunSpan.className = 'gunSkin';
      gunTitle.innerHTML = gun;
      skinList.className = 'skinList';

      data.skins[gun].forEach(function (skin) {
        skinItems += '<li>' + skin + '</li>';
      });

      skinList.innerHTML = skinItems;
      gunSpan.appendChild(gunTitle);
      gunSpan.appendChild(skinList);
      weaponSkins.appendChild(gunSpan);
    });
  };

  //populates the gun options select on the new entry screen
  var loadGunOptions = function loadGunOptions(data) {
    var gunSelect = document.querySelector('#opGun');
    var htmlString = void 0;
    Object.keys(data.skins).forEach(function (gun) {
      htmlString += '<option value=' + gun + '>' + gun + '</option>';
    });
    gunSelect.innerHTML = htmlString;
  };

  //functions to make REST requests to API
  //makes a get request and retrieves data from the server
  var makeGetRequest = function makeGetRequest(url, operator, callback) {
    //make the get request from the specified url
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      callback(data.data, operator);
    });
  };

  //makes post request to add data to the server
  var makePostRequest = function makePostRequest(url, callback) {
    //get data from the form
    var operator = document.querySelector('#operatorSelect').value;
    var gun = document.querySelector('#opGun').value;
    var skin = document.querySelector('#gunSkin').value;
    var formData = 'operator=' + operator + '&gun=' + gun + '&skin=' + skin;
    //make post request from the specified url
    fetch(url, {
      body: formData,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(function (response) {
      if (response.status !== 204) {
        return response.json();
      }
      return;
    }).then(function (data) {
      callback();
    });
  };

  //resets the new entry screen and gives the user a confirmation that their data was added successfully
  var processPostResults = function processPostResults() {
    document.querySelector('#operatorSelect').value = '';
    document.querySelector('#opGun').innerHTML = '<option value="">Select A Gun</option>';
    document.querySelector('#gunSkin').value = '';
    alert('Data added successfully!');
  };

  //sets up all the necessary events for the app
  var setupClickEvents = function setupClickEvents() {
    //setup click events for operators
    if (document.querySelector('.opIcon')) {
      document.querySelectorAll('.opIcon').forEach(function (op) {
        op.onclick = function (e) {
          makeGetRequest('/getEntries?operator=' + e.target.getAttribute('value'), e.target.getAttribute('value'), addDataToPage);
        };
      });
    }

    if (document.querySelector('#operatorSelect')) {
      document.querySelector('#operatorSelect').onchange = function (e) {
        var op = document.querySelector('#operatorSelect').value;
        makeGetRequest('/getEntries?operator=' + op, op, loadGunOptions);
      };
    }

    if (document.querySelector('#submitEntry')) {
      document.querySelector('#submitEntry').onclick = function (e) {
        e.preventDefault();
        makePostRequest('/addNewEntry', processPostResults);
      };
    }
  };

  //sets up events on window load
  window.onload = setupClickEvents;
})();
