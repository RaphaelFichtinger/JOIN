async function renderSummary() {
	let priorityVariable = 0;
	let toDOVariable = 0;
	let taskInBoard = document.getElementById('task-in-board');
	let toDo = document.getElementById('to-do');
	await loadTasks();

	taskInBoard.innerHTML = tasks.length;

	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];
		console.log(task);
		let priority = task['priority'];
		let status = task['status'];
		if(priority === 'Urgent') {
			let urgentHeading = document.getElementById('urgent-heading');
			priorityVariable++
			urgentHeading.innerHTML = priorityVariable;
		}
		if(status === 'to do') {
			toDOVariable++;
			toDo.innerHTML = toDOVariable;
		}
		getDateFromInput();
	}
}

function getDateFromInput() {
	// Das ursprüngliche Datum vom Input-Feld
	var inputDatum = "2024-01-27";

	// Datum in ein JavaScript Date-Objekt umwandeln
	var datumObjekt = new Date(inputDatum);

	// Gewünschtes Datumsformat erstellen
	var tag = datumObjekt.getDate();
	var monat = datumObjekt.getMonth() + 1; // Beachte: Monate beginnen bei 0
	var jahr = datumObjekt.getFullYear();

	// Nullen vor einzelnen Ziffern hinzufügen
	monat = monat < 10 ? '0' + monat : monat;
	tag = tag < 10 ? '0' + tag : tag;

	// Das Datum im gewünschten Format ausgeben
	var gewuenschtesDatum = tag + '.' + monat + '.' + jahr;
	console.log(gewuenschtesDatum);
}