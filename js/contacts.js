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
      overlay.innerHTML += renderContactsHTMLTemplate(i, backgroundColor, initials, contact);
  }
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
    overlay.innerHTML += renderContactsMobileHTMLTemplate(i, backgroundColor, initials, contact);
  }
}

function showContactDetails(i) {
  let overlay = document.getElementById('container-right-content');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = contact.color;
  overlay.innerHTML = showContactDetailsHTMLTemplate(backgroundColor, initials, contact, i);
}

function showContactDetailsMobile(i) {
  let overlayMobile = document.getElementById('container-right-mobile');
  overlayMobile.classList.remove('d-none');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = contact.color;
  overlayMobile.innerHTML = showContactDetailsMobileHTMLTemplate (backgroundColor, initials, contact, i);
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
  overlay.innerHTML = editContactHTMLTemplate(backgroundColor, initials, contact, i);
}

function editMobileContact(i) {
  let overlay = document.getElementById('editing-overlay-mobile');
  overlay.classList.remove('d-none');
  let contact = loadedContacts[i];
  let initials = contact.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  let backgroundColor = contact.color;
  overlay.innerHTML =editMobileContactHTMLTemplate(backgroundColor, initials, contact, i);
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
  overlay.innerHTML = setNewContactHTMLTemplate();
}

function setNewContactMobile(i) {
  let overlay = document.getElementById('adding-overlay-mobile');
  overlay.classList.remove('d-none');
  overlay.innerHTML = setNewContactMobileHTMLTemplate();
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

