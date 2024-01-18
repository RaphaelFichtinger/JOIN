const STORAGE_TOKEN = '0SUZWQWFOE8PEF8QOE5A57VYG0N48AWXZYFBZWYB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let signedUpUsers = [];
async function init() {
    loadUsers();
}

async function loadUsers(){
    try {
        signedUpUsers = JSON.parse(await getItem('signedUpUsers'));
    } catch(e){
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
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

async function signUp() {
	let name = document.getElementById('input-name');
	let password = document.getElementById('input-password');
	let confirm = document.getElementById('input-confirm');
	let email = document.getElementById('input-email');
	let checkbox = document.getElementById('input-checkbox');

	if(password.value === confirm.value) {
		if(checkbox.checked) {
			let signedUpUser = {
				'name' : name.value,
				'password': password.value,
				'email': email.value
			};
			signedUpUsers.push(signedUpUser);

			await setItem('signedUpUsers', JSON.stringify(signedUpUsers));
			resetForm(email, password, confirm, name, checkbox);
			showSuccessButton();
		} else {
			alert('Bitte bestätige unsere Privacy Policy');
		}
	} else {
		alert('Das Passwort stimmt nicht überein');
	}
}

async function resetForm(email, password, confirm, name, checkbox) {
	name.value = '';
	email.value = '';
	password.value = '';
	confirm.value = '';
	checkbox.checked = false;
}

function showSuccessButton() {
	let successButton = document.getElementById('success');
	successButton.style.display = 'flex';
	successButton.style.transform = 'translateY(-300px)';
	successButton.style.transition = 'transform(0.5s ease, opacity 0.5s ease)';
    successButton.style.opacity = '1';
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

