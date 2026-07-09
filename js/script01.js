const taskInput = document.getElementById('task-input');
const inputButton = document.getElementById('task-button');
const taskList = document.getElementById('task-list');

// ローカルストレージからタスク一覧を取得（データがなければ空の配列を作成）
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// タスクを表示する処理
function createTodo() {
    taskList.innerHTML = ''; // 既存のタスクをクリア

    savedTasks.forEach((todo) => {
        const li = document.createElement('li');
        li.id = 'task-item';
        li.classList = 'task-item';

        const label = document.createElement('label');
        label.value = '';
        label.id = 'item-label';
        label.textContent = todo.text;

        const deleteBtn = document.createElement('input')
        deleteBtn.value = '🗑️';
        deleteBtn.id = 'delete-button';
        deleteBtn.type = 'button';
        deleteBtn.onclick = () => deleteTasks(todo);

        li.appendChild(label);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// 追加ボタンがクリックされた時の処理
function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        // savedTaskの数に+1する
        const taskNum = savedTasks.length + 1;

        const newTask = {
            text: taskValue,
            num: taskNum
        };
        
        // saveTasks配列の最後に新しいタスクを追加する
        savedTasks.push(newTask);

        saveTodo();
        createTodo(); // タスクを表示する処理を実行
        taskInput.value = ''; // 入力欄をクリア

        alert('タスクが保存されました: ' + taskValue); // 保存完了のアラート
    }
}

// ローカスストレージにタスクを保存
function saveTodo() {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTasks(t) {
    alert(t.text + '削除しました');

    const index = savedTasks.findIndex(todo => todo.num === t.num);
    console.log(index);

    if (index !== -1) {
        savedTasks.splice(index, 1); // タスクからindexの1つ削除(配列から削除)
    }

    saveTodo(); // ローカルストレージに保存
    createTodo(); // タスクを表示する処理を実行
}

// 初期表示
createTodo();

// ボタンがクリックされたらaddTaskを実行する
inputButton.addEventListener('click', addTask);