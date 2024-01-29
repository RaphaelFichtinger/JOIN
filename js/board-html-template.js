function returnTask() {
	return `
	<div id="add-task" class="add_task flex-column">
		<h1>Add Task</h1>
		<form onsubmit="createNewTask(); return false">
			<div class="form-container flex">
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
						<input onclick="openOverlay(event, 'categories-list')" id="category" type="text" placeholder="Select task category" readonly>
						<img onclick="openOverlay(event, 'categories-list')" class="dropdown" src="./img/arrow_dropdown.svg" alt="arrow dropdown">
						<div id="categories-list" class="categories-list">
							<div id="list-item-category" class="list-item-category"></div>
						</div>
					</div>
					<div id="task-assigned-to" class="task-input task-assigned-to">
						<label for="assign-to">Assign to</label>
						<input onclick="openOverlay(event, 'contacts-list-mobile')" id="assign-to" type="text" placeholder="Select contacts to assign" readonly>
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
			<div class="buttons-bottom">
				<button class="button1" onclick="clearFields()" formnovalidate>Clear</button>
				<button class="button2">Create task</button>
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