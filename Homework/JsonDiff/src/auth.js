import { saveUser } from './storage.js';

export function setupLogin(onSuccess) {
    const loginSubmit = document.getElementById('loginSubmit');
    const loginInput = document.getElementById('loginInput');
    const loginError = document.getElementById('loginError');

    loginSubmit.addEventListener('click', () => {
        const name = loginInput.value.trim();
        if (!name) {
            loginError.textContent = 'Please enter a name';
            return;
        }
        saveUser(name);
        loginInput.value = '';
        loginError.textContent = '';
        onSuccess();
    });
}
