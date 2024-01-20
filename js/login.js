function login() {
	let email = document.getElementById('input-email');
	let password = document.getElementById('input-password');

	for (let i = 0; i < signedUpUsers.length; i++) {
		let signedUpUser = signedUpUsers[i];
		console.log(signedUpUser);

		if(email.value == signedUpUser.email && password.value == signedUpUser.password) {
			window.location.href = './summary.html';
			return;
		}
	}

	resetForm(email, password)

	showError();
}

async function resetForm(email, password) {
	email.value = '';
	password.value = '';
}

function showError() {
	let noLogedIn = document.getElementById('error-info');
	noLogedIn.innerHTML = 'Du bist nicht angemeldet.';
}