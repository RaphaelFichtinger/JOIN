let checkedContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtasksArray = [];
let priorityVariable;
let toDo = 'to-do';
let currentSubtask;
let nextTaskId = 0;

nextTaskId = JSON.parse(localStorage.getItem('nextTaskId'));

let title = document.getElementById('title');
let description = document.getElementById('description');
let dateDue = document.getElementById('due-date');
let categoryValue = document.getElementById('category');
let assignTo = document.getElementById('assign-to');
let contactsList = document.getElementById('contacts-list');

async function renderTask() {
    await loadTasks();
    await loadContacts();
    getCategories();
	getContacts();
    console.log('add');
}

async function createNewTask() {
    let taskId = generateId(); // Rufe die Funktion auf, um die nächste ID zu erhalten

    tasks.push({
        'id': taskId,
        'title': title.value,
        'description': description.value,
        'assign-to': checkedContacts,
        'date': dateDue.value,
        'priority': priorityVariable,
        'category': categoryValue.value,
        'subtasks': subtasksArray,
        'status': toDo
    })

    await setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextTaskId', JSON.stringify(nextTaskId));
    clearFields();
    successLightbox();
}

// Funktion zum Generieren der nächsten verfügbaren ID
function generateId() {
    if(tasks.length == 0) {
        return nextTaskId = 0;
    } else {
        nextTaskId += 1; // Erhöhe die Variable für die nächste ID
        return nextTaskId;
    }
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

// function combinedClickFunction(event) {
//     if(event.target.closest('.item') == null) {
//         closeOverlay();
//     }
// }

function openOverlay(event, listId) {
    event.stopPropagation();
    let overlayList = document.getElementById(`${listId}`);
    overlayList.classList.toggle('active');
}

function closeOverlay() {
    let overlayList = document.getElementById('contacts-list');
    overlayList.classList.remove('active');
}

function getContacts() {
    for (let i = 0; i < loadedContacts.length; i++) {
        let contactName = loadedContacts[i]['name'];
        let splittedLetters = contactName.split(" ");

        document.getElementById('list-item').innerHTML += `
            <div class="item flex align-center">
                <div class="circle">${splittedLetters[0] ? splittedLetters[0].charAt(0) : ''}${splittedLetters[1] ? splittedLetters[1].charAt(0) : ''}</div>
                <div class="name" data-value="${contactName.toLowerCase()}">${contactName}</div>
                <input id="checkbox_${i}" type="checkbox" class="checkbox" onclick="contactChecked(event, ${i})">
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
            document.getElementById('added-contacts').innerHTML += `
                <div class="circle">${splittedLetters[0] ? splittedLetters[0].charAt(0) : ''}${splittedLetters[1] ? splittedLetters[1].charAt(0) : ''}</div>
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
    overlayList.classList.remove('active');
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

    subtaskPlus.classList.add('d-none');
    subtaskIcons.classList.remove('d-none');
    subtaskIcons.classList.add('flex');
}

function addSubtask() {
    let inputSubtask = document.getElementById('subtasks');
    let listItemSubtasks = document.getElementById('list-item-subtasks');

    listItemSubtasks.innerHTML += `<li class="subtaskItem">
        <div id="editableText" class="li-element flex space-between align-center">
            <p>${inputSubtask.value}</p>
            <div id="edit-delete-icons" class="edit-delete-icons flex">
                <img onclick="editSubtask(event)" id="subtasks-edit" class="subtasks-edit" src="./img/edit-subtask.svg" alt="Edit">
                <img onclick="clearSubtask(event)" id="subtasks-delete" class="subtasks-delete" src="./img/delete-subtask.svg" alt="Delete">
            </div>
        </div>
    </li>`;

    subtasksArray.push(`${inputSubtask.value}`);

    inputSubtask.value = '';
}

function clearSubtaskInput() {
    let inputSubtask = document.getElementById('subtasks');
    inputSubtask.value = '';
}

function editSubtask(event) {
    let textElement = event.target.closest('#editableText');
    textElement.contentEditable = true;
    textElement.focus(); // Den Fokus auf das bearbeitbare Element setzen

    currentSubtask = textElement.innerText;

    let edit = event.target.closest('#edit-delete-icons');
    edit.innerHTML = '';
    edit.innerHTML = `
        <img onclick="clearSubtask(event)" id="subtasks-delete" class="subtasks-delete" src="./img/delete-subtask.svg" alt="Delete">
        <img onclick="saveEditSubtask(event)" class="subtasks-check" src="./img/check-blue.svg" alt="">
    `;
}

function clearSubtask(event) {
    let deleteSubtask = event.target.closest('.subtaskItem');
    deleteSubtask.remove();

    let index = subtasksArray.indexOf(deleteSubtask.innerText.trim());
    if(index !== -1) {
        subtasksArray.splice(index, 1);
    }
}

function saveEditSubtask(event) {
    let textElement = event.target.closest('#editableText');
    textElement.contentEditable = false;

    let indexOfsubtask = subtasksArray.indexOf(currentSubtask);
    subtasksArray[indexOfsubtask] = textElement.innerText.trim();

    let edit = event.target.closest('#edit-delete-icons');
    edit.innerHTML = '';
    edit.innerHTML = `
        <img onclick="editSubtask()" id="subtasks-edit" class="subtasks-edit" src="./img/edit-subtask.svg" alt="Edit">
        <img onclick="clearSubtask(event)" id="subtasks-delete" class="subtasks-delete" src="./img/delete-subtask.svg" alt="Delete">
    `;

    currentSubtask = '';
}