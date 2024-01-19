function login() {
	let email = document.getElementById('input-email');
	let password = document.getElementById('input-password');

	for (let i = 0; i < signedUpUsers.length; i++) {
		let signedUpUser = signedUpUsers[i];

		if(email.value == signedUpUser.email && password.value == signedUpUser.password) {
			return console.log('Success');
		} else {
			console.log('Error');
		}
	}

	resetForm(email, password)
}

async function resetForm(email, password) {
	email.value = '';
	password.value = '';
}