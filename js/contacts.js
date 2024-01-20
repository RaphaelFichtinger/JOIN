// sets test-contacts that are in the contactbook 
// use this function manually to fetch.post a new pseudo contact 
async function setContacts(){
  loadedContacts.push({
    'name': 'Milka Kuh',
    'email': 'milka@test.de',
    'phone':  '4234234' 
  });
  await setItem('loadedContacts',JSON.stringify(loadedContacts));
}

async function loadContacts(){
    try {
    loadedContacts = JSON.parse(await getItem('contacts'));
    } catch(e){
    console.error('Loading error:', e);
    }
  renderContacts();
}

function renderContacts() {
  overlay = document.getElementById('contactlist');
  overlay.innerHTML = '';
  for (let i = 0; i < loadedContacts.length; i++) {
    let contact = loadedContacts[i];
    let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    let backgroundColor = getRandomColor();
    overlay.innerHTML += `
         <div id="contactcard-container" onclick="showContactDetails(${i})">
              <div id="contact-cyrcle-div"> 
                  <div style="background-color: ${backgroundColor};" id="contact-cyrcle">${initials}</div>
              </div>
                  <div id="contact-details">
                      <div id="contact-name">${contact.name}</div>
                      <div id="contact-email">${contact.email}</div>
                  </div>
         </div>`;
  }
}

function showContactDetails(i) {
  let overlay = document.getElementById('container-right-content');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = getRandomColor();
  overlay.innerHTML = `
  <div id="contact-overlay">
    <div id="overlay-top-container">
        <div id="contact-cyrcle-div-overlay">
            <div id="contact-cyrcle-overlay" style="background-color: ${backgroundColor};">${initials}
            </div> 
      </div>
      <div id="contact-mid-overlay">
          <div id="contact-name-overlay"> ${contact.name}</div>
                  <div id="edit-delete-div">
                      <div onclick="editContact(${i})" id="edit-div">Edit</div>
                      <div onclick="deleteContact(${i})" id="delete-div">Delete</div>
                  </div>
          </div>
      </div>
      <div id="heading-contact-information">Contact Information</div>
      <div id="overlay-bottom-container">
              <div id="contact-email-overlay"><div><b>Email</b></div><div id="email-div">${contact.email}</div></div>
              <div id="contact-telefon-overlay"><div><b>Phone</b></div><div id="telefon-div">${contact.phone}</div></div>
        </div>
    </div>
`;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function editContact(i) {
  let overlay = document.getElementById('editing-overlay');
  overlay.classList.remove('d-none');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = getRandomColor();
  overlay.innerHTML = `
<div id="edit">
    <div id="editing-div-leftside">
          <div id="edit-overlay-logo">
          </div>
            <div id="edit-overlay-heading">Edit Contact
              <img id="vector5" src="../img/vector5vertical.png">
            </div>
    </div>                
    <div id="editing-div-rightside">
          <div id="close-edit" onclick="closeEdit()">
          </div>
            <div id="cyrcle-and-inputs-div">
            <div id="edit-cyrcle-overlay" style="background-color: ${backgroundColor};">${initials}
          
              </div>
              <div id="edit-content-rightside">
                <div id="edit-inputs">
                <input id="edit-input-name" type="text" value="${contact.name}">
                <input id="edit-input-mail"  type="email" value="${contact.email}">
                <input id="edit-input-number"  type="text" value="${contact.phone}">
                </div>
                <div id="save-delete-div">
                  <button onclick="deleteContact(${i})"id="delete-btn-edit">Delete</button>
                  <div id="save-btn-div" onclick="saveContactChanges(${i})"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png"></div>
              </div>
              </div>
            </div>
      </div>
</div>
  `;
}

function closeEdit(){
  let editoverlay = document.getElementById('editing-overlay');
  let overlay = document.getElementById('contact-overlay');
  editoverlay.classList.add('d-none');
  renderContacts();
}

function setNewContact(i){
  let overlay = document.getElementById('editing-overlay');
  overlay.classList.remove('d-none');
  overlay.innerHTML = `
<div id="edit">
    <div id="editing-div-leftside">
          <div id="edit-overlay-logo">
          </div>
            <div id="edit-overlay-heading">Add Contact
              <img id="vector5" src="../img/vector5vertical.png">
            </div>
    </div>                
    <div id="editing-div-rightside">
          <div id="close-edit" onclick="closeEdit()">
          </div>
            <div id="cyrcle-and-inputs-div">
              <div id="edit-cyrcle-new-contact">
              </div>
              <div id="edit-content-rightside">
                <div id="edit-inputs">
                <input id="edit-input-name" type="text">
                <input id="edit-input-mail"  type="email" >
                <input id="edit-input-number"  type="text" >
                </div>
                <div id="save-delete-div">
                  <button onclick="deleteContact(${i})"id="delete-btn-edit">Delete</button>
                  <div id="save-btn-div" onclick="saveContactChanges(${i})"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png"></div>
              </div>
              </div>
            </div>
      </div>
</div>
  `;
}

function saveContactChanges(i) {
  let editedName = document.getElementById('edit-input-name');
  let editedEmail = document.getElementById('edit-input-mail');
  let editedPhone = document.getElementById('edit-input-number');
  let overlay = document.getElementById('contact-overlay');
  let contact = loadContacts[i];

 contact.name = editedName.value;
contact.email = editedEmail.value;
contact.phone = editedPhone.value;

  setItem('contacts', JSON.stringify(loadedContacts));
  overlay.innerHTML=``;
  renderContacts();
  closeEdit();
}

function deleteContact(i) {
  let overlay = document.getElementById('contact-overlay');
  loadedContacts.splice(i, 1);
  setItem('loadedContacts', JSON.stringify(loadedContacts));
  setItem('contacts', JSON.stringify(loadedContacts));
  overlay.innerHTML=``;
  renderContacts();
  closeEdit();
}
















