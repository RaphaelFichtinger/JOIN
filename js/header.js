function headerTemplate() {
	let splittedLoginPerson = logedInPerson.split(" ");
	return `
	<div id="header-left">
		<div id="text-top">Kanban Project Management Tool</div>
	</div>
	<div id="header-right">
		<div id="help-icon"><img src="./img/help.svg" alt="Help"></div>
		<div id="cycle-name">
			<p id="initial-of-current-person">${splittedLoginPerson[0] ? splittedLoginPerson[0].charAt(0) : ''}${splittedLoginPerson[1] ? splittedLoginPerson[1].charAt(0) : ''}</p>
		</div>
	</div>
	`;
}