let loadedContacts = [];
let tasks = [];
let logedInPerson = '';
let logedInGuest = 'Dear Guest';
let logedInAsGuest = false;
let logedInWithName = false;

logedInPerson = JSON.parse(localStorage.getItem('logedIn Person'));
logedInAsGuest = JSON.parse(localStorage.getItem('logedIn as Guest'));
logedInWithName = JSON.parse(localStorage.getItem('logedIn with Name'));

const STORAGE_TOKEN = '0SUZWQWFOE8PEF8QOE5A57VYG0N48AWXZYFBZWYB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

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

async function loadContacts(){
  try {
  loadedContacts = JSON.parse(await getItem('contacts'));
  } catch(e){
  console.error('Loading error:', e);
  }
}

async function loadTasks() {
  tasks = JSON.parse(await getItem('tasks'));
}