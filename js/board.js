

async function init() {
    tasks = JSON.parse(await getItem('tasks'));
    loadAddTask();
    await loadContacts();
    generateTaskCards();
}







function changeIcons() {
    let subtaskPlus = document.getElementById('subtasks-plus');
    let subtaskIcons = document.getElementById('image-click');

    subtaskPlus.classList.add('d-none');
    subtaskIcons.classList.remove('d-none');
    subtaskIcons.classList.add('flex');
}

function openAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'block'
}

function closeAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'none'
}

function openTaskOverview() {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'flex';
}

function closeTaskOverview() {
    let overview = document.getElementById('overview-container');
    overview.style.display = 'none';
}

function editTaskOverview() {
    let overviewCard = document.getElementById('task-big-view-card');
    overviewCard.style.display = 'none';
}

function generateTaskCards() {
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i]['title'];
        let category = tasks[i]['category'];
        let fullName = tasks[i]['assign-to'];
        let description = tasks[i]['description'];
        
        // Call the getInitials function to get the initials
        let initials = getInitials(fullName);

        // Rest of your code...

        let toDoColumn = document.getElementById('to-do');
        toDoColumn.innerHTML += `<div id="task-card" class="task-card" onclick="openTaskOverview()">
    <button class="task-type">${category}</button>
    <div class="task-text">
        <p id="task-title">${title}</p>
        <p id="task-details">${description}</p>
    </div>
    <div class="subtasks">
        <div class="progress-container">
            <div class="progress-bar" style="width: 0%;"></div>
        </div>
        <div>
            <p>0/2 Subtasks</p>
        </div>

    </div>
    <div class="task-card-bottom">
        <div id="initials">
            <p id="initials-circle-1">${initials}</p>
        </div>
        <div>
            <img id="priority-image-small" src="/img/prio-baia.svg">
        </div>
    </div>
</div>
</div>
</div>
<div class="board-column">`;
    }
}

function getInitials(fullName) {
    // Check if fullName is an array and has at least one element
    if (Array.isArray(fullName) && fullName.length > 0) {
        // Extract the first element of the array
        fullName = fullName[0];
    } else {
        console.error('Invalid fullName:', fullName);
        return ''; // or handle the error in a way that makes sense for your application
    }

    // Split den vollen Namen in Vor- und Nachnamen
    const names = fullName.split(' ');

    // Initialen erstellen
    const initials = names.map(name => name.charAt(0));

    // Die Initialen zu einem String verbinden und in Großbuchstaben umwandeln
    return initials.join('').toUpperCase();
}

function openOverlay(event, listId) {
    event.stopPropagation(event);
    let overlayList = document.getElementById(`${listId}`);
    overlayList.classList.toggle('active');
}



