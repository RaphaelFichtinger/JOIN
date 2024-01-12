let tasks = [];

function createNewTask() {
	let title = document.getElementById('title');
	let description = document.getElementById('description');
	let assignTo = document.getElementById('assign-to');
	let dateDue = docuemnt.getElementById('date');
	let category = document.getElementById('category');
	let subtasks = document.getElementById('subtasks');

	tasks.push({
		'title': title.value,
		'description': description.value,
		'assign-to': assignTo.value,
		'date': dateDue.value,
		'category': category.value,
		'subtasks': subtasks.value
	})
}