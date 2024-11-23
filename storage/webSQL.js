export function manageWebSQL() {
    const list = document.getElementById('websql-list');
    const keyInput = document.getElementById('websql-key');
    const valueInput = document.getElementById('websql-value');
    const addButton = document.getElementById('add-websql');

    if (!window.openDatabase) {
        console.error('Web SQL is not supported by your browser.');
        alert('Web SQL is not supported by your browser.');
        return;
    }

    const db = openDatabase('DemoDB', '1.0', 'Web SQL Demo', 2 * 1024 * 1024);

    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT)',
            [],
            () => console.log('Table "items" is ready'),
            (tx, error) => console.error('Error creating table:', error.message)
        );
    });

    function render() {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM items',
                [],
                (tx, results) => {
                    const rows = results.rows;
                    list.innerHTML = '';

                    for (let i = 0; i < rows.length; i++) {
                        const item = rows.item(i);
                        const li = document.createElement('li');
                        li.textContent = `${item.key}: ${item.value}`;

                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.style.marginLeft = '10px';
                        deleteBtn.addEventListener('click', () => {
                            deleteData(item.id);
                        });

                        li.appendChild(deleteBtn);
                        list.appendChild(li);
                    }
                },
                (tx, error) => console.error('Error fetching data:', error.message)
            );
        });
    }

    function addData(key, value) {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO items (key, value) VALUES (?, ?)',
                [key, value],
                () => {
                    console.log('Data added successfully');
                    render();
                },
                (tx, error) => console.error('Error inserting data:', error.message)
            );
        });
    }

    function deleteData(id) {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM items WHERE id = ?',
                [id],
                () => {
                    console.log('Data deleted successfully');
                    render();
                },
                (tx, error) => console.error('Error deleting data:', error.message)
            );
        });
    }

    addButton.addEventListener('click', () => {
        const key = keyInput.value.trim();
        const value = valueInput.value.trim();

        if (!key || !value) {
            alert('Please enter both Key and Value');
            return;
        }

        addData(key, value);
        keyInput.value = '';
        valueInput.value = '';
    });

    render();
}
