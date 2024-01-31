function headerTemplate() {
	return `
	<div id="header-left">
		<div id="text-top">Kanban Project Management Tool</div>
	</div>
	<div id="header-right">
		<div id="help-icon"><img src="./img/help.svg" alt="Help"></div>
		<div id="cycle-name">
			<p id="initial-of-current-person">TE</p>
		</div>
	</div>
	`;
}

function headerTemplateMobile() {

return `<img id="logo-header-mobile" src="./img/start_logo.svg" alt="">
<div id="cycle-name-mobile"><p>TE</p></div>`;

}