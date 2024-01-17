STORAGE_TOKEN = '0SUZWQWFOE8PEF8QOE5A57VYG0N48AWXZYFBZWYB';
 STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
contacts = [

  {
    'name' : 'Toni Test',
    'mail': 'contactM@ai',
    'phone': '5345345'
  }

];

async function loadContacts() {
  try {
    let cont = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

async function setItem(key, value) {
	const payload = {key, value, token:STORAGE_TOKEN}
	return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
	.then(resp => resp.json())
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  console.log('Fetch URL:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}




function renderContacts() {
  let list = document.getElementById('contactlist');
  list.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    list.innerHTML += `
      <div id="contactcard-container">
        <div id="contact-cyrcle-div">
          <div id="contact-cyrcle"></div> 
        </div>  
        <div id="contact-details">
          <div id="contact-name">${contact.name}</div>
          <div id="contact-email">${contact.mail}</div>
        </div>
      </div>
    `;
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


function addNewContact(i){
  let overlay = document.getElementById('editing-overlay');
  overlay.classList.remove('d-none');
  let contact = contacts[i];
  let editInputsDiv = document.getElementById('edit-inputs');
  overlay.innerHTML = `
  <div id="edit">

      <div id="editing-div-leftside">
              <div id="edit-overlay-logo">
              </div>
                <div id="new-contact-overlay-heading">Add Contact
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
            <input id="new-name-input" type="text" placeholder="Name" >
            <input id="new-mail-input" type="email" placeholder="Email">
            <input id="new-phone-input" type="text" placeholder="Phone">
            </div>
            <div id="save-delete-div">
              <button onclick="deleteContact()"id="delete-btn-edit">Delete</button>
              <div id="save-btn-div" onclick="saveContactChanges(${i})"><button id="save-btn-edit">Save</button><img id="check-icon" src="../img/check.png"></div>
          </div>
          </div>
        </div>
  </div>
</div>
  `;
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

async function saveContactChanges(i) {
  let overlay = document.getElementById('editing-overlay');
  let contactName = document.getElementById('new-name-input').value;
  let contactMail = document.getElementById('new-mail-input').value;
  let contactPhone = document.getElementById('new-phone-input').value;

  let editedContact = {
    'name' : contactName,
    'mail': contactMail,
    'phone': contactPhone
  };

  contacts.push(editedContact);
  setItem();

  try {
    await setItem('contacts', JSON.stringify(contacts));
    // Nachdem die Daten erfolgreich gespeichert wurden, render die Kontakte neu.
    renderContacts();
  } catch (error) {
    console.error('Error saving contacts:', error);
  }
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

