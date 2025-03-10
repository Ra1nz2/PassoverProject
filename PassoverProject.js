document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-btn"); // "Add" button
    const taskInput = document.getElementById("new-task"); // Input field
    const taskList = document.getElementById("task-list"); // Task list

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(li => {
            const text = li.querySelector("span").textContent;
            const completed = li.classList.contains("completed");
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Function to create and append a task element
    const createTaskElement = (taskText, completed = false) => {
        const li = document.createElement("li");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        if (completed) {
            li.classList.add("completed");
            taskSpan.classList.add("outlined");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        // Delete task
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        // Mark task as completed
        taskSpan.addEventListener("click", () => {
            li.classList.toggle("completed");
            taskSpan.classList.toggle("outlined");
            saveTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = "";
    };

    // Load tasks when the page loads
    loadTasks();

    // Event listener for Add button click
    addButton.addEventListener("click", addTask);

    // Event listener for Enter key press
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
