let prioritySummaryVariable = 0;
let toDoVariable = 0;
let doneVariable = 0;
let tasksInProgressVariable = 0;
let awaitingFeedbackVariable = 0;
let toDo = document.getElementById('to-do');
let done = document.getElementById('done');
let tasksInBoard = document.getElementById('tasks-in-board');
let tasksInProgress = document.getElementById('tasks-in-progress');
let awaitingFeedback = document.getElementById('awaiting-feedback');

let datesUrgent = [];
let urgentDate = document.getElementById('urgent-date');
let greeting = document.getElementById('greeting');

async function renderSummary() {
	document.getElementById('header').innerHTML = headerTemplate();
	await loadTasks();
	getGreeting();
	getLoginName();

	tasksInBoard.innerHTML = tasks.length;

	loopTasks();
	getDateFromInput();
}

function loopTasks() {
	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];
		let priority = task['priority'];
		if(priority === 'Urgent') {
			let urgentHeading = document.getElementById('urgent-heading');
			prioritySummaryVariable++
			urgentHeading.innerHTML = prioritySummaryVariable;

			datesUrgent.push(task['date'])
		}
		checkStatus(i);
	}
}

function checkStatus(i) {
	let task = tasks[i];
	let status = task['status'];

	if(status === 'to-do') {
		toDoVariable++;
		toDo.innerHTML = toDoVariable;
	} else if(status === 'done-tasks') {
		doneVariable++
		done.innerHTML = doneVariable;
	} else if(status === 'tasks-in-progress') {
		tasksInProgressVariable++
		tasksInProgress.innerHTML = tasksInProgressVariable;
	} else if(status === 'awaiting-feedback') {
		awaitingFeedbackVariable++
		awaitingFeedback.innerHTML = awaitingFeedbackVariable
	}
}

function getDateFromInput() {

	if(datesUrgent.length > 0) {
		let currentDate = new Date();

		// Funktion, um den Unterschied zwischen zwei Daten zu berechnen
		function dateDifferenceInDays(date1, date2) {
			const oneDay = 24 * 60 * 60 * 1000; // Stunden * Minuten * Sekunden * Millisekunden
			const diffInMilliseconds = Math.abs(date1 - date2);
			return Math.round(diffInMilliseconds / oneDay);
		}

		// Wandelt die Datums-Strings in Date-Objekte um
		let dateObjects = datesUrgent.map(function(dateString) {
			// Zerlege das Datum und erstelle ein Date-Objekt
			let dateParts = dateString.split("-");
			return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Monate in JavaScript sind 0-basiert, daher -1
		});

		// Finde das Datum im Array, das am nächsten zum aktuellen Datum ist
		let closestDate = dateObjects.reduce(function (prev, curr) {
			let prevDiff = dateDifferenceInDays(currentDate, prev);
			let currDiff = dateDifferenceInDays(currentDate, curr);
			return currDiff < prevDiff ? curr : prev;
		});

		// Formatieren und ausgeben
		let formattedDate = closestDate.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		urgentDate.innerHTML = formattedDate;
	} else {
		urgentDate.innerHTML = 'No urgent task!';
	}
}

function getGreeting() {
	let currentDate = new Date();
	let currentTime = currentDate.getHours();

	let greetingText;

	switch (true) {
		case currentTime >= 4 && currentTime < 12:
			greetingText = 'Good morning,';
			break;
		case currentTime >= 12 && currentTime < 17:
			greetingText = 'Good afternoon,';
			break;
		case currentTime >= 17 && currentTime < 23:
			greetingText = 'Good evening,';
			break;
		default:
			greetingText = 'Good night,';
	}
	greeting.textContent = greetingText;
}

function getLoginName() {
	if(logedInAsGuest) {
		document.getElementById('loged-in-person').textContent = logedInGuest;
	} else if(logedInWithName) {
		document.getElementById('loged-in-person').textContent = logedInPerson;
	}
}