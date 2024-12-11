// Target necessary elements in the DOM
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".todo__add-button"); // Use class selector
const incompleteTaskHolder = document.getElementById("incomplete-tasks"); // Use correct ID
const completedTasksHolder = document.getElementById("completed-tasks");

// Create a new task list item
const createNewTaskElement = function(taskString) {
    const listItem = document.createElement("li");
    listItem.classList.add('todo__item'); // Add the class for styling

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add('todo__checkbox'); // Add the class for styling

    const label = document.createElement("label");
    label.innerText = taskString;
    label.className = 'todo__label'; // Add the class for styling

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = 'todo__edit-input'; // Add the class for styling

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = 'todo__button todo__button_edit'; // Add the classes for styling

    const deleteButton = document.createElement("button");
    deleteButton.className = 'todo__button todo__button_delete'; // Add the classes for styling

    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = "Delete";
    deleteButtonImg.classList.add('todo__delete-icon'); // Add the class for styling

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Add a new task
const addTask = function() {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

// Edit an existing task
const editTask = function() {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('.todo__edit-input'); // Use class selector
    const label = listItem.querySelector(".todo__label"); // Use class selector
    const editBtn = listItem.querySelector(".todo__button_edit"); // Use class selector
    const containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};

// Delete a task
const deleteTask = function() {
    const listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
}

// Mark a task as completed
const taskCompleted = function() {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
const taskIncomplete = function() {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

// Bind task events to list item children
const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".todo__checkbox"); // Use class selector
    const editButton = taskListItem.querySelector(".todo__button_edit"); // Use class selector
    const deleteButton = taskListItem.querySelector(".todo__button_delete"); // Use class selector

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// Add a new task when the button is clicked
addButton.addEventListener("click", addTask);

// Initialize tasks by binding events to existing list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}