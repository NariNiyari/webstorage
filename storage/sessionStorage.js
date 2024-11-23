export function manageSessionStorage() {
    const list = document.getElementById('session-list');
    const keyInput = document.getElementById('session-key');
    const valueInput = document.getElementById('session-value');
    const addButton = document.getElementById('add-session');

    function render() {
        list.innerHTML = '';
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                sessionStorage.removeItem(key);
                render();
            };
            li.appendChild(deleteBtn);
            list.appendChild(li);
        }
    }

    addButton.addEventListener('click', () => {
        const key = keyInput.value;
        const value = valueInput.value;
        if (key && value) {
            sessionStorage.setItem(key, value);
            render();
        }
    });

    render();
}
