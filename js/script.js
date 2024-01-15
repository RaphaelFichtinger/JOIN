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

	if(password.value === confirm.value) {
		let signedUpUser = {
			'name' : name.value,
			'password': password.value,
			'email': email.value
		};
		signedUpUsers.push(signedUpUser);

		await setItem('signedUpUsers', JSON.stringify(signedUpUsers));
		resetForm(email, password, confirm, name);
	} else {
		alert('Das Passwort stimmt nicht überein');
	}
}

async function resetForm(email, password, confirm, name) {
	name.value = '';
	email.value = '';
	password.value = '';
	confirm.value = '';
}