async function loadContacts(){
  try {
      loadedContacts = JSON.parse(await getItem('contacts')) || [];
  } catch(e){
      console.error('Loading error:', e);
  }
  loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
  renderContacts();
  renderContactsMobile();
}

function renderContacts() {
  overlay = document.getElementById('contactlist');
  overlay.innerHTML = '';
  let currentLetter = null; 
  
  for (let i = 0; i < loadedContacts.length; i++) {
    let contact = loadedContacts[i];
    let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    let backgroundColor = contact.color; 

    if (initials.charAt(0) !== currentLetter) {
      currentLetter = initials.charAt(0);
      overlay.innerHTML += `<div id="alphabet-tab">${currentLetter}</div>`;
    }
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

function renderContactsMobile() {
  overlay = document.getElementById('contactlist-mobile');
  overlay.innerHTML = '';
  overlay.innerHTML += '<div id="adding-overlay-mobile"></div><img id="add-person-btn-mobile" src="../img/person_add.png" onclick="setNewContactMobile()">'
  let currentLetter = null; 
  
  for (let i = 0; i < loadedContacts.length; i++) {
    let contact = loadedContacts[i];
    let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    let backgroundColor = contact.color; 

    if (initials.charAt(0) !== currentLetter) {
      currentLetter = initials.charAt(0);
      overlay.innerHTML += `<div id="alphabet-tab-mobile">${currentLetter}</div>`;
    }
    overlay.innerHTML += `
      <div id="contactcard-container-mobile" onclick="showContactDetailsMobile(${i})">
          <div id="contact-cyrcle-div"> 
              <div style="background-color: ${backgroundColor};" id="contact-cyrcle">${initials}</div>
          </div>
          <div id="contact-details">
              <div id="contact-name">${contact.name}</div>
              <div id="contact-email">${contact.email}</div>
          </div>
      </div>
        
      `;
  }
}

function showContactDetails(i) {
  let overlay = document.getElementById('container-right-content');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = contact.color;
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

function showContactDetailsMobile(i) {
  let overlayMobile = document.getElementById('container-right-mobile');
  overlayMobile.classList.remove('d-none');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = contact.color;
  overlayMobile.innerHTML = `
  <div id="popup-window-container"class="d-none">
    <div id="popup-btn-edit" onclick="editMobileContact(${i})"><img id="popup-img-edit" src="../img/edit.png"><p>Edit</p></div>
    <div id="popup-btn-delete" onclick="deleteContactMobile(${i})"><img id="popup-img-delete" src="../img/delete-subtask.svg"><p>Delete</p></div>
  </div>
      <div id="overlay-top-container-mobile">
      <button id="mobile-more-btn" onclick="openOrClose()" ></button>
        <button id="close-mobile-details-btn" onclick="closeMobileDetails()"></button>
          <div id="heading-div-static-mobile">Contacts</div>
            <div id="text-div-static-mobile">Better with a team</div>
            <div id="contact-cyrcle-div-overlay-mobile">
                  <div id="contact-cyrcle-overlay-mobile" style="background-color: ${backgroundColor};">${initials}
              </div> 
                    <div id="contact-name-overlay-mobile""> ${contact.name}</div>
    </div>
  
            <div id="heading-contact-information-mobile"">Contact Information</div>
                
        <div id="overlay-bottom-container-mobile"">
                <div id="contact-email-overlay-mobile""><b>Email</b><div id="email-div">${contact.email}</div></div>
                <div id="contact-telefon-overlay-mobile""><b>Phone</b><div id="telefon-div">${contact.phone}</div></div>
        </div>
    
`;
}

function closeMobileDetails(){
  let mobileDetails = document.getElementById('container-right-mobile');
  mobileDetails.classList.add('d-none');
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
  let backgroundColor = contact.color;
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
                    <div id="save-btn-div" onclick="saveContactChanges(${i})"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png">
                    </div>
                </div>
              </div>
            </div>
      </div>
</div>
  `;
}

function editMobileContact(i) {
  let overlay = document.getElementById('editing-overlay-mobile');
  overlay.classList.remove('d-none');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = contact.color;
  overlay.innerHTML = `
  <div id="edit-mobile">
  <div id="edit-contact-div-top-mobile">
          <div id="new-contact-overlay-heading-mobile"><h1 id="static-heading-edit-mobile">Edit contact<h1> <p id="new-contact-text">Tasks are better with a team!</p>
            <img id="vector5-for-new-mobile" src="../img/vector5vertical.png">
          </div>
  </div>   

        <div id="editing-div-bottom-mobile">
              <div id="close-edit-mobile-btn" onclick="closeEditMobile()">
              </div>
                <div id="cyrcle-and-inputs-div-mobile">
                <div id="edit-cyrcle-overlay-mobile" style="background-color: ${backgroundColor};">${initials}</div>
                </div>
                  </div>
                  <div id="edit-content-bottom-mobile">
                    <div id="edit-inputs-mobile">
                    <input id="edit-contact-input-name-mobile" placeholder="Name" type="text" value="${contact.name}">
                    <input id="edit-contact-input-mail-mobile" placeholder="Email" type="email" value="${contact.email}" >
                    <input id="edit-contact-input-number-mobile" placeholder="Phone" type="text" value="${contact.phone}" >
                    </div>
                    <div id="save-delete-div-mobile">
                    <div id="cancel-btn-div" onclick="deleteContactMobile(${i})"><button id="cancel-btn-edit">Delete</button></div>
                      <div id="save-btn-div" onclick="saveContactChangesMobile(${i})"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png"></div>
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
  let backgroundColor =  getRandomColor();
  loadedContacts[i].name = editedName.value;
  loadedContacts[i].email = editedEmail.value;
  loadedContacts[i].phone = editedPhone.value;
  loadedContacts[i].color = backgroundColor;
  setItem('contacts', JSON.stringify(loadedContacts));
  overlay.innerHTML = '';
  loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
    
  setItem('loadedContacts', JSON.stringify(loadedContacts));
  setItem('contacts', JSON.stringify(loadedContacts));
  renderContacts();
  closeEdit();
}

function saveContactChangesMobile(i) {
  let editedName = document.getElementById('edit-contact-input-name-mobile');
  let editedEmail = document.getElementById('edit-contact-input-mail-mobile');
  let editedPhone = document.getElementById('edit-contact-input-number-mobile');
  let overlay = document.getElementById('editing-overlay-mobile');
  let backgroundColor =  getRandomColor();
  loadedContacts[i].name = editedName.value;
  loadedContacts[i].email = editedEmail.value;
  loadedContacts[i].phone = editedPhone.value;
  loadedContacts[i].color = backgroundColor;
  setItem('contacts', JSON.stringify(loadedContacts));
  overlay.innerHTML = '';
  loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
    
  setItem('loadedContacts', JSON.stringify(loadedContacts));
  setItem('contacts', JSON.stringify(loadedContacts));
  renderContacts();
  renderContactsMobile();
  showContactDetailsMobile(i);
  closeEditMobile();
}

function closeEdit(){
  let editoverlay = document.getElementById('editing-overlay');
  editoverlay.classList.add('d-none');
  renderContacts();
}

function closeEditMobile(){
  let editoverlay = document.getElementById('editing-overlay-mobile');
  editoverlay.classList.add('d-none');
  renderContactsMobile();
}

function closeNewContactOverlayMobile(){
  let editoverlay = document.getElementById('add-new-contact-mobile');
  editoverlay.classList.add('d-none');
  renderContactsMobile();
}

function setNewContact(i) {
  let overlay = document.getElementById('editing-overlay');
  overlay.classList.remove('d-none');
  overlay.innerHTML = `
  <div id="edit">
      <div id="editing-div-leftside">
            <div id="edit-overlay-logo">
            </div>
              <div id="new-contact-overlay-heading"><h1 id="static-heading-add">Add contact<h1>  <p id="new-contact-text">Tasks are better with a team!</p>
                <img id="vector5-for-new" src="../img/vector5vertical.png">
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
                  <input id="new-contact-input-name" placeholder="Name" type="text">
                  <input id="new-contact-input-mail" placeholder="Email" type="email" >
                  <input id="new-contact-input-number" placeholder="Phone" type="text" >
                  </div>
                  <div id="save-delete-div">
                  <div id="cancel-btn-div" onclick="closeEdit()"><button id="cancel-btn-edit">Cancel</button><img id="cancel-icon" src="../img/cancel.png"></div>
                    <div id="save-btn-div" onclick="saveNewContact()"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png"></div>
                </div>
                </div>
              </div>
        </div>
  </div>
  `;
}

function setNewContactMobile(i) {
  let overlay = document.getElementById('adding-overlay-mobile');
  overlay.classList.remove('d-none');
  overlay.innerHTML = `
  <div id="add-new-contact-mobile">
      <div id="new-contact-div-top-mobile">
              <div id="new-contact-overlay-heading-mobile"><h1 id="static-heading-add-mobile">Add contact<h1> <p id="new-contact-text">Tasks are better with a team!</p>
                <img id="vector5-for-new-mobile" src="../img/vector5vertical.png">
              </div>
      </div>   

            <div id="editing-div-bottom-mobile">
                  <div id="close-edit-mobile-btn" onclick="closeEditMobile()">
                  </div>
                    <div id="cyrcle-and-inputs-div-mobile">
                      <div id="edit-cyrcle-new-contact-mobile">
                      </div>
                      <div id="edit-content-bottom-mobile">
                        <div id="edit-inputs-mobile">
                        <input id="new-contact-input-name-mobile" placeholder="Name" type="text">
                        <input id="new-contact-input-mail-mobile" placeholder="Email" type="email" >
                        <input id="new-contact-input-number-mobile" placeholder="Phone" type="text" >
                        </div>
                        <div id="save-delete-div-mobile">
                          <div id="create-btn-div-mobile" onclick="saveNewContactMobile()"><button id="save-btn-edit-mobile">Create Contact</button><img id="check-icon" src="../img/check.png"></div>
                      </div> 
                      </div>
                    </div>
              </div>
  </div>
  `;
}

function saveNewContact(){
  let newContact = {
    'name': document.getElementById('new-contact-input-name').value,
    'email': document.getElementById('new-contact-input-mail').value,
    'phone': document.getElementById('new-contact-input-number').value
  };
  loadedContacts.push(newContact);
  loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
    
  setItem('loadedContacts', JSON.stringify(loadedContacts));
  setItem('contacts', JSON.stringify(loadedContacts));
  renderContacts();
  renderContactsMobile();
  closeEdit();
}

function saveNewContactMobile(){
  let newContact = {
    'name': document.getElementById('new-contact-input-name-mobile').value,
    'email': document.getElementById('new-contact-input-mail-mobile').value,
    'phone': document.getElementById('new-contact-input-number-mobile').value
  };
  loadedContacts.push(newContact);
  loadedContacts.sort((a, b) => a.name.localeCompare(b.name));
    
  setItem('loadedContacts', JSON.stringify(loadedContacts));
  setItem('contacts', JSON.stringify(loadedContacts));
  renderContacts();
  renderContactsMobile();
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

function deleteContactMobile(i) {
  let overlay = document.getElementById('adding-overlay-mobile');
  loadedContacts.splice(i, 1);
  setItem('loadedContacts', JSON.stringify(loadedContacts));
  setItem('contacts', JSON.stringify(loadedContacts));
  overlay.innerHTML=``;
  renderContactsMobile();
  closeEditMobile();
  closeMobileDetails();
}

function openPopup() {
  let popup = document.getElementById('popup-window-container');
  popup.classList.remove('d-none');
  popup.classList.add('d-flex');
}

function closePopup() {
  let popup = document.getElementById('popup-window-container');
  popup.classList.add('d-none');
  popup.classList.remove('d-flex');
}

function openOrClose() {
  let popup = document.getElementById('popup-window-container');

  if (popup.classList.contains('d-none')) {
    openPopup();
  } else {
    closePopup();
  }
}


function popupWindow() {
  let overlay = document.getElementById('popup-window-overlay');
  
  // Entferne die Klasse 'd-none'
  overlay.classList.remove('d-none');
  
  // Setze die Höhe und Breite auf 100vw
  overlay.style.height = '100vw';
  overlay.style.width = '100vw';

  // Füge die Klasse 'd-none' und entferne die Höhe/Breite nach 2 Sekunden wieder hinzu
  setTimeout(function() {
    overlay.classList.add('d-none');
    overlay.style.height = '';
    overlay.style.width = '';
  }, 1000);
}

