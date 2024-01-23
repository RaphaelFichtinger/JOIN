let tasks = [];
let checkedContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtasksArray = [];
let priorityVariable;

let title = document.getElementById('title');
let description = document.getElementById('description');
let dateDue = document.getElementById('due-date');
let categoryValue = document.getElementById('category');

async function init() {
    tasks = JSON.parse(await getItem('tasks'));
    await loadContacts();
    getCategories();
	getContacts();
}

async function createNewTask() {

    tasks.push({
        'title': title.value,
        'description': description.value,
        'assign-to': checkedContacts,
        'date': dateDue.value,
        'priority': priorityVariable,
        'category': categoryValue.value,
        'subtasks': subtasksArray
    })

    await setItem('tasks', JSON.stringify(tasks));
    clearFields();
    successLightbox();
}

function successLightbox() {
    let successLightbox = document.getElementById('success-lightbox');
	let successButton = document.getElementById('success');
	successLightbox.style.display = 'flex';
	setTimeout(() => {
        successLightbox.style.zIndex = '2';
		successButton.style.transition = 'transform 1s ease-in-out';
		successButton.style.transform = 'translateY(30%)';

		setTimeout(() => {
			successLightbox.style.display = 'none';
            successButton.style.transform = 'translateY(100%)';
            successLightbox.style.zIndex = '-1';
        }, 2000);
	}, 150)
}

function clearFields() {
    let assignTo = document.getElementById('contacts-list');
    let addedContacts = document.getElementById('added-contacts');
    let subtasks = document.getElementById('list-item-subtasks');

    assignTo.classList.add('d-none');
    assignTo.classList.remove('block');
    addedContacts.innerHTML = '';
    removePriority();
    subtasks.innerHTML = '';
    subtasksArray = [];
    checkedContacts = [];

    let checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(function(event) {
        event.checked = false;
    })

	title.value = '';
	description.value = '';
	dateDue.value = '';
	category.value = '';
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
    let contactName = loadedContacts[index]['name'];

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

    let overlayList = document.getElementById('categories-list');
    overlayList.classList.remove('block');
    overlayList.classList.add('d-none');
}

function selectPriority(priority) {
    let priorityButton = document.getElementById(`priority-${priority}`);

    removePriority()
    priorityButton.classList.add(`${priority}`);
    priorityVariable = priorityButton.textContent;
}

function removePriority() {
    let button = document.querySelectorAll('.priority-button');
    button.forEach(function(event) {
        event.classList.remove('alta');
        event.classList.remove('medium');
        event.classList.remove('baia');
    })
}

function changeIcons() {
    let subtaskPlus = document.getElementById('subtasks-plus');
    let subtaskIcons = document.getElementById('image-click');

    // if(subtaskPlus.classList.contains('d-none')) {
    //     subtaskPlus.classList.add('flex');
    //     subtaskPlus.classList.remove('d-none');
    // } else {
    //     subtaskPlus.classList.add('d-none');
    //     subtaskPlus.classList.remove('flex');
    // }

    // if(subtaskIcons.classList.contains('d-none')) {
    //     subtaskIcons.classList.add('flex');
    //     subtaskIcons.classList.remove('d-none');
    // } else {
    //     subtaskIcons.classList.add('d-none');
    //     subtaskIcons.classList.remove('flex');
    // }

    subtaskPlus.classList.add('d-none');
    subtaskIcons.classList.remove('d-none');
    subtaskIcons.classList.add('flex');
}

function addSubtask() {
    let inputSubtask = document.getElementById('subtasks');
    let listItemSubtasks = document.getElementById('list-item-subtasks');

    listItemSubtasks.innerHTML += `<li>
        <div id="editableText" class="li-element flex space-between align-center">
            <p>${inputSubtask.value}</p>
            <div class="edit-delete-icons flex">
                <img onclick="editSubtask()" id="subtasks-edit" class="subtasks-edit" src="./img/edit-subtask.svg" alt="Edit">
                <img onclick="clearSubtask()" id="subtasks-delete" class="subtasks-delete" src="./img/delete-subtask.svg" alt="Delete">
            </div>
        </div>
    </li>`;

    subtasksArray.push(`${inputSubtask.value}`);

    inputSubtask.value = '';

    changeIcons();
}

function editSubtask() {
    var textElement = document.getElementById('editableText');
    textElement.contentEditable = true;
    textElement.focus(); // Den Fokus auf das bearbeitbare Element setzen

    let edit = document.getElementById('subtasks-edit');
    let deleteSubtasks = document.getElementById('subtasks-delete');
    edit.src = './img/delete-subtask.svg';
    deleteSubtasks.src = './img/check-blue.svg';
}

function clearSubtask() {
    let inputSubtask = document.getElementById('subtasks');

    inputSubtask.value = '';
}