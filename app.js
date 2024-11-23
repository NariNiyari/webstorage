import { manageLocalStorage } from './storage/localStorage.js';
import { manageSessionStorage } from './storage/sessionStorage.js';
import { manageIndexedDB } from './storage/indexedDB.js';
import { manageWebSQL } from './storage/webSQL.js';

document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-content').forEach((content) => content.classList.add('hidden'));
        const tabId = tab.dataset.tab;
        document.getElementById(tabId).classList.remove('hidden');
    });
});

manageLocalStorage();
manageSessionStorage();
manageIndexedDB();
manageWebSQL();