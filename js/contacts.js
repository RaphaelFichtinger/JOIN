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
  },
  {
    Name: "Emma Becker",
    Email: "EmmaBecker@gmail.com",
    Telefon: "056789012345"
  },
  {
    Name: "Felix Hartmann",
    Email: "FelixHartmann@gmail.com",
    Telefon: "067890123456"
  },
  {
    Name: "Greta Schneider",
    Email: "GretaSchneider@gmail.com",
    Telefon: "078901234567"
  },
  {
    Name: "Hans Meier",
    Email: "HansMeier@gmail.com",
    Telefon: "089012345678"
  },
  {
    Name: "Isabel Mayer",
    Email: "IsabelMayer@gmail.com",
    Telefon: "090123456789"
  },
  {
    Name: "Jonas Weber",
    Email: "JonasWeber@gmail.com",
    Telefon: "101234567890"
  },
  {
    Name: "Kathrin Lehmann",
    Email: "KathrinLehmann@gmail.com",
    Telefon: "112345678901"
  },
  {
    Name: "Lukas Zimmermann",
    Email: "LukasZimmermann@gmail.com",
    Telefon: "123456789012"
  },
  {
    Name: "Maria Klein",
    Email: "MariaKlein@gmail.com",
    Telefon: "134567890123"
  },
  {
    Name: "Nico Richter",
    Email: "NicoRichter@gmail.com",
    Telefon: "145678901234"
  },
  {
    Name: "Olivia Schuster",
    Email: "OliviaSchuster@gmail.com",
    Telefon: "156789012345"
  },
  {
    Name: "Paul Neumann",
    Email: "PaulNeumann@gmail.com",
    Telefon: "167890123456"
  },
  {
    Name: "Quentin Huber",
    Email: "QuentinHuber@gmail.com",
    Telefon: "178901234567"
  },
  {
    Name: "Rosa Berger",
    Email: "RosaBerger@gmail.com",
    Telefon: "189012345678"
  },
  {
    Name: "Simon Wolf",
    Email: "SimonWolf@gmail.com",
    Telefon: "190123456789"
  },
  {
    Name: "Tina Hofmann",
    Email: "TinaHofmann@gmail.com",
    Telefon: "201234567890"
  },
  {
    Name: "Uwe Sauer",
    Email: "UweSauer@gmail.com",
    Telefon: "212345678901"
  },
  {
    Name: "Vera Engel",
    Email: "VeraEngel@gmail.com",
    Telefon: "223456789012"
  },
  {
    Name: "Werner Krause",
    Email: "WernerKrause@gmail.com",
    Telefon: "234567890123"
  },
  {
    Name: "Xaver Arnold",
    Email: "XaverArnold@gmail.com",
    Telefon: "245678901234"
  },
  {
    Name: "Yvonne Fischer",
    Email: "YvonneFischer@gmail.com",
    Telefon: "256789012345"
  },
  {
    Name: "Zoe Lang",
    Email: "ZoeLang@gmail.com",
    Telefon: "267890123456"
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


function editContact(i){
  let overlay = document.getElementById('editing-overlay');
  overlay.classList.remove('d-none');


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


  