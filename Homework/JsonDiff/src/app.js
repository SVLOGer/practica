import { isLoggedIn, getUser, logout } from './storage.js';
import { setupLogin } from './auth.js';
import { setupComparePage } from './compare.js';

const promoPage = document.getElementById('promoPage');
const loginPage = document.getElementById('loginPage');
const comparePage = document.getElementById('comparePage');
const logo = document.getElementById('logo');
const authButton = document.getElementById('authButton');
const greeting = document.getElementById('greeting');
const startButton = document.getElementById('startButton');

function showPage(page) {
    [promoPage, loginPage, comparePage].forEach(p => p.classList.add('hidden'));
    page.classList.remove('hidden');
}

function renderHeader() {
    if (isLoggedIn()) {
        greeting.textContent = `Hello, ${getUser()}!`;
        authButton.textContent = 'Log out';
        startButton.style.display = 'inline-block';
    } else {
        greeting.textContent = '';
        authButton.textContent = 'Log in';
        startButton.style.display = 'none';
    }
}

function setupNavigation() {
    logo.addEventListener('click', () => {
        renderHeader();
        showPage(promoPage);
    });

    authButton.addEventListener('click', () => {
        if (isLoggedIn()) {
            logout();
            renderHeader();
            showPage(promoPage);
        } else {
            showPage(loginPage);
        }
    });

    startButton.addEventListener('click', () => {
        showPage(comparePage);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    setupNavigation();
    setupLogin(() => {
        renderHeader();
        showPage(promoPage);
    });
    setupComparePage();
});
