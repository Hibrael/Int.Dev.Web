
document.addEventListener("DOMContentLoaded", function(){
    //butons
    const toggleButton = document.getElementById('toggle-theme');
    const buttonImage = toggleButton.querySelector('img');
    const addTaskBtn = document.getElementById("add-task");
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filter = document.querySelectorAll('.filter');
    const body = document.body;

    //localStorage

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let theme = localStorage.getItem("theme");
    if (!theme) {
        theme = "dark-mode";
        localStorage.setItem("theme", theme);
    }
    body.classList.add(theme);


    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');

        let currentTheme = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
        localStorage.setItem("theme", currentTheme);

     
    });

  


    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    //funcao para mostras as tarefas na tela
    function renderTasks(filterType = "all") {
        taskList.innerHTML = "";

        tasks.forEach(function (task, index) {
            if (filterType === "pending" && task.completed) return;
            if (filterType === "completed" && !task.completed) return;

            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="edit"><img class="btnTasks" alt="Editar"></button>
                    <button class="delete"><img class="btnTasks" alt="Excluir"></button>
                </div>
            `;

            li.addEventListener("click", function (e) {
                if (e.target.closest("button")?.classList.contains("delete")) {
                    tasks.splice(index, 1);
                } else if (e.target.closest("button")?.classList.contains("edit")) {
                    const newText = prompt("Editar tarefa:", task.text);
                    if (newText) tasks[index].text = newText;
                } else {
                    tasks[index].completed = !tasks[index].completed;
                }

                saveTasks();
                renderTasks(filterType);
            });

            taskList.appendChild(li);
        });
    }
    addTaskBtn.addEventListener("click", function () {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text: text, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { 
            const text = taskInput.value.trim();
            if (text) {
                tasks.push({ text: text, completed: false });
                saveTasks();
                renderTasks();
                taskInput.value = "";
            }
        }
    });

    filter.forEach(function (button) {
        button.addEventListener("click", function () {
            const isActive = button.classList.contains("active");

            filter.forEach(btn => btn.classList.remove("active"));

            if (!isActive) {
                button.classList.add("active");
                renderTasks(button.dataset.filter);
            } 
        });

        button.addEventListener("click", function () {
 
            taskList.classList.toggle("hidden"); 
        });
    });

    renderTasks();
});
