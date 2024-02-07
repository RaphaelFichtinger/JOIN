async function renderBoard() {
    await loadTasks();
    await loadContacts();
    updateHTML();
    setActivePage3();
}

document.querySelector('.input-board-top').addEventListener('input', function () {
    searchTasks(this.value);
});

function searchTasks(query) {
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
    updateHTML(filteredTasks);
}


function updateHTML(filteredTasks = tasks) {
    const taskStatusMap = {
        'to-do': 'to-do',
        'in-progress': 'in-progress',
        'await-feedback': 'await-feedback',
        'done-tasks': 'done-tasks',
    };

    for (const status in taskStatusMap) {
        const filteredStatusTasks = filteredTasks.filter(t => t['status'] == taskStatusMap[status]);

        document.getElementById(status).innerHTML = '';

        for (let index = 0; index < filteredStatusTasks.length; index++) {
            const element = filteredStatusTasks[index];
            document.getElementById(status).innerHTML += generateTodoHTML(element, index);
        }
    }
}

let currentDraggedElement;

function generateTodoHTML(element, index) {
    let fullNames = element['assign-to'];
    let subtasks = element['subtasks'];
    let finishedSubtasks = element['finishedSubtasks'];
    let contactsArray = loadedContacts;
    let plusContacts = Math.max(0, fullNames.length - 3); 
    let progress = 0;

    if (finishedSubtasks && finishedSubtasks.length > 0) {
        progress = (finishedSubtasks.length / subtasks.length) * 100;
    }
    let initials = '';

    for (let f = 0; f < Math.min(3, fullNames.length); f++) {
        let fullName = fullNames[f]['name'];
        let nameInitials = getInitials(fullName);
        let contactIndex = contactsArray.findIndex(contact => contact.name === fullName);
        let matchingColor = contactsArray[contactIndex].color;
        console.log(matchingColor, fullName);
        initials += `<p id="initials-circle-${f}" class="initials-circle" style='background-color : ${matchingColor}'>${nameInitials}</p>`;

    }


    let additionalContacts = '';
    if (plusContacts > 0) {
        additionalContacts = `<p>+${plusContacts}</p>`;
    }



    return `
    <div id="task-card-${index}" class="task-card" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTaskOverview(${element['id']})">
        <button class="task-type">${element['category']}</button>
        <div class="task-text">
            <p id="task-title">${element['title']}</p>
            <p id="task-details">${element['description']}</p>
        </div>
        <div class="subtasks">
            <div class="progress-container">
                <div class="progress-bar" style="width: ${progress}%;"></div>
            </div>
            <div>
                <p>${finishedSubtasks.length}/${element['subtasks'].length} Subtasks</p>
            </div>
        </div>
        <div class="task-card-bottom">
            <div id="initials">
                ${initials}
            </div>
            <div id="additionalContacts">
            ${additionalContacts}</div>
            <div>
                <img id="priority-image-small${index}" src="">
            </div>
        </div>
    </div>
    `;
}



function startDragging(id) { //die Id markiert das Element das gerade verschoben wird
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    let currentTaskIndex = tasks.findIndex(task => task.id === currentDraggedElement);
    tasks[currentTaskIndex]['status'] = status;
    setItem('tasks', JSON.stringify(tasks));   //saves status of our board
    updateHTML();
}

//highlight auf das Board geben
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

//highlight vom Board entfernen
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function openAddTaskPopup(status) {
    let popup = document.getElementById('add-task-popup');
    popup.innerHTML = returnTask(status);
    popup.style.display = 'block';
    getCategories();
    getContacts();

    let title = document.getElementById('title');
    let dateDue = document.getElementById('due-date');

    if (title) {
        title.addEventListener('input', function () {
            if (this.value !== '') {
                titleLock = false;
                console.log(titleLock);
            }
            if (!titleLock && !dateLock && !categoryLock) {
                enableAddTaskButton();
            }
        })
    }

    if (dateDue) {
        dateDue.addEventListener('input', function () {
            if (this.value !== '') {
                dateLock = false;
                console.log(dateLock);
            }
            if (!titleLock && !dateLock && !categoryLock) {
                enableAddTaskButton();
            }
        })
    }
}

function closeAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'none';
}

function openTaskOverview(id) {
    let overviewEdit = document.getElementById('task-big-view-edit-card');
    let overview = document.getElementById('overview-container');
    let overviewCard = document.getElementById('task-big-view-card');
    overviewEdit.style.display = 'none';
    overview.style.display = 'flex';
    overviewCard.style.display = 'flex';
    overviewCard.style.flexDirection = 'column';
    createOverview(id);
}

function closeTaskOverview() {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'none';
    // finishedSubtask(i, j);
}


function editTaskOverview(id) {
    let task = tasks.find(task => task.id === id);
    let overviewCard = document.getElementById('task-big-view-card');
    let overviewEdit = document.getElementById('task-big-view-edit-card');
    overviewCard.style.display = 'none';
    overviewEdit.style.display = 'block';
    if (task) {
        generateEditCard(task);
    }
}

function closeEditCard() {

    let overviewEdit = document.getElementById('task-big-view-edit-card');
    let overview = document.getElementById('overview-container');
    overview.style.display = 'none';

}



function getInitials(name) {
    if (name) {
        console.log(name);
        let names = name.split(' ');

        if (names.length > 1) {
            return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
        } else if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }
    }

    return '';
}

async function clearTasks() {
    let tasks = [];
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('nextTaskId', JSON.stringify(nextTaskId));
    updateHTML();
}

function createOverview(id) {
    // Finde die Aufgabe mit der gegebenen ID
    let task = tasks.find(task => task.id === id);
    console.log(task);

    let title = task['title'];
    let date = task['date'];
    let category = task['category'];
    let description = task['description'];
    let priority = task['priority'];
    let overviewCard = document.getElementById('task-big-view-card');
    generateAssignTo(task.id);
    overviewCard.innerHTML = createOverviewHTMLTemplate(category, title, description, date, priority, task)
}

function generateAssignTo(id) {
    let task = tasks.find(task => task.id === id);
    let fullNames = task['assign-to'];
    let generateHtml = '';
    let initials;
    let contactsArray = loadedContacts;

    for (let j = 0; j < fullNames.length; j++) {
        let fullName = fullNames[j]['name'];
        let contactIndex = contactsArray.findIndex(contact => contact.name === fullName);
        initials = fullName.split(" ");
        console.log(contactsArray[j].name);
        console.log(contactsArray[j].email);
        console.log(contactsArray[j].color);
        if (contactsArray[contactIndex].color) {
            let matchingColor = contactsArray[contactIndex].color;
            console.log(contactIndex);
            generateHtml += `
            <div id="overview-contact">
                <p class="overview-in" style= 'border-radius : 50%;   height: 42px; display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                width: 42px; background-color : ${matchingColor}' ">${initials[0] ? initials[0].charAt(0) : ''}${initials[1] ? initials[1].charAt(0) : ''}</p>
                <p id="overview-fullname">${fullName}</p>
            </div>
            `;
        } else {
            let matchingColor = 'black'
        
            
            generateHtml += `
        <div id="overview-contact">
            <p class="overview-in" style= 'border-radius : 50%;   height: 42px; display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            width: 42px; background-color : ${matchingColor}' ">${initials[0] ? initials[0].charAt(0) : ''}${initials[1] ? initials[1].charAt(0) : ''}</p>
            <p id="overview-fullname">${fullName}</p>
        </div>
        `;
        }
    }
    return generateHtml;
}

function generateSubtasks(id) {
    let task = tasks.find(task => task.id === id);
    let subArray = task['subtasks'];
    let finishedSubtasksArray = task['finishedSubtasks'];
    let generateHtml = '';

    for (let j = 0; j < subArray.length; j++) {
        let subtask = subArray[j];
        generateHtml += `
        <div class="subtask">
            <input id="subtask-checkbox-${j}" type="checkbox" ${finishedSubtasksArray.includes(subtask) ? `checked` : ''} onclick="finishedSubtask(${task.id}, ${j})">
            <p id="subtask-text">${subtask}</p>
        </div>
        `;
    }
    return generateHtml;
}

async function finishedSubtask(id, j) {
    let task = tasks.find(task => task.id === id);
    let subArray = task['subtasks'];
    let subtask = subArray[j];
    let finishedSubtasksArray = task['finishedSubtasks'];
    let checkbox = document.getElementById(`subtask-checkbox-${j}`)
    if (checkbox.checked) {
        finishedSubtasksArray.push(subtask)
    } else if (!checkbox.checked) {
        let index = finishedSubtasksArray.indexOf(subtask);
        if (index !== -1) {
            finishedSubtasksArray.splice(index, 1);
        }
    }
    await setItem('tasks', JSON.stringify(tasks));
    updateHTML();
}

async function deleteTask(id) {
    let taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        // Die Aufgabe wurde gefunden, jetzt kannst du sie löschen
        tasks.splice(taskIndex, 1);
    }
    await setItem('tasks', JSON.stringify(tasks));
    closeTaskOverview();
    updateHTML();
}


function generateEditCard(task) {
    let title = task['title'];
    let date = task['date'];
    let description = task['description'];
    let subArrayLength = task['subtasks'].length;
    let subtasks = task['subtasks'];
    let assignToArray = task['assign-to'];
    let editCard = document.getElementById('task-big-view-edit-card');
    editCard.innerHTML = generateEditTaskHTMLTemplate(task);
    let titleInput = document.getElementById('overview-edit-title-input');
    let descriptionArea = document.getElementById('description-overview-edit');
    let dueDateInput = document.getElementById('due-date-edit');
    let contactsList = document.getElementById('list-item');
    let addedContacts = document.getElementById('added-contacts');
    let subtaskList = document.getElementById('list-item-subtasks');
    titleInput.value = title;
    descriptionArea.value = description;
    dueDateInput.value = date;
    for (let j = 0; j < subtasks.length; j++) {
        const subtask = subtasks[j];
        subtaskList.innerHTML += `
        <li class="subtaskItem">
            <div id="editableText" class="li-element flex space-between align-center">
                <p>${subtask}</p>
                <div id="edit-delete-icons" class="edit-delete-icons flex">
                    <img onclick="editSubtask(event, ${j})" id="subtasks-edit" class="subtasks-edit" src="./img/edit-subtask.svg" alt="Edit">
                    <img onclick="clearSubtask(event)" id="subtasks-delete" class="subtasks-delete" src="./img/delete-subtask.svg" alt="Delete">
                </div>
            </div>
        </li>
        `;
        subtasksArray.push(subtask);
    }

    getContacts();

    for (let j = 0; j < assignToArray.length; j++) {
        if (assignToArray.length > 0) {
            document.querySelector('.task-subtasks').style.marginTop = '40px';
        }
        let assignTo = assignToArray[j];
        let splittedLetters = assignTo.split(" ");
        addedContacts.innerHTML += `
            <div class="circle">${splittedLetters[0] ? splittedLetters[0].charAt(0) : ''}${splittedLetters[1] ? splittedLetters[1].charAt(0) : ''}</div>
        `;
        checkedContacts.push(assignTo);
    }
}

async function saveEditChanges(id) {
    let task = tasks.find(task => task.id === id);

    let titleEdit = document.getElementById('overview-edit-title-input').value;
    let descriptionArea = document.getElementById('description-overview-edit').value;
    let dueDateInput = document.getElementById('due-date-edit').value;
    task.title = titleEdit;
    task.description = descriptionArea;
    task.duDate = dueDateInput;
    task['assign-to'] = checkedContacts;
    task['subtasks'] = subtasksArray;
    await setItem('tasks', JSON.stringify(tasks));
    clearArrays();
}

function clearArrays() {
    checkedContacts = [];
    subtasksArray = [];
}
