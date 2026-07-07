const taskInput = document.getElementById('task-input');
const inputButton = document.getElementById('task-button');
const taskList = document.getElementById('task-list');

// ローカルストレージからタスク一覧を取得（データがなければ空の配列を作成）
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 追加ボタンがクリックされた時の処理
function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue !== '') {
        savedTasks.push(taskValue); // saveTasksにtaskValueを追加
        console.log(savedTasks);
        saveTodo(); // ローカルストレージに保存

        taskInput.value = ''; // 入力欄をクリア

        alert('タスクが保存されました: ' + taskValue); // 保存完了のアラート

        createTodo(); // タスクを表示する処理を実行
    };
};

// ローカスストレージにタスクを保存
function saveTodo() {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// 削除ボタンがクリックされたとき（onclick="deleteTasks"）の処理
function deleteTasks(t, i) {
    alert(t + '削除しました');
    savedTasks.splice(i, 1); // タスクからindexの1つ削除(配列から削除)
    saveTodo(); // ローカルストレージに保存
    createTodo(); // タスクを表示する処理を実行
}

// タスクを表示する処理
function createTodo() {
    taskList.innerHTML = '';
    savedTasks.forEach((todo, index) => {
        //　innerHTMLでHTML文字列を追加する
        taskList.innerHTML += `
            <li class="task-item" id="task-item">
                <label id="item-label" value="">${todo}</label>
                <input id="delete-button" type="button" value="🗑️" onclick="deleteTasks('${todo}', ${index})">
            </li>
        `;
    });
}

// 初期表示
createTodo();

// ボタンがクリックされたらaddTaskを実行する
inputButton.addEventListener('click', addTask);