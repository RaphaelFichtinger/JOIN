async function renderBoard() {
    await loadTasks();
    await loadContacts();
    // generateTaskCards();
    updateHTML();
}

function updateHTML() {
    // To do Table
    let tasksTodo = tasks.filter(t => t['status'] == 'to-do');

    document.getElementById('to-do').innerHTML = '';

    for (let index = 0; index < tasksTodo.length; index++) {
        const element = tasksTodo[index];
        document.getElementById('to-do').innerHTML += generateTodoHTML(element, index);
    }

    // In progress Table
    let tasksInProgress = tasks.filter(t => t['status'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let index = 0; index < tasksInProgress.length; index++) {
        const element = tasksInProgress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element, index);
    }

    // Await feedback Table
    let tasksAwaitFeedback = tasks.filter(t => t['status'] == 'await-feedback');

    document.getElementById('await-feedback').innerHTML = '';

    for (let index = 0; index < tasksAwaitFeedback.length; index++) {
        const element = tasksAwaitFeedback[index];
        document.getElementById('await-feedback').innerHTML += generateTodoHTML(element, index);
    }

    // Await feedback Table
    let tasksDone = tasks.filter(t => t['status'] == 'done-tasks');

    document.getElementById('done-tasks').innerHTML = '';

    for (let index = 0; index < tasksDone.length; index++) {
        const element = tasksDone[index];
        document.getElementById('done-tasks').innerHTML += generateTodoHTML(element, index);
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
    console.log(id);
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

function editTaskOverview() {
    let overviewCard = document.getElementById('task-big-view-card');
    let overviewEdit = document.getElementById('task-big-view-edit-card');
    overviewCard.style.display = 'none';
    overviewEdit.style.display = 'block';
}

// function generateTaskCards() {
//     let toDoColumn = document.getElementById('to-do');
//     for (let i = 0; i < tasks.length; i++) {
//         let title = tasks[i]['title'];
//         let category = tasks[i]['category'];
//         let fullName = tasks[i]['assign-to'];
//         let description = tasks[i]['description'];
//         let subArrayLength = tasks[i]['subtasks'].length;
//         let priority = tasks[i]['priority'];
        
        
        
//         // Call the getInitials function to get the initials
//         let initials = getInitials(fullName);        
//         toDoColumn.innerHTML += `<div id="task-card" class="task-card" onclick="openTaskOverview(${i})">
//     <button class="task-type">${category}</button>
//     <div class="task-text">
//         <p id="task-title">${title}</p>
//         <p id="task-details">${description}</p>
//     </div>
//     <div class="subtasks">
//         <div class="progress-container">
//             <div class="progress-bar" style="width: 0%;"></div>
//         </div>
//         <div>
//             <p>0/${subArrayLength} Subtasks</p>
//         </div>

//     </div>
//     <div class="task-card-bottom">
//         <div id="initials">
//             <p id="initials-circle-1">${initials}</p>
//         </div>
//         <div>
//         <img id="priority-image-small${i}" src="">
//         </div>
//     </div>
// </div>
// </div>
// </div>
// <div class="board-column">`;
// let priorityImage = document.getElementById(`priority-image-small${i}`);
//         if (priority == 'Low') {
//             priorityImage.src ="./img/prio-baia.svg"
//         } if (priority == 'Urgent') {
//             priorityImage.src ="./img/prio-alta.svg"
//         } if (priority == 'Medium') {
//             priorityImage.src ="./img/prio-media.svg"
//         }
//     }
// }

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

// function openOverlay(event, listId) {
//     event.stopPropagation(event);
//     let overlayList = document.getElementById(`${listId}`);
//     overlayList.classList.toggle('active');
// }

async function clearTasks() {
    let tasks = [];
    await setItem('tasks', JSON.stringify(tasks));
    await setItem('nextTaskId', JSON.stringify(nextTaskId));
    updateHTML();
}

function createOverview(i, id) {
    let title = tasks[i]['title'];
    let category = tasks[i]['category'];
    let fullName = tasks[i]['assign-to'];
    let description = tasks[i]['description'];
    let subArrayLength = tasks[i]['subtasks'].length;
    let priority = tasks[i]['priority'];
    let overviewCard = document.getElementById('task-big-view-card');

    overviewCard.innerHTML = `
    <div class="type-close">
        <button class="task-type task-type-overview">User Story</button>
        <img onclick="closeTaskOverview()" src="./img/close.png">
    </div>
    <div id="overview-card-top">
        <p id="overview-title">${title}</p>
        <p id="overview-details">${description}</p>
        <div class="overview-date">
            <p>Due date: </p>
            <p> 10/05/2023</p>
        </div>
        <div class="overview-date">
            <p>Priority:</p>
            <p>Medium</p>
            <img src="./img/prio-media.svg">
        </div>
    </div>
    <div class="assigned-to-overview">
        <p>Assigned To:</p>
        <div id="overview-contact">
            <p id="overview-initials">EM</p>
            <p id="overview-fullname">Emmanuel Mauer</p>
        </div>
        <div id="overview-contact">
            <p id="overview-initials">EM</p>
            <p id="overview-fullname">Emmanuel Mauer</p>
        </div>
    </div>
    <div class="subtasks-overview">
        <p>Subtasks</p>
        <div id="subtasks-checklist-overview">
            <div class="subtask">
                <input id="subtask-checkbox1" type="checkbox">
                <p id="subtask-text">Implement Recipe Recommendation</p>
            </div>
            <div class="subtask">
                <input id="subtask-checkbox2" type="checkbox">
                <p id="subtask-text">Start Page Layout</p>
            </div>
        </div>
    </div>
    <div class="overview-bottom-buttons">
        <button class="delete-overview border-right"><img src="./img/delete-subtask.svg"> Delete</button>
        <button class="delete-overview" onclick="editTaskOverview()"><img
                src="./img/edit-subtask.svg">Edit</button>

    </div>
    `;
}

