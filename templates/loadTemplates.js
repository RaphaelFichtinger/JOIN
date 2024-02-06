async function renderTemplates() {
	document.getElementById('header').innerHTML = await headerTemplate();
	document.getElementById('sidebar').innerHTML = await sidebarTemplate();
	document.getElementById('sidebar-mobile').innerHTML = await sidebarTemplateMobile();

	if(window.location.href.includes('Privacy.html') || window.location.href.includes('legal_notice.html')) {
		document.querySelector('.side-menu').style.opacity = 0;
	}
}