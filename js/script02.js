const taskInput = document.getElementById('task-input');
const inputButton = document.getElementById('task-button');
const taskList = document.getElementById('task-list');

// ローカルストレージからタスク一覧を取得（データがなければ空の配列を作成）
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// タスクを表示する処理
function createTodo() {
    taskList.innerHTML = ''; // 既存のタスクをクリア

    // savedTasks配列を、li要素の配列に変換する
    const taskItems = savedTasks.map((todo) => {
        // 分割代入 todo.id / todo.num を取り出している
        const { text, num, parity } = todo;

        const li = document.createElement('li');
        li.id = 'task-item';
        li.classList = 'task-item';

        const label = document.createElement('label');
        label.value = '';
        label.id = 'item-label';
        label.textContent = text;
        label.classList = parity;

        const deleteBtn = document.createElement('input')
        deleteBtn.value = '🗑️';
        deleteBtn.id = 'delete-button';
        deleteBtn.type = 'button';
        deleteBtn.onclick = () => deleteTasks(text, num);

        li.append(label, deleteBtn);
        return li;
    });

    // .append(...配列)は、配列の要素を展開して一つずつ渡している
    taskList.append(...taskItems);
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
            parity: parityCheck(taskNum) // 偶数であればfalse
        };

        // saveTasks配列の最後に新しいタスクを追加する
        // savedTasks.push(newTask);
        savedTasks = [...savedTasks, newTask];

        saveTodo();
        createTodo(); // タスクを表示する処理を実行
        taskInput.value = ''; // 入力欄をクリア

        alert('タスクが保存されました: ' + taskValue); // 保存完了のアラート
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

function deleteTasks(t, n) {
    // alert(t + '削除しました');

    // const index = savedTasks.findIndex(todo => todo.num === n);
    // console.log(index);

    // if (index !== -1) {
    //     savedTasks.splice(index, 1); // タスクからindexの1つ削除(配列から削除)
    // }
    savedTasks = savedTasks.filter((todo) => todo.num !== n).map((todo) => {
        if (todo.num > n) {
            const reNun = todo.num - 1;
            return { ...todo, num: reNun, parity: parityCheck(reNun)}
        }
        return todo
    })

    saveTodo(); // ローカルストレージに保存
    createTodo(); // タスクを表示する処理を実行
}

// 初期表示
createTodo();

// ボタンがクリックされたらaddTaskを実行する
inputButton.addEventListener('click', addTask);