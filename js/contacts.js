let loadedContacts = [
{

}
];

async function setItem(key, value) {
	const payload = {key, value, token:STORAGE_TOKEN}
	return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
	.then(resp => resp.json())
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
      .then(res => res.json())
      .then(res => {
          // Verbesserter code
          if (res.value) {
              return res.value;
          } throw `Could not find data with key "${key}".`;
      });
}
// sets testcontacts that are in the contactbook 
/*async function setContacts(){
  loadedContacts.push({
    'name': 'Tester Test',
    'email': 'testmail@test.de',
    'phone':  '4234234' 
  });
  await setItem('contacts', JSON.stringify(contacts));
}
*/
async function loadContacts(){
  try {
      loadedContacts = JSON.parse(await getItem('contacts'));
  } catch(e){
      console.error('Loading error:', e);
  }
  renderContacts();
}


function renderContacts(){
  overlay = document.getElementById('contactlist');
  overlay.innerHTML = ''; 
  for (let i = 0; i < loadedContacts.length; i++) {
    let contact = loadedContacts[i];
    overlay.innerHTML += `<div>${contact.name}</div>`;
  }
}







function showContactsForLetter(letter) {
  console.log(`Contacts for letter ${letter}:`, contacts.filter(contact => contact.name.toUpperCase().startsWith(letter)));
}

function showContactDetails(i) {
  let overlay = document.getElementById('container-right-content');
  let contact = contacts[i];
  let firstNameInitial = contact.name[0].toUpperCase(); 
  let lastNameInitial = contact.name.split(' ')[1][0].toUpperCase();
  overlay.innerHTML = `
  <div id="contact-overlay">
        <div id="overlay-top-container">
            <div id="contact-cyrcle-div-overlay">
                <div id="contact-cyrcle-overlay">${firstNameInitial}${lastNameInitial}
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
              <div id="contact-email-overlay"><div><b>Email</b></div><div id="email-div">${contact.Email}</div></div>
              <div id="contact-telefon-overlay"><div><b>Phone</b></div><div id="telefon-div">${contact.Telefon}</div></div>
        </div>
  </div>
  `;
}
renderContacts();

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





function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
   z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
     elmnt = z[i];
      /*search for elements with a certain atrribute:*/
     file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
         }
        }
       xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
     }
   }
  }

