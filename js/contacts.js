const contacts = [
  {
    Name: "Anna Schmidt",
    Email: "AnnaSchmidt@gmail.com",
    Telefon: "012345678901"
  },
  {
    Name: "Boris Müller",
    Email: "BorisMueller@gmail.com",
    Telefon: "023456789012"
  },
  {
    Name: "Carla Wagner",
    Email: "CarlaWagner@gmail.com",
    Telefon: "034567890123"
  },
  {
    Name: "David Fischer",
    Email: "DavidFischer@gmail.com",
    Telefon: "045678901234"
  }
];

function renderContacts() {
  let list = document.getElementById('contactlist');
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 

  // Hier den Inhalt von 'list' löschen
  list.innerHTML = '';

  for (let letter of alphabet) {
    let contactsForLetter = contacts.filter(contact => contact.Name.toUpperCase().startsWith(letter));

    if (contactsForLetter.length > 0) {
      list.innerHTML += `
        <div id="container-alphabet">
          <div id="alphabet-tab" onclick="showContactsForLetter('${letter}')">${letter}</div>
        </div>      
      `;

      for (let contact of contactsForLetter) {
        let firstNameInitial = contact.Name[0].toUpperCase(); 
        let lastNameInitial = contact.Name.split(' ')[1][0].toUpperCase(); 
        list.innerHTML += `
          <div id="contactcard-container" onclick="showContactDetails(${contacts.indexOf(contact)})">
            <div id="contact-cyrcle-div">
              <div id="contact-cyrcle">${firstNameInitial}${lastNameInitial}</div> 
            </div>  
            <div id="contact-details">
              <div id="contact-name">${contact.Name}</div>
              <div id="contact-email">${contact.Email}</div>
            </div>
          </div>
        `;
      }
    }
  }
}

function showContactsForLetter(letter) {
`Contacts for letter ${letter}:`, 
  contacts.filter(contact => contact.Name.toUpperCase().startsWith(letter));
}

function showContactDetails(i) {
  let overlay = document.getElementById('container-right-content');
  let contact = contacts[i];
  let firstNameInitial = contact.Name[0].toUpperCase(); 
  let lastNameInitial = contact.Name.split(' ')[1][0].toUpperCase();
  overlay.innerHTML = `
  <div id="contact-overlay">
        <div id="overlay-top-container">
            <div id="contact-cyrcle-div-overlay">
                <div id="contact-cyrcle-overlay">${firstNameInitial}${lastNameInitial}
                </div> 
          </div>
              
      <div id="contact-mid-overlay">
              <div id="contact-name-overlay"> ${contact.Name}</div>
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
}

function closeEdit(){
  let editoverlay = document.getElementById('editing-overlay');
  editoverlay.classList.add('d-none');
  renderContacts();
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
            </div>
    </div>                
    
    <div id="editing-div-rightside">
          <div id="close-edit" onclick="closeEdit()">
          </div>
            <div id="cyrcle-and-inputs-div">
              <div id="edit-cyrcle">
              </div>
                <div id="edit-inputs">
                <input type="text" value="${contact.Name}">
                <input type="text" value="${contact.Email}">
                <input type="text" value="${contact.Telefon}">
                </div>
            </div>
    </div>
  `;

  renderEditContactCircle(contact.Name.split(' ')[0], contact.Name.split(' ')[1]);
}

function renderEditContactCircle(firstName, lastName) {
  let firstNameInitial = firstName[0].toUpperCase();
  let lastNameInitial = lastName ? lastName[0].toUpperCase() : '';

  let editCircleDiv = document.getElementById('edit-cyrcle');
  editCircleDiv.innerHTML = `
    <div id="contact-cyrcle-overlay">${firstNameInitial}${lastNameInitial}</div>
  `;
}






function saveContactChanges(i) {
  let overlay = document.getElementById('editing-overlay');
  let inputs = document.getElementById('edit-inputs').getElementsByTagName('input');
  
  contacts[i].Name = inputs[0].value;
  contacts[i].Email = inputs[1].value;
  contacts[i].Telefon = inputs[2].value;

  overlay.classList.add('d-none');
  renderContacts();
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

  function renderContactsHTML(){




  }