export function manageLocalStorage() {
    const list = document.getElementById('local-list');
    const keyInput = document.getElementById('local-key');
    const valueInput = document.getElementById('local-value');
    const addButton = document.getElementById('add-local');

    function render() {
        list.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                localStorage.removeItem(key);
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
            localStorage.setItem(key, value);
            render();
        }
    });

    render();
}
