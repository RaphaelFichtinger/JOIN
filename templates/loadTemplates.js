function renderTemplates() {
	document.getElementById('header').innerHTML = headerTemplate();
	document.getElementById('sidebar').innerHTML = sidebarTemplate();
	document.getElementById('header-mobile').innerHTML = headerTemplateMobile();
	document.getElementById('sidebar-mobile').innerHTML = sidebarTemplateMobile();
}