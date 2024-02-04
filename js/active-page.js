let currentLinkId = null;



function activePage() {
	currentLinkId = localStorage.getItem('active Page');
	linkId = JSON.parse(currentLinkId)

	document.getElementById(linkId).classList.add('active');
	currentLinkId = linkId;
	localStorage.setItem('active Page', JSON.stringify(currentLinkId));
}
