$(document).ready(function () {
    loadTasks();

    $('#addTask').click(function () {
        let taskText = $('#taskInput').val().trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks();
            $('#taskInput').val("");
        }
    });

    $(document).on("click", ".complete", function () {
        $(this).parent().toggleClass("completed");
    });

    $('#taskList').on('click', '.delete', function () {
        $(this).closest('.task').remove();
        saveTasks();
    });

    $('#taskList').on('click', '.edit', function () {
        let taskSpan = $(this).siblings('span');
        let newText = prompt("Edit task:", taskSpan.text());
        if (newText !== null && newText.trim() !== "") {
            taskSpan.text(newText.trim());
            saveTasks();
        }
    });
});

function addTask(text) {
    $('#taskList').append(`
        <li class="task">
            <span>${text}</span>
            <button class="complete">Complete</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </li>
    `);
}

function saveTasks() {
    let tasks = [];
    $('#taskList .task').each(function () {
        tasks.push({
            text: $(this).find('span').text(),
            completed: $(this).hasClass('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            $('#taskList .task:last').addClass('completed');
        }
    });
}