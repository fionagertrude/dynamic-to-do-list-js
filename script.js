// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Initialize and Load Tasks from Local Storage
    loadTasks();
    
    // Step 3: Create the addTask Function with Local Storage support
    function addTask(taskText, save = true) {
        // If taskText is provided as parameter, use it; otherwise get from input
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }
        
        // Check if the input is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Task Creation and Removal
        // Create new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Add onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };
        
        // Append remove button to list item
        listItem.appendChild(removeButton);
        
        // Append list item to task list
        taskList.appendChild(listItem);
        
        // Save to Local Storage if needed
        if (save) {
            saveTaskToStorage(taskText);
            // Clear the input field only when adding new tasks (not loading)
            taskInput.value = '';
        }
    }
    
    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' indicates not to save again to Local Storage
        });
    }
    
    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
    
    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    // Step 4: Attach Event Listeners
    // Add task when button is clicked
    addButton.addEventListener('click', function() {
        addTask(); // This will use the input value
    });
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // This will use the input value
        }
    });
});