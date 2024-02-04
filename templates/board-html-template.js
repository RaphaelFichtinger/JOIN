function returnTask() {
	return `
	<div id="add-task" class="add_task flex-column">
        <div class="flex align-center">
            <h1>Add Task</h1>
            <img onclick="closeAddTaskPopup()" class="close" src="./img/close.png">
        </div>
		<form onsubmit="createNewTask(); return false">
			<div class="form-container flex">
				<div class="leftside flex-column">
					<div class="task-input task-title">
						<label for="title">Title<span class="required-fields">*</span></label>
						<input id="title" type="text" placeholder="Enter a title" required>
					</div>
					<div class="task-input task-description">
						<label for="description">Description</label>
						<textarea name="description" id="description" cols="30" rows="7" placeholder="Enter a Description"></textarea>
					</div>
					<div class="task-input task-prio">
						<label for="prio">Prio</label>
						<div class="buttons flex">
							<div id="priority-alta-mobile" class="priority-alta priority-button" onclick="selectPriority('alta-mobile')">Urgent</div>
							<div id="priority-medium-mobile" class="priority-medium priority-button medium" onclick="selectPriority('medium-mobile')">Medium</div>
							<div id="priority-baia-mobile" class="priority-baia priority-button" onclick="selectPriority('baia-mobile')">Low</div>
						</div>
					</div>
					<div class="task-input task-assigned-to">
						<label for="assign-to">Assign to</label>
						<input onclick="openOverlay(event, 'contacts-list')" id="assign-to" type="text" placeholder="Select contacts to assign" readonly>
						<img onclick="openOverlay(event, 'contacts-list')" class="dropdown" src="./img/arrow_dropdown.svg" alt="arrow dropdown" tabindex="0">
						<div id="contacts-list" class="contacts-list">
							<div id="list-item" class="list-item"></div>
						</div>
						<div id="added-contacts" class="flex"></div>
					</div>
				</div>
				<div class="rightside flex-column">
					<div class="task-input task-date">
						<label for="due-date">Due Date<span class="required-fields">*</span></label>
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
						<label for="category">Category<span class="required-fields">*</span></label>
						<input onclick="openOverlay(event, 'categories-list')" id="category" type="text" placeholder="Select task category" required readonly>
						<img onclick="openOverlay(event, 'categories-list')" class="dropdown" src="./img/arrow_dropdown.svg" alt="arrow dropdown">
						<div id="categories-list" class="categories-list">
							<div id="list-item-category" class="list-item-category"></div>
						</div>
					</div>
					<div class="task-input task-assigned-to">
						<label for="assign-to-mobile">Assign to</label>
						<input onclick="openOverlay(event, 'contacts-list-mobile')" id="assign-to-mobile" type="text" placeholder="Select contacts to assign" readonly>
						<img onclick="openOverlay(event, 'contacts-list-mobile')" class="dropdown" src="./img/arrow_dropdown.svg" alt="arrow dropdown" tabindex="0">
						<div id="contacts-list-mobile" class="contacts-list">
							<div id="list-item-mobile" class="list-item"></div>
						</div>
						<div id="added-contacts-mobile" class="flex"></div>
					</div>
					<div class="task-input task-subtasks">
						<label for="subtasks">Subtasks</label>
						<input onclick="changeIcons()" id="subtasks" type="text" placeholder="Add new Subtask">
						<div id="subtasks-list" class="subtasks-list">
							<ul id="list-item-subtasks" class="list-item-subtasks"></ul>
						</div>
						<img id="subtasks-plus" class="subtasks-plus" src="./img/plus.svg" alt="">
						<div id="image-click" class="image-click d-none">
							<img onclick="clearSubtaskInput()" class="subtasks-clear" src="./img/clear.svg" alt="">
							<img onclick="addSubtask()" class="subtasks-check" src="./img/check-blue.svg" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="buttons-bottom flex align-center space-between">
				<div class="required-text">
					<p>This fields are required<span class="required-fields">*</span></p>
				</div>
				<div class="flex buttons">
					<button class="button1" onclick="clearFields()" formnovalidate>Clear</button>
					<button id="button-create-task" class="button2" disabled>Create task</button>
				</div>
			</div>
		</form>
		<div id="success-lightbox" class="success-lightbox flex align-center justify-center">
            <div id="success" class="success flex">
                <button>Task added to board</button>
            </div>
        </div>
	</div>
	`;
}

function createOverviewHTMLTemplate(category, title, description, date, priority, task){
	return `
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
        ${generateAssignTo(task.id)}
    </div>
    <div class="subtasks-overview">
        <p>Subtasks</p>
        ${generateSubtasks(task.id)}
    </div>
    <div class="overview-bottom-buttons">
    <button class="delete-overview" onclick="deleteTask(${task.id})">
        <img src="./img/delete-subtask.svg">
        <p>Delete</p>
    </button>
    <button class="edit-overview" onclick="editTaskOverview(${task.id})">
        <img src="./img/edit-subtask.svg">
        <p>Edit</p>
    </button>
    </div>
    `;
}

function generateEditTaskHTMLTemplate() {
	return `
    <form onsubmit="">
    <div class="main-edit-card">
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
            <ul id="list-item-subtasks" class="list-item-subtasks list-height"></ul>
        </div>
        <img id="subtasks-plus" class="subtasks-plus" src="./img/plus.svg" alt="">
        <div id="image-click" class="image-click d-none">
            <img onclick="clearSubtaskInput()" class="subtasks-clear" src="./img/clear.svg" alt="">
            <img onclick="addSubtask()" class="subtasks-check" src="./img/check-blue.svg" alt="">
        </div>
    </div>
</div>
    <div class="edit-ok-button">
        <button class="edit-ok-button-btn">OK <img src="./img/check.png" alt=""></button>
    </div>
</form>`




}