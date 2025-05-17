const USER_KEY = 'jsonAppUser';

export function saveUser(name) {
    localStorage.setItem(USER_KEY, name);
}

export function getUser() {
    return localStorage.getItem(USER_KEY);
}

export function isLoggedIn() {
    return Boolean(getUser());
}

export function logout() {
    localStorage.removeItem(USER_KEY);
}
