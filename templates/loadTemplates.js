function renderTemplates() {
	document.getElementById('header').innerHTML = headerTemplate();
	document.getElementById('sidebar').innerHTML = sidebarTemplate();
	document.getElementById('sidebar-mobile').innerHTML = sidebarTemplateMobile();
}