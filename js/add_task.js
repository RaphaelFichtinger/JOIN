let checkedContacts = [];
let categories = ['Technical Task', 'User Story'];
let subtasksArray = [];
let priorityVariable;
let toDo = 'to-do';
let currentSubtask;
let finishedSubtasks = [];

let titleLock = true;
let dateLock = true;
let categoryLock = true;

let title = document.getElementById('title');
let description = document.getElementById('description');
let dateDue = document.getElementById('due-date');
let categoryValue = document.getElementById('category');
// let assignTo = document.getElementById('assign-to');
// let assignToMobile = document.getElementById('assign-to-mobile');
let contactsList = document.getElementById('contacts-list');
let contactsListMobile = document.getElementById('contacts-list-mobile');
let buttonCreateTask = document.getElementById('button-create-task');
let timestamp = getTimestampId();

async function renderTask() {
    await loadTasks();
    await loadContacts();
    getCategories();
	getContacts();
    setActivePage2();
}

if(title) {
    title.addEventListener('input', function() {
        if(this.value !== '') {
            titleLock = false;
            console.log(titleLock);
        }
        if(!titleLock && !dateLock && !categoryLock) {
            enableAddTaskButton();
        }
    })
}

if(dateDue) {
    dateDue.addEventListener('input', function() {
        if(this.value !== '') {
            dateLock = false;
            console.log(dateLock);
        }
        if(!titleLock && !dateLock && !categoryLock) {
            enableAddTaskButton();
        }
    })
}

function enableAddTaskButton() {
    let buttonCreateTask = document.getElementById('button-create-task');
    buttonCreateTask.disabled = false;
}

async function createNewTask(status) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let dateDue = document.getElementById('due-date');
    let categoryValue = document.getElementById('category');

    tasks.push({
        'id': timestamp,
        'title': title.value,
        'description': description.value,
        'assign-to': checkedContacts,
        'date': dateDue.value,
        'priority': priorityVariable,
        'category': categoryValue.value,
        'subtasks': subtasksArray,
        'finishedSubtasks': finishedSubtasks,
        'status': status
    })

    await setItem('tasks', JSON.stringify(tasks));
    await setItem('nextTaskId', JSON.stringify(nextTaskId));
    clearFields();
    successLightbox();
    buttonCreateTask.disabled = true;
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
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let dateDue = document.getElementById('due-date');
    let assignTo = document.getElementById('contacts-list');
    let assignToMobile = document.getElementById('contacts-list-mobile');
    let addedContacts = document.getElementById('added-contacts');
    let addedContactsMobile = document.getElementById('added-contacts-mobile');
    let subtasks = document.getElementById('list-item-subtasks');

    assignTo.classList.add('d-none');
    assignTo.classList.remove('block');
    assignToMobile.classList.add('d-none');
    assignToMobile.classList.remove('block');
    addedContacts.innerHTML = '';
    addedContactsMobile.innerHTML = '';
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

function openOverlay(event, listId) {
    event.stopPropagation();
    let overlayList = document.getElementById(`${listId}`);
    overlayList.classList.toggle('active');
}

function closeOverlay() {
    let overlayList = document.getElementById('contacts-list');
    let overlayListMobile = document.getElementById('contacts-list-mobile');
    overlayList.classList.remove('active');
    overlayListMobile.classList.remove('active');
}

function getContacts() {
    for (let i = 0; i < loadedContacts.length; i++) {
        let contactName = loadedContacts[i]['name'];
        let splittedLetters = contactName.split(" ");

        document.getElementById('list-item').innerHTML += generateContactsHtml(splittedLetters, contactName, i);
        document.getElementById('list-item-mobile').innerHTML += generateContactsHtml(splittedLetters, contactName, i);
    }
}

function generateContactsHtml(splittedLetters, contactName, i) {
    return `
        <div class="item flex align-center" onclick="contactChecked(event, ${i})">
            <div class="circle">${splittedLetters[0] ? splittedLetters[0].charAt(0) : ''}${splittedLetters[1] ? splittedLetters[1].charAt(0) : ''}</div>
            <div class="name" data-value="${contactName.toLowerCase()}">${contactName}</div>
            <input id="checkbox_${i}" type="checkbox" class="checkbox">
        </div>
    `
}

function contactChecked(event, index) {
    event.stopPropagation();
    let checkbox = event.target;
    let contactName = loadedContacts[index]['name'];
    let addedContacts = document.getElementById('added-contacts');
    let addedContactsMobile = document.getElementById('added-contacts-mobile');

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

    addedContacts.innerHTML = '';
    addedContactsMobile.innerHTML = '';
    if(window.innerWidth <= 1000) {
        document.querySelector('.task-subtasks').style.marginTop = '0';
    }

    if(checkedContacts.length > 0) {
        document.querySelector('.task-subtasks').style.marginTop = '40px';
        for (let j = 0; j < checkedContacts.length; j++) {
            let checkedContact = checkedContacts[j];
            let splittedLetters = checkedContact.split(" ");
            addedContacts.innerHTML += `
                <div class="circle">${splittedLetters[0] ? splittedLetters[0].charAt(0) : ''}${splittedLetters[1] ? splittedLetters[1].charAt(0) : ''}</div>
            `;
            addedContactsMobile.innerHTML += `
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

    categoryLock = false;
    console.log(categoryLock);

    if(!titleLock && !dateLock && !categoryLock) {
        enableAddTaskButton();
    }
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
        event.classList.remove('alta-mobile');
        event.classList.remove('medium-mobile');
        event.classList.remove('baia-mobile');
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

async function saveEditSubtask(event) {
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

function getTimestampId() {
    let timestamp = new Date().getTime();
    console.log(timestamp);
    return timestamp;
}
