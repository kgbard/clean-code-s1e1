document.addEventListener('DOMContentLoaded', function() {
  // Select DOM elements
  var taskInput = document.getElementById("new-task");
  var addButton = document.querySelector(".task-row-wrapper button");
  var incompleteTasksHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");

  // Create new task element
  function createNewTaskElement(taskString) {
    var listItem = document.createElement("li");

    // Create elements
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    // Configure elements
    checkBox.type = "checkbox";
    
    label.textContent = taskString;
    
    editInput.type = "text";
    
    editButton.textContent = "Edit";
    editButton.className = "edit";
    
    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Delete";
    deleteButton.appendChild(deleteButtonImg);

    // Append elements to list item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  // Add a new task
  function addTask() {
    // Prevent adding empty tasks
    if (!taskInput.value.trim()) return;

    var listItem = createNewTaskElement(taskInput.value);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    // Clear input
    taskInput.value = "";
  }

  // Edit an existing task
  function editTask() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type="text"]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");

    // Toggle edit mode
    var containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
      // Save mode
      label.textContent = editInput.value;
      editBtn.textContent = "Edit";
    } else {
      // Edit mode
      editInput.value = label.textContent;
      editBtn.textContent = "Save";
    }

    // Toggle edit mode class
    listItem.classList.toggle("edit-mode");
  }

  // Delete a task
  function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
  }

  // Mark task as completed
  function taskCompleted() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  }

  // Mark task as incomplete
  function taskIncomplete() {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  }

  // Bind events to task list items
  function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector('input[type="checkbox"]');
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    // Bind events
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
    checkBox.addEventListener('change', checkBoxEventHandler);
  }

  // Initial event binding for existing tasks
  function initExistingTasks() {
    // Bind events to existing incomplete tasks
    Array.from(incompleteTasksHolder.children).forEach(function(taskListItem) {
      bindTaskEvents(taskListItem, taskCompleted);
    });

    // Bind events to existing completed tasks
    Array.from(completedTasksHolder.children).forEach(function(taskListItem) {
      bindTaskEvents(taskListItem, taskIncomplete);
    });
  }

  // Add task button event listener
  addButton.addEventListener('click', addTask);

  // Initialize existing tasks
  initExistingTasks();
});