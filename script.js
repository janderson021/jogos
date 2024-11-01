document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Carregar tarefas do LocalStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Função para salvar tarefas no LocalStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Função para adicionar tarefa na lista
    function addTask(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remover";
        deleteButton.addEventListener("click", function() {
            removeTask(taskText);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Função para remover tarefa
    function removeTask(taskText) {
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();
        renderTasks();
    }

    // Função para renderizar as tarefas na tela
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => addTask(task));
    }

    // Adicionar tarefa ao enviar o formulário
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            saveTasks();
            addTask(taskText);
            taskInput.value = "";
        }
    });

    // Renderizar as tarefas salvas no LocalStorage ao carregar a página
    renderTasks();
});