let tasks = [];
let checkedContacts = [];
let categories = ['Technical Task', 'User Story'];

async function init() {
    await loadContacts();
	getContacts();
    getCategories();
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

function openOverlay(listId) {
    let overlayList = document.getElementById(`${listId}`);

    if(overlayList.classList.contains('block')) {
        overlayList.classList.remove('block');
        overlayList.classList.add('d-none');
    } else {
        overlayList.classList.remove('d-none');
        overlayList.classList.add('block');
    }
}

function getContacts() {
    for (let i = 0; i < loadedContacts.length; i++) {
        let contactName = loadedContacts[i]['name'];
        let splittedLetters = contactName.split(" ");
        let firstLetter = splittedLetters[0].charAt(0);
        let secondLetter = splittedLetters[1].charAt(0);

        console.log(contactName);

        document.getElementById('list-item').innerHTML += `
            <div class="item flex align-center">
                <div class="circle">${firstLetter}${secondLetter}</div>
                <div class="name" data-value="${contactName.toLowerCase()}">${contactName}</div>
                <input id="checkbox_${i}" type="checkbox" class="checkbox" onclick="contactChecked(event, ${i}, '${firstLetter}', '${secondLetter}')">
            </div>
        `;
    }
}

function contactChecked(event, index) {
    let checkbox = event.target;
    let contactName = contacts[index]['name'];

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

    document.getElementById('added-contacts').innerHTML = '';

    if(checkedContacts.length > 0) {
        for (let j = 0; j < checkedContacts.length; j++) {
            let checkedContact = checkedContacts[j];
            let splittedLetters = checkedContact.split(" ");
            let firstLetter = splittedLetters[0].charAt(0);
            let secondLetter = splittedLetters[1].charAt(0);
            document.getElementById('added-contacts').innerHTML += `
                <div class="circle">${firstLetter}${secondLetter}</div>
            `;
        }
    }
}

function getCategories() {
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        document.getElementById('list-item-category').innerHTML += `
        <div class="item-category flex align-center">
            <div class="name" data-value="${category.toLowerCase()}" onclick="addCategory(${i})">${category}</div>
        </div>
        `;
    }
}

function addCategory(i) {
    let category = categories[i]
    document.getElementById('category').value = `${category}`;

    let overlayList = document.getElementById(`${listId}`);
    overlayList.classList.remove('block');
    overlayList.classList.add('d-none');
}

function selectPriority(priority) {
    let priorityButton = document.getElementById(`priority-${priority}`);
    let button = document.querySelectorAll('.priority-button');

    button.forEach(function(event) {
        event.classList.remove('alta');
        event.classList.remove('medium');
        event.classList.remove('baia');
    })
    priorityButton.classList.add(`${priority}`);
}

function addSubtask() {
    let inputSubtask = document.getElementById('subtasks');
    let listItemSubtasks = document.getElementById('list-item-subtasks');

    listItemSubtasks.innerHTML += `<li>${inputSubtask.value}</li>`;

    inputSubtask.value = '';

}