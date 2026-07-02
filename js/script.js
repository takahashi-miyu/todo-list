// document.addEventListener('DOMContentLoaded', function () {
    // タスク追加ボタンのクリックイベントリスナーを設定
    function addTask() {
        // const taskButton = document.getElementById('task-button');
        const taskInput = document.getElementById('task-input');
        const taskValue = taskInput.value.trim();        

        if(taskValue) {
            taskInput.value = ''; // 入力欄をクリア

            // タスクを追加する処理
                const taskList = document.getElementById('task-list');
            taskList.innerHTML += `<li class="task-item" id="task-item">
                <label id="item-label" value="">${taskValue}</label>
                <input id="delete-button" type="button" value="🗑️">
            </li>`;

            // 完了したタスクを削除する処理
                // const deleteButtons = document.querySelectorAll('.task-item input[type="button"]');
            document.addEventListener('click', function (event) {
                if (event.target && event.target.id === 'delete-button') {
                    const taskItem = event.target.closest('.task-item');
                    if (taskItem) {
                        taskItem.remove();
                    }
                }
            });

        }

    };
// });
