export function manageIndexedDB() {
    const list = document.getElementById('indexeddb-list');
    const dbName = 'DemoDB';
    const storeName = 'items';

    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        render(db);

        document.getElementById('add-indexeddb').addEventListener('click', () => {
            const key = document.getElementById('indexeddb-key').value;
            const value = document.getElementById('indexeddb-value').value;
            if (key && value) {
                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                store.add({ key, value });
                transaction.oncomplete = () => render(db);
            }
        });
    };

    function render(db) {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => {
            list.innerHTML = '';
            request.result.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = `${item.key}: ${item.value}`;
                list.appendChild(li);
            });
        };
    }
}
