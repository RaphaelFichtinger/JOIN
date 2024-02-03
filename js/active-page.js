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