function sidebarTemplate() {
	return `
	<img class="logo-sidebar" src="./img/sidebar_logo.png" alt="Logo">
	<div class="side-menu">
		<a id="summary"  href="./summary.html" class="navi">
			<img src="./img/summary.svg" alt="summary">
			<p>Summary</p>
		</a>
		<a id="add-task" href="./add_tasks.html" class="navi">
			<img src="./img/add-task.svg" alt="add task">
			<p>Add task</p>
		</a>
		<a id="board"  href="board.html" class="navi">
			<img src="./img/board.svg" alt="board">
			<p>Board</p>
		</a>
		<a id="contacts" href="./contacts.html" class="navi">
			<img src="./img/contacts.svg" alt="contacts">
			<p>Contacts</p>
		</a>
	</div>
	<div class="privacy-text">
	<a href="./Privacy.html" class="info-text">Privacy Policy</a>
		<a href="./legal_notice.html" class="info-text">Legal Notice</a>
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

// function selectSidebar() {
// 	const currentPage = window.location.pathname;
	
// 	// Mapping von Seitenpfaden zu zugehörigen IDs
// 	const idMappings = {
// 	  './summary.html': ['summary'],
// 	  './board.html': ['board'],
// 	  './add_task.html': ['add-task'],
// 	  './contacts.html': ['contacts'],
// 	};

// 	const ids = idMappings[currentPage];

// 	if (ids) {
// 	  ids.forEach(id => {
// 		const sidebarItem = document.getElementById(id);

// 		if (sidebarItem) {
// 		  sidebarItem.classList.add('active');
// 		  const firstChild = sidebarItem.children[0];
// 		  if (firstChild) {
// 			firstChild.classList.add('active');
// 		  }
// 		}
// 	  });
// 	}
//   }