function sidebarTemplate() {
	return `
	<img class="logo-sidebar" src="./img/sidebar_logo.png" alt="Logo">
	<div class="side-menu">
		<a href="./summary.html" class="navi">
			<img src="./img/summary.svg" alt="summary">
			<p>Summary</p>
		</a>
		<a href="./add_tasks.html" class="navi">
			<img src="./img/add-task.svg" alt="summary">
			<p>Add task</p>
		</a>
		<a href="board.html" class="navi">
			<img src="./img/board.svg" alt="summary">
			<p>Board</p>
		</a>
		<a href="./contacts.html" class="navi">
			<img src="./img/contacts.svg" alt="summary">
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
			<img src="./img/board.svg" alt="summary">
			<p>Board</p>
		</a>
		<a href="./add_tasks.html" class="navi">
			<img src="./img/add-task.svg" alt="summary">
			<p>Add task</p>
		</a>
		<a href="./contacts.html" class="navi">
			<img src="./img/contacts.svg" alt="summary">
			<p>Contacts</p>
		</a>
	</div>
	`;
}