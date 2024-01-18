let loadedContacts = [];
// sets test-contacts that are in the contactbook 
// use this function manually to fetch.post a new pseudo contact 
async function setContacts(){
  loadedContacts.push({
    'name': 'Milka Kuh',
    'email': 'milka@test.de',
    'phone':  '4234234' 
  });
  await setItem('contacts',JSON.stringify(loadedContacts));
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
         <div id="contactcard-container" onclick="showContactDetails('${contact.name}', '${contact.email}')">
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

function showContactDetails(name, email) {
  // Hier können Sie den Code hinzufügen, um die Details in einem anderen Bereich anzuzeigen
  const containerRightContent = document.getElementById('container-right-content');
  
  containerRightContent.innerHTML = `
    <div id=""#top-content-container-right>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
    </div>`;
}


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}





function deleteContact(i) {
  let overlay = document.getElementById('container-right-content');
  contacts.splice(i, 1);
  overlay.innerHTML = ``;
  renderContacts();
  closeEdit();
}

function closeEdit(){
  let editoverlay = document.getElementById('editing-overlay');
  editoverlay.classList.add('d-none');
  renderContacts();
}

function addNewContact(){
let name = document.getElementById('new-name-input');
let email = document.getElementById('new-email-input');
let phone = document.getElementById('new-phone-input');

let newContact = {
  'name' : name.value,
  'mail': email.value,
  'phone': phone.value
};
contacts.push(newContact);
setItem('contacts', JSON.stringify(contacts));
}

function editContact(i) {
  let overlay = document.getElementById('editing-overlay');
  overlay.classList.remove('d-none');
  let contact = contacts[i];
  let editInputsDiv = document.getElementById('edit-inputs');
  overlay.innerHTML = `
<div id="edit">
    <div id="editing-div-leftside">
          <div id="edit-overlay-logo">
          </div>
            <div id="edit-overlay-heading">Edit Contact
              <img id="vector5" src="../img/vector5.png">
            </div>
    </div>                
    
    <div id="editing-div-rightside">
          <div id="close-edit" onclick="closeEdit()">
          </div>
            <div id="cyrcle-and-inputs-div">
              <div id="edit-cyrcle">
              </div>

              <div id="edit-content-rightside">
                <div id="edit-inputs">
                <input id="edit-input-name" type="text" value="${contact.Name}">
                <input id="edit-input-mail"  type="email" value="${contact.Email}">
                <input id="edit-input-number"  type="text" value="${contact.Telefon}">
                </div>
                <div id="save-delete-div">
                  <button onclick="deleteContact()"id="delete-btn-edit">Delete</button>
                  <div id="save-btn-div" onclick="saveContactChanges()"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png"></div>
              </div>
              </div>
            </div>
      </div>
</div>
  `;

  renderEditContactCircle(contact.Name.split(' ')[0], contact.Name.split(' ')[1]);
  saveContactChanges(i);
}

function renderEditContactCircle(firstName, lastName) {
  let firstNameInitial = firstName[0].toUpperCase();
  let lastNameInitial = lastName ? lastName[0].toUpperCase() : '';

  let editCircleDiv = document.getElementById('edit-cyrcle');
  editCircleDiv.innerHTML = `
    <div id="contact-cyrcle-overlay">${firstNameInitial}${lastNameInitial}</div>
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