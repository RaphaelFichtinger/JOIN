



function loadAddTask() {
    let popup = document.getElementById('add-task-popup');
    popup.innerHTML += `<div id="add-task" class="add_task flex-column">
<div id="popup-top" class="popup-top">
<h1>Add Task</h1>
<a href="#" onclick="closeAddTaskPopup()">X</a>
</div>
<form onsubmit="createNewTask(); return false">
    <div class="flex">
        <div class="leftside flex-column">
            <div class="task-input task-title">
                <label for="title">Title*</label>
                <input id="title" type="text" placeholder="Enter a title" required>
            </div>
            <div class="task-input task-description">
                <label for="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="7" placeholder="Enter a Description"></textarea>
            </div>
            <div id="task-assigned-to" class="task-input task-assigned-to">
                <label for="assign-to">Assign to</label>
                <input onclick="openOverlay('contacts-list')" id="assign-to" type="text" placeholder="Select contacts to assign">
                <div id="contacts-list" class="contacts-list d-none">
                    <div id="list-item" class="list-item"></div>
                </div>
                <div id="added-contacts" class="flex"></div>
            </div>
        </div>
        <div class="rightside flex-column">
            <div class="task-input task-date">
                <label for="due-date">Due Date*</label>
                <input type="date" id="due-date" value="dd/mm/yyyy" required>
            </div>
            <div class="task-input task-prio">
                <label for="prio">Prio</label>
                <div class="buttons flex">
                    <div id="priority-alta" class="priority-alta priority-button" onclick="selectPriority('alta')">Urgent</div>
                    <div id="priority-medium" class="priority-medium priority-button medium" onclick="selectPriority('medium')">Medium</div>
                    <div id="priority-baia" class="priority-baia priority-button" onclick="selectPriority('baia')">Low</div>
                </div>
            </div>
            <div id="task-category" class="task-input task-category">
                <label for="category">Category*</label>
                <input onclick="openOverlay('categories-list')" id="category" type="text" placeholder="Select task category">
                <div id="categories-list" class="categories-list d-none">
                    <div id="list-item-category" class="list-item-category"></div>
                </div>
            </div>
            <div class="task-input task-subtasks">
                <label for="subtasks">Subtasks</label>
                <input onclick="changeIcons()" id="subtasks" type="text" placeholder="Add new Subtask">
                <div id="subtasks-list" class="subtasks-list">
                    <ul id="list-item-subtasks" class="list-item-subtasks"></ul>
                </div>
                <img id="subtasks-plus" class="subtasks-plus" src="./img/plus.svg" alt="">
                <div id="image-click" class="image-click d-none">
                    <img onclick="clearSubtask()" class="subtasks-clear" src="./img/clear.svg" alt="">
                    <img onclick="addSubtask()" class="subtasks-check" src="./img/check-blue.svg" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="buttons-bottom">
    <div><p>*This field is required</div>
    <div class="buttons-container-end">
        <button class="button1" onclick="clearFields()" formnovalidate>Clear</button>
        <button class="button2">Create task</button>
        </div>
    </div>
</form>
</div>`;
}

function openAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'block'
}

function closeAddTaskPopup() {
    let popup = document.getElementById('add-task-popup');
    popup.style.display = 'none'
}

function createTaskCard() {

    let taskCard = document.getElementById('task-card');
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i]['title'];
        let category = tasks[i]['category'];
        let fullName = tasks[i]['assign-to'];

        // Überprüfen, ob 'assign-to' einen Wert hat und ob es ein String oder ein Array mit genau einem Element ist
        if (fullName && (typeof fullName === 'string' || (Array.isArray(fullName) && fullName.length === 1))) {
            let [fName, lName] = Array.isArray(fullName) ? fullName[0].split(' ') : fullName.split(' ');
            let fNameInitial = fName ? fName.charAt(0) : '';
            let lNameInitial = lName ? lName.charAt(0) : '';

            console.log('Title:', title);
            console.log('Category:', category);
            console.log('First Name Initial:', fNameInitial);
            console.log('Last Name Initial:', lNameInitial);
        } else {
            console.error('Ungültiger Wert für assign-to:', fullName);
        }
    }
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