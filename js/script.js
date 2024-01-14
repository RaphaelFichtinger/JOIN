const STORAGE_TOKEN = '0SUZWQWFOE8PEF8QOE5A57VYG0N48AWXZYFBZWYB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let loginUsers = [];

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

async function login() {
	let email = document.getElementById('input-email');
	let password = document.getElementById('input-password');
	let loginUser = {
		'email': email.value,
		'password': password.value
	};
	loginUsers.push(loginUser);

	await setItem('loginUsers', JSON.stringify(loginUsers));
	resetForm(email, password);


}

async function resetForm(email, password) {
	email.value = '';
	password.value = '';
}