let tasks = [];
let checkedContacts = [];

function init() {
	getContacts();
}

function createNewTask() {
	let title = document.getElementById('title');
	let description = document.getElementById('description');
	let assignTo = document.getElementById('assign-to');
	let dateDue = document.getElementById('due-date');
	let category = document.getElementById('category');
	let subtasks = document.getElementById('subtasks');

	tasks.push({
		'title': title.value,
		'description': description.value,
		'assign-to': assignTo.value,
		'date': dateDue.value,
		'category': category.value,
		'subtasks': subtasks.value
	})

	clearFields(title, description, assignTo, dateDue, category, subtasks);
}

function clearFields(title, description, assignTo, dateDue, category, subtasks) {
	title.value = '';
	description.value = '';
	assignTo.value = '';
	dateDue.value = '';
	category.value = '';
	subtasks.value = '';
}

function openContacts() {
	document.getElementById('list-item').style.display = 'block';
}

function getContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contactName = contacts[i]['Name'];
        let splittedLetters = contactName.split(" ");
        let firstLetter = splittedLetters[0].charAt(0);
        let secondLetter = splittedLetters[1].charAt(0);

        document.getElementById('list-item').innerHTML += `
            <div class="item flex align-center">
                <div class="circle">${firstLetter}${secondLetter}</div>
                <div class="name" data-value="${contactName.toLowerCase()}">${contactName}</div>
                <input id="checkbox_${i}" type="checkbox" class="checkbox" onclick="contactChecked(event, ${i})">
            </div>
        `;
    }
}

function contactChecked(event, index) {
    let checkbox = event.target;
    let contactName = contacts[index]['Name'];

	console.log(checkbox);

    if (checkbox.checked) {
        // Checkbox wurde ausgewählt
        if (!checkedContacts.includes(contactName)) {
            checkedContacts.push(contactName);
        }
    } else {
        // Checkbox wurde abgewählt
        let indexToRemove = checkedContacts.indexOf(contactName);
        if (indexToRemove !== -1) {
            checkedContacts.splice(indexToRemove, 1);
        }
    }

    console.log(checkedContacts); // Hier kannst du das Array der ausgewählten Kontakte verwenden oder anderweitig verarbeiten
}

