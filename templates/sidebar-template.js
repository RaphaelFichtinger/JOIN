function sidebarTemplate() {
	return `
	<img class="logo-sidebar" src="./img/sidebar_logo.png" alt="Logo">
	<div class="side-menu">
		<a id="summary" onclick="activePage('summary')" href="./summary.html" class="navi">
			<img src="./img/summary.svg" alt="summary">
			<p>Summary</p>
		</a>
		<a id="add-task" onclick="activePage('add-task')" href="./add_tasks.html" class="navi">
			<img src="./img/add-task.svg" alt="add task">
			<p>Add task</p>
		</a>
		<a id="board" onclick="activePage('board')" href="board.html" class="navi">
			<img src="./img/board.svg" alt="board">
			<p>Board</p>
		</a>
		<a id="contacts" onclick="activePage('contacts')" href="./contacts.html" class="navi">
			<img src="./img/contacts.svg" alt="contacts">
			<p>Contacts</p>
		</a>
	</div>
	<div class="privacy-text">
	<a href="../Privacy.html" class="info-text">Privacy Policy</a>
		<a href="../legal_notice.html" class="info-text">Legal Notice</a>
	</div>
	`;
}

function sidebarTemplateMobile() {
	return `
	<div class="menu-mobile flex justify-center align-center">
		<a href="./summary.html" class="navi">
			<img src="./img/summary.svg" alt="summary">
			<p>Summary</p>
		</a>
		<a href="board.html" class="navi">
			<img src="./img/board.svg" alt="board">
			<p>Board</p>
		</a>
		<a href="./add_tasks.html" class="navi">
			<img src="./img/add-task.svg" alt="add task">
			<p>Add task</p>
		</a>
		<a href="./contacts.html" class="navi">
			<img src="./img/contacts.svg" alt="contacts">
			<p>Contacts</p>
		</a>
	</div>
	`;
}

let currentLinkId = null;

if(localStorage.getItem('active Page')) {
	currentLinkId = JSON.parse(localStorage.getItem('active Page'));
	restoreActivePage(); // Call the function on page load
}


function activePage(linkId) {
	if (currentLinkId) {
		document.getElementById(currentLinkId).classList.remove('active');
	}

	document.getElementById(linkId).classList.add('active');
	currentLinkId = linkId;
	localStorage.setItem('active Page', JSON.stringify(currentLinkId));
}

function restoreActivePage() {
	if (currentLinkId) {
	  activePage(currentLinkId);
	}
  }