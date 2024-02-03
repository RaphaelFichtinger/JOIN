async function renderBoard() {
    await loadTasks();
    await loadContacts();
    updateHTML();
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
    // Call the getInitials function to get the initials
    let fullNames = element['assign-to'];
    let subtasks = element['subtasks'];
    let finishedSubtasks = element['finishedSubtasks'];
    let additionalContacs = document.getElementById('additoinalContacts');
    let progress = 0;

    if (finishedSubtasks && finishedSubtasks.length > 0) {
        progress = (finishedSubtasks.length / subtasks.length) * 100;
    }
    let initials = '';
    

    for (let f = 0; f < fullNames.length; f++) {
        let fullName = fullNames[f];
        let nameInitials = getInitials(fullName);
        let fullnamesTotalShown = fullNames.length - 3;
        initials += `<p id="initials-circle-${index}-${f}" class="initials-circle">${nameInitials}</p>`;
        
    }

    return `
    <div id="task-card-${index}" class="task-card" draggable="true" ondragstart="startDragging(${element['id']})" onclick="openTaskOverview(${index}, ${element['id']})">
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
                <p>0/${element['subtasks'].length} Subtasks</p>
            </div>
        </div>
        <div class="task-card-bottom">
            <div id="initials">
                ${initials}
            </div>
            <div id="additionalContacs"></div>
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

function openAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.innerHTML = returnTask();
    popup.style.display = 'block';
    getCategories();
    getContacts();
}

function closeAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'none';
}

function openTaskOverview(i, id) {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'flex';
    createOverview(i, id);
}

function closeTaskOverview() {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'none';
    // finishedSubtask(i, j);
}

function editTaskOverview(i) {
    let overviewCard = document.getElementById('task-big-view-card');
    let overviewEdit = document.getElementById('task-big-view-edit-card');
    overviewCard.style.display = 'none';
    overviewEdit.style.display = 'block';
    generateEditCard(i);
}

function getInitials(name) {
    if (name) {
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

function createOverview(i, id) {
    let title = tasks[i]['title'];
    let date = tasks[i]['date'];
    let category = tasks[i]['category'];
    let description = tasks[i]['description'];
    let subArrayLength = tasks[i]['subtasks'].length;
    let priority = tasks[i]['priority'];
    let overviewCard = document.getElementById('task-big-view-card');
    generateAssignTo(i);
    overviewCard.innerHTML = createOverviewHTMLTemplate(category, title, description, date, priority, i)
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
    let finishedSubtasksArray = tasks[i]['finishedSubtasks'];
    let generateHtml = '';

    for (let j = 0; j < subArray.length; j++) {
        let subtask = subArray[j];
        generateHtml += `
        <div class="subtask">
            <input id="subtask-checkbox-${j}" type="checkbox" ${finishedSubtasksArray.includes(subtask) ? `checked` : ''} onclick="finishedSubtask(${i}, ${j})">
            <p id="subtask-text">${subtask}</p>
        </div>
        `;
    }
    return generateHtml;
}

async function finishedSubtask(i, j) {
    let subArray = tasks[i]['subtasks'];
    let subtask = subArray[j];
    let finishedSubtasksArray = tasks[i]['finishedSubtasks'];
    let checkbox = document.getElementById(`subtask-checkbox-${j}`)
    if (checkbox.checked) {
        finishedSubtasksArray.push(subtask)
    } else if(!checkbox.checked) {
        let index = finishedSubtasksArray.indexOf(subtask);
        if (index !== -1) {
            finishedSubtasksArray.splice(index, 1);
        }
    }
    await setItem('tasks', JSON.stringify(tasks));
    generateTodoHTML()
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
    editCard.innerHTML =generateEditTaskHTMLTemplate();
    let titleInput = document.getElementById('overview-edit-title-input');
    let descriptionArea = document.getElementById('description-overview-edit');
    let dueDateInput = document.getElementById('due-date-edit');
    let subtaskList = document.getElementById('list-item-subtasks');
    titleInput.value = title;
    descriptionArea.value = description;
    dueDateInput.value = date;
    console.log(subtasks);
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
    }
}

function fillProgressBar() {

}