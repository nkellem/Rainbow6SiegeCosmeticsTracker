(function() {

  const addDataToPage = (data, operator) => {
    const opName = document.querySelector('#operatorName');
    const weaponSkins = document.querySelector('#weaponSkins');
    const op = document.querySelector('#operatorContent');
    op.style.display = 'block';
    opName.innerHTML = operator;
    weaponSkins.innerHTML = '';

    Object.keys(data.skins).forEach(gun => {
      let gunSpan = document.createElement('div');
      let gunTitle = document.createElement('h2');
      let skinList = document.createElement('ul');
      let skinItems = '';

      gunSpan.className = 'gunSkin';
      gunTitle.innerHTML = gun;
      skinList.className = 'skinList';

      data.skins[gun].forEach(skin => {
        skinItems += `<li>${skin}</li>`;
      });

      skinList.innerHTML = skinItems;
      gunSpan.appendChild(gunTitle);
      gunSpan.appendChild(skinList);
      weaponSkins.appendChild(gunSpan);
    });
  };

  const loadGunOptions = data => {
    const gunSelect = document.querySelector('#opGun');
    let htmlString;
    Object.keys(data.skins).forEach(gun => {
      htmlString += `<option value=${gun}>${gun}</option>`;
    });
    gunSelect.innerHTML = htmlString;
  };

  //functions to make REST requests to API
  const makeGetRequest = (url, operator, callback) => {
    //make the get request from the specified url
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      callback(data.data, operator);
    });
  };

  const makePostRequest = (url, callback) => {
    //get data from the form
    const operator = document.querySelector('#operatorSelect').value;
    const gun = document.querySelector('#opGun').value;
    const skin = document.querySelector('#gunSkin').value;
    const formData = `operator=${operator}&gun=${gun}&skin=${skin}`;
    //make post request from the specified url
    fetch(url, {
      body: formData,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      if (response.status !== 204) {
        return response.json();
      }
      return;
    }).then(data => {
      callback();
    });
  };

  const processPostResults = () => {
    document.querySelector('#operatorSelect').value = '';
    document.querySelector('#opGun').innerHTML = '<option value="">Select A Gun</option>';
    document.querySelector('#gunSkin').value = '';
    alert('Data added successfully!');
  };

  const setupClickEvents = () => {
    //setup click events for operators
    if (document.querySelector('.opIcon')) {
      document.querySelectorAll('.opIcon').forEach(op => {
        op.onclick = e => {
          makeGetRequest(`/getEntries?operator=${e.target.getAttribute('value')}`, e.target.getAttribute('value'), addDataToPage);
        };
      });
    }

    if (document.querySelector('#operatorSelect')) {
      document.querySelector('#operatorSelect').onchange = e => {
        let op = document.querySelector('#operatorSelect').value;
        makeGetRequest(`/getEntries?operator=${op}`, op, loadGunOptions);
      };
    }

    if (document.querySelector('#submitEntry')) {
      document.querySelector('#submitEntry').onclick = e => {
        e.preventDefault();
        makePostRequest('/addNewEntry', processPostResults);
      };  
    }
  };

  window.onload = setupClickEvents;

})();
