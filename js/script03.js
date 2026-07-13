const taskInput = document.getElementById('task-input');
const inputButton = document.getElementById('task-button');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');

// ローカルストレージからタスク一覧を取得（データがなければ空の配列を作成）
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// タスクを表示する処理
function createTodo() {
    taskList.innerHTML = ''; // 既存のタスクをクリア
    completedList.innerHTML = ''; // 完了タスクをクリア

    const incompleteTasks = savedTasks.filter(todo => !todo.completed);
    const completeTasks = savedTasks.filter(todo => todo.completed);

    taskList.append(...incompleteTasks.map(todo => makeEl(todo)));
    completedList.append(...completeTasks.map(todo => makeEl(todo)));
}

// タスクの要素を作成する処理
function makeEl(todo) {
    // 分割代入 todo.text / todo.num / todo.parity / todo.completed を取り出している
    const { text, num, parity, completed } = todo;

    const li = document.createElement('li');
    li.id = 'task-item';
    li.classList = 'task-item';
    if (completed) li.classList.add('completed');

    const label = document.createElement('label');
    label.value = '';
    label.id = 'item-label';
    label.textContent = text;
    label.classList = parity;

    const completedBtn = document.createElement('input');
    completedBtn.value = completed ? '未完了' : '完了';
    completedBtn.type = 'button';
    completedBtn.classList = 'complete-button';
    completedBtn.onclick = () => toggleTask(num);

    const deleteBtn = document.createElement('input')
    deleteBtn.value = '削除';
    deleteBtn.id = 'delete-button';
    deleteBtn.type = 'button';
    deleteBtn.classList = 'delete-button';
    deleteBtn.onclick = () => deleteTasks(text, num);

    const buttonArea = document.createElement('div')
    buttonArea.classList = 'button-area';
    buttonArea.append(completedBtn, deleteBtn);

    li.append(label, buttonArea );
    return li;
}

// 追加ボタンがクリックされた時の処理
function addTask() {
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        // savedTaskの数に+1する
        const taskNum = savedTasks.length + 1;

        const newTask = {
            text: taskValue,
            num: taskNum,
            parity: parityCheck(taskNum),// 偶数であればfalse
            completed: false // 　完了済はfalse
        };

        // saveTasks配列の最後に新しいタスクを追加する
        savedTasks = [...savedTasks, newTask];

        saveTodo(); // ローカルストレージに保存
        createTodo(); // タスクを表示する処理を実行
        taskInput.value = ''; // 入力欄をクリア

        // alert('タスクが保存されました: ' + taskValue); // 保存完了のアラート
    }
}

// savedTaskが奇数か偶数か判定する
function parityCheck(num) {
    if (num % 2 !== 0) {
        return true;
    } else {
        return false;
    }
}

// ローカスストレージにタスクを保存
function saveTodo() {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// タスクの完了・未完了を切り替える処理
function toggleTask(n) {
    savedTasks = savedTasks.map(todo => {
        // 同じ番号のタスクだけcompletedを反転する
        if (todo.num === n) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }
        return todo;
    });
    saveTodo();
    createTodo();
}

// 削除ボタンがクリックされたときの処理
function deleteTasks(t, n) {
    // 該当タスクを削除し、それ以降のタスク番号を1ずつ繰り上げる
    savedTasks = savedTasks.filter((todo) => todo.num !== n).map((todo) => {
        // 削除されたnより後ろのタスクの場合（nより大きい場合）
        if (todo.num > n) {
            // タスクの番号を1ずつ減らす
            const reNun = todo.num - 1; // 番号を1ずつ減らす
            // タスク情報をコピーし、新しい番号とそれに応じた奇数・偶数フラグで上書きして返す
            return { ...todo, num: reNun, parity: parityCheck(reNun) }
        }
        // 削除された番号より前のタスクはそのまま残す
        return todo
    })

    saveTodo(); // ローカルストレージに保存
    createTodo(); // タスクを表示する処理を実行
}

// 初期表示
createTodo();

// ボタンがクリックされたらaddTaskを実行する
inputButton.addEventListener('click', addTask);