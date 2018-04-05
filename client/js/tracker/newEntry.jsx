const handleEntrySubmit = e => {

};

const HomeNav = props => {
  return (
    <a href="#" onClick={createTracker}>Home</a>
  );
};

const NewEntryForm = props => {
  return (
    <div id="formDiv">
      <form action="/addNewEntry" method="POST" name="newEntryForm" onSubmit={handleEntrySubmit} id="newEntryForm">
        <select name="operator" id="operatorSelect">
          <option value="">Select An Op</option>
          <option value="Ash">Ash</option>
          <option value="Blackbeard">Blackbeard</option>
          <option value="Blitz">Blitz</option>
          <option value="Buck">Buck</option>
          <option value="Capitao">Capitao</option>
          <option value="Fuze">Fuze</option>
          <option value="Glaz">Glaz</option>
          <option value="Hibana">Hibana</option>
          <option value="IQ">IQ</option>
          <option value="Montagne">Montagne</option>
          <option value="Sledge">Sledge</option>
          <option value="Thatcher">Thatcher</option>
          <option value="Thermite">Thermite</option>
          <option value="Twitch">Twitch</option>
          <option value="Bandit">Bandit</option>
          <option value="Castle">Castle</option>
          <option value="Caveira">Caveira</option>
          <option value="Doc">Doc</option>
          <option value="Echo">Echo</option>
          <option value="Frost">Frost</option>
          <option value="Jager">Jager</option>
          <option value="Kapkan">Kapkan</option>
          <option value="Mute">Mute</option>
          <option value="Pulse">Pulse</option>
          <option value="Rook">Rook</option>
          <option value="Smoke">Smoke</option>
          <option value="Tachanka">Tachanka</option>
          <option value="Valkyrie">Valkyrie</option>
        </select>
        <select name="gun" id="opGun">
          <option value="">Select A Gun</option>
        </select>
        <input id="gunSkin" type="text" name="skin" />
        <input id="submitEntry" type="submit" value="submit" />
      </form>
    </div>
  );
};

const createNewEntryForm = () => {
  ReactDOM.render(
    <NewEntryForm />,
    document.querySelector('#mainContent')
  );
};

const createNewEntryFormNav = () => {
  ReactDOM.render(
    <HomeNav />,
    document.querySelector('nav')
  );
};

const createNewEntry = e => {
  if (e) {
    e.preventDefault();
  }
  createNewEntryFormNav();
  createNewEntryForm();
};
