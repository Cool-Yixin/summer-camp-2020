const $ = function (sel) {
    return document.querySelector(sel);
};
const $All = function (sel) {
    return document.querySelectorAll(sel);
};
let guid = 0;
const CL_COMPLETED = 'completed';
const CL_SELECTED = 'selected';
const CL_EDITING = 'editing';

function update() {
    const items = $All('.todo-list li');
    const filter = $('.filters li a.selected').innerHTML;
    let leftNum = 0;
    let item, i, display;

    //leftItem
    for (i = 0; i < items.length; ++i) {
        item = items[i];
        if (!item.classList.contains(CL_COMPLETED)) leftNum++;

        // filters
        display = 'none';
        if (filter == 'All' ||
            (filter == 'Active' && !item.classList.contains(CL_COMPLETED)) ||
            (filter == 'Completed' && item.classList.contains(CL_COMPLETED))
        ) {
            display = 'block';
        }
        item.style.display = display;
    }

    let completedNum = items.length - leftNum;
    const count = $('.todo-count');
    count.innerHTML = (leftNum || 'No') + (leftNum > 1 ? ' items' : ' item') + ' left';

    const clearCompleted = $('.clear-completed');
    clearCompleted.style.visibility = completedNum > 0 ? 'visible' : 'hidden';

    const toggleAll = $('.toggle-all');
    toggleAll.style.visibility = items.length > 0 ? 'visible' : 'hidden';
    toggleAll.checked = items.length == completedNum;
}

function addTodo(message) {
    const todoList = $('.todo-list');

    const item = document.createElement('li');
    let id = 'item' + guid++;
    item.setAttribute('id', id);
    item.innerHTML = [
        '<div class="view">',
        '  <input class="toggle" type="checkbox">',
        '  <label class="todo-label">' + message + '</label>',
        '  <button class="destroy"></button>',
        '</div>'
    ].join('');

    const label = item.querySelector('.todo-label');
    label.addEventListener('dblclick', function () {
        item.classList.add(CL_EDITING);

        const edit = document.createElement('input');
        let finished = false;
        edit.setAttribute('type', 'text');
        edit.setAttribute('class', 'edit');
        edit.setAttribute('value', label.innerHTML);

        function finish() {
            if (finished) return;
            finished = true;
            item.removeChild(edit);
            item.classList.remove(CL_EDITING);
        }

        edit.addEventListener('blur', function () {
            finish();
        });

        edit.addEventListener('keyup', function (ev) {
            if (ev.keyCode == 27) { // Esc
                finish();
            } else if (ev.keyCode == 13) {
                label.innerHTML = this.value;
                finish();
            }
        });

        item.appendChild(edit);
        edit.focus();
    }, false);

    item.querySelector('.toggle').addEventListener('change', function () {
        updateTodo(id, this.checked);
    });

    item.querySelector('.destroy').addEventListener('click', function () {
        removeTodo(id);
    });

    todoList.insertBefore(item, todoList.firstChild);
    update();
}

function updateTodo(itemId, completed) {
    const item = $('#' + itemId);
    if (completed) item.classList.add(CL_COMPLETED);
    else item.classList.remove(CL_COMPLETED);
    update();
}

function removeTodo(itemId) {
    const todoList = $('.todo-list');
    const item = $('#' + itemId);
    todoList.removeChild(item);
    update();
}

function clearCompletedTodoList() {
    const todoList = $('.todo-list');
    const items = todoList.querySelectorAll('li');
    for (let i = items.length - 1; i >= 0; --i) {
        let item = items[i];
        if (item.classList.contains(CL_COMPLETED)) {
            todoList.removeChild(item);
        }
    }
    update();
}

function toggleAllTodoList() {
    const items = $All('.todo-list li');
    const toggleAll = $('.toggle-all');
    const checked = toggleAll.checked;
    for (let i = 0; i < items.length; ++i) {
        let item = items[i];
        const toggle = item.querySelector('.toggle');
        if (toggle.checked != checked) {
            toggle.checked = checked;
            if (checked) item.classList.add(CL_COMPLETED);
            else item.classList.remove(CL_COMPLETED);
        }
    }
    update();
}

window.onload = function init() {
    const newTodo = $('.new-todo'); // todo
    newTodo.addEventListener('keyup', function (ev) {
        // Enter
        if (ev.keyCode != 13) return;

        let message = newTodo.value;
        if (message == '') {
            console.warn('message is empty');
            return;
        }

        addTodo(message);
        newTodo.value = '';
    });
    const clearCompleted = $('.clear-completed');
    clearCompleted.addEventListener('click', function () {
        clearCompletedTodoList();
    });

    const toggleAll = $('.toggle-all');
    toggleAll.addEventListener('change', function () {
        toggleAllTodoList();
    });

    const filters = $All('.filters li a');
    for (let i = 0; i < filters.length; ++i) {
        (function (filter) {
            filter.addEventListener('click', function () {
                for (let j = 0; j < filters.length; ++j) {
                    filters[j].classList.remove(CL_SELECTED);
                }
                filter.classList.add(CL_SELECTED);
                update();
            });
        })(filters[i])
    }

    update();
};