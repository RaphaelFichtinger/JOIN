
let initialsHeader = document.getElementById('initial-of-current-person');

let splittedLoginPerson = logedInPerson.split(" ");
initialsHeader.innerHTML = '';
initialsHeader.innerHTML = `
${splittedLoginPerson[0] ? splittedLoginPerson[0].charAt(0) : ''}
${splittedLoginPerson[1] ? splittedLoginPerson[1].charAt(0) : ''}
`;