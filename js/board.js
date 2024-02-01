async function renderBoard() {
    await loadTasks();
    await loadContacts();
    updateHTML();
}

document.querySelector('.input-board-top').addEventListener('input', function() {
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
    // Call the getInitials function to get the initials
    let fullName = element['assign-to'];
    let initials = getInitials(fullName);
    return `
    <div id="task-card-${index}" class="task-card" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTaskOverview(${index}, ${element['id']})">
        <button class="task-type">${element['category']}</button>
        <div class="task-text">
            <p id="task-title">${element['title']}</p>
            <p id="task-details">${element['description']}</p>
        </div>
        <div class="subtasks">
            <div class="progress-container">
                <div class="progress-bar" style="width: 0%;"></div>
            </div>
            <div>
                <p>0/${element['subtasks'].length} Subtasks</p>
            </div>
        </div>
        <div class="task-card-bottom">
            <div id="initials">
                <p id="initials-circle-1">${initials}</p>
            </div>
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

function openAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.innerHTML = returnTask();
    popup.style.display = 'block'
    getCategories();
	getContacts();
}

function closeAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'none'
}

function openTaskOverview(i, id) {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'flex';
    createOverview(i, id);
}

function closeTaskOverview() {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'none';
}

function editTaskOverview(i) {
    let overviewCard = document.getElementById('task-big-view-card');
    let overviewEdit = document.getElementById('task-big-view-edit-card');
    overviewCard.style.display = 'none';
    overviewEdit.style.display = 'block';
    generateEditCard(i);
}

function getInitials(fullName) {
    // Check if fullName is an array and has at least one element
    if (Array.isArray(fullName) && fullName.length > 0) {
        // Extract the first element of the array
        fullName = fullName[0];
    } else {
        return ''; // or handle the error in a way that makes sense for your application
    }

    // Split den vollen Namen in Vor- und Nachnamen
    const names = fullName.split(' ');

    // Initialen erstellen
    const initials = names.map(name => name.charAt(0));

    // Die Initialen zu einem String verbinden und in Großbuchstaben umwandeln
    return initials.join('').toUpperCase();
}

async function clearTasks() {
    let tasks = [];
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('nextTaskId', JSON.stringify(nextTaskId));
    updateHTML();
}

function createOverview(i, id) {
    let title = tasks[i]['title'];
    let date = tasks[i]['date'];
    let category = tasks[i]['category'];
    let description = tasks[i]['description'];
    let subArrayLength = tasks[i]['subtasks'].length;
    let priority = tasks[i]['priority'];
    let overviewCard = document.getElementById('task-big-view-card');

    generateAssignTo(i);

    overviewCard.innerHTML = `
    <div class="type-close">
        <button class="task-type task-type-overview">${category}</button>
        <img onclick="closeTaskOverview()" src="./img/close.png">
    </div>
    <div id="overview-card-top">
        <p id="overview-title">${title}</p>
        <p id="overview-details">${description}</p>
        <div class="overview-date">
            <p>Due date: </p>
            <p>${date.replace(/-/g, '/')}</p>
        </div>
        <div class="overview-priority">
            <p>Priority:</p>
            <p>${priority ? `${priority} <img src="./img/prio-${priority}.svg">` : 'No priority'}</p>
        </div>
    </div>
    <div id="assigned-to-overview" class="assigned-to-overview">
        <p>Assigned To:</p>
        ${generateAssignTo(i)}
    </div>
    <div class="subtasks-overview">
        <p>Subtasks</p>
        ${generateSubtasks(i)}
    </div>
    <div class="overview-bottom-buttons">
        <button class="delete-overview" onclick="deleteTask(${i})">
            <img src="./img/delete-subtask.svg">
            <p>Delete</p>
        </button>
        <button class="edit-overview" onclick="editTaskOverview(${i})">
            <img src="./img/edit-subtask.svg">
            <p>Edit</p>
        </button>
    </div>
    `;
}

function generateAssignTo(i) {
    let fullNames = tasks[i]['assign-to'];
    let generateHtml = '';
    let initials;

    for (let j = 0; j < fullNames.length; j++) {
        let fullName = fullNames[j];
        initials = fullName.split(" ");
        generateHtml += `
        <div id="overview-contact">
            <p id="overview-initials">${initials[0] ? initials[0].charAt(0) : ''}${initials[1] ? initials[1].charAt(0) : ''}</p>
            <p id="overview-fullname">${fullName}</p>
        </div>
        `;
    }
    return generateHtml;
}

function generateSubtasks(i) {
    let subArray = tasks[i]['subtasks'];
    let generateHtml = '';

    for (let j = 0; j < subArray.length; j++) {
        let subtask = subArray[j];
        generateHtml += `
        <div class="subtask">
            <input id="subtask-checkbox-${j}" type="checkbox" onclick="finishedSubtask(${i}, ${j})">
            <p id="subtask-text">${subtask}</p>
        </div>
        `;
    }
    return generateHtml;
}

async function finishedSubtask(i, j) {
    let subArray = tasks[i]['subtasks'];
    let subtask = subArray[j];
    let checkbox = document.getElementById(`subtask-checkbox-${j}`)
    if(checkbox.checked) {
        finishedSubtasks.push(subtask)
        await setItem('tasks', JSON.stringify(tasks));
    }
}

async function deleteTask(i) {
    tasks.splice(i, 1);
    await setItem('tasks', JSON.stringify(tasks));
    closeTaskOverview();
    updateHTML();
}

function generateEditCard(i) {
    let title = tasks[i]['title'];
    let date = tasks[i]['date'];
    let description = tasks[i]['description'];
    let subArrayLength = tasks[i]['subtasks'].length;
    let subtasks = tasks[i]['subtasks'];
    let editCard = document.getElementById('task-big-view-edit-card');
    editCard.innerHTML = `
    <form onsubmit="">
    <div id="overview-edit-top">
        <p id="overview-edit-title">Title</p>
        <input id="overview-edit-title-input" required placeholder="Enter a title" type="text" value="Kochwelt Page & Recipe Recommender">
    </div>
    <div class="overview-edit-description">
        <p>Description</p>
        <textarea name="description" id="description-overview-edit" cols="30" rows="5"></textarea>
    </div>
    <div class="due-date-overview-edit overview-edit-description">
        <p>Due date</p>
        <input required id="due-date-edit" type="date">
    </div>
    <div class="overview-edit-description">
        <p class="priority-overview-edit">Priority</p>
        <div class="priority-edit-buttons">
            <div class="task-input task-prio-overview-edit">
                
                <div class="buttons flex task-prio-overview-edit">
                    <div id="priority-alta" class="priority-alta priority-button" onclick="selectPriority('alta')">Urgent</div>
                    <div id="priority-medium" class="priority-medium priority-button medium" onclick="selectPriority('medium')">Medium</div>
                    <div id="priority-baia" class="priority-baia priority-button" onclick="selectPriority('baia')">Low</div>
                </div>
            </div>
        </div>

    </div>
    <div class="assigned-to-overview-edit  margin-top">
        <div id="task-assigned-to" class="task-input task-assigned-to">
            <label for="assign-to">Assign to</label>
            <input onclick="openOverlay('contacts-list')" id="assign-to-edit" type="text" placeholder="Select contacts to assign">
            <div id="contacts-list" class="contacts-list d-none">
                <div id="list-item" class="list-item"></div>
            </div>
            <div id="added-contacts" class="flex"></div>
        </div>
    </div>
    <div class="task-input task-subtasks margin-top">
        <label for="subtasks">Subtasks</label>
        <input onclick="changeIcons()" id="subtasks" type="text" placeholder="Add new Subtask">
        <div id="subtasks-list" class="subtasks-list">
            
        </div>
        <img id="subtasks-plus" class="subtasks-plus" src="./img/plus.svg" alt="">
        <div id="image-click" class="image-click d-none">
            <img onclick="clearSubtaskInput()" class="subtasks-clear" src="./img/clear.svg" alt="">
            <img onclick="addSubtask()" class="subtasks-check" src="./img/check-blue.svg" alt="">
        </div>
    </div>
    <div class="edit-ok-button">
        <button class="edit-ok-button-btn">OK <img src="./img/check.png" alt=""></button>
    </div>
</form>`;
let titleInput = document.getElementById('overview-edit-title-input');
let descriptionArea = document.getElementById('description-overview-edit');
let dueDateInput = document.getElementById('due-date-edit');
let subtaskList = document.getElementById('list-item-subtasks');
titleInput.value = title;
descriptionArea.value = description;
dueDateInput.value = date;
console.log(subtasks);
for (let j = 0; j < subtasks.length; j++) {
    let subtask = subtasks[j];
    subtaskList.innerHTML += `<li>${subtask}</li>`;
}
}