$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshTasks();
  addClickHandlers();
});

// Add click handlers for the submit, read, and delete buttons
function addClickHandlers() {
  $('#addBtn').on('click', handleSubmit);
  $('table').on('click', '.completeBtn', markTask);
  $('table').on('click', '.deleteBtn', deleteTask);
}

function handleSubmit() {
  console.log('In handlesubmit');
  let task = {};
  task.task = $('.htmlInput').val();
  addTask(task);
}


// Add a task to the database
function addTask(taskToAdd) {
  $.ajax({
    type: 'POST',
    url: '/Tasks',
    data: taskToAdd,
  }).then(function(response) {
    console.log('Response from server.', response);
    refreshTasks();
  }).catch(function(error) {
    console.log('Error in POST', error);
    alert('Unable to add task at this time. Please try again later.');
  });
}

// Refresh tasks will get all Tasks from the server and render to page
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/Tasks'
  }).then(function(response) {
    console.log(response);
    renderTasks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of Tasks to the DOM
function renderTasks(tasks) {
  $('#tasklist-tbody').empty();

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let taskStatus = task["Status"] ? 'Complete' : 'Incomplete';

    let row = `
      <tr>
        <td>${task["Task"]}</td>
        <td>${taskStatus}</td>
        <td><button class="completeBtn" data-task-id="${task.id}">Complete</button></td>
        <td><button class="deleteBtn" data-task-id="${task.id}">Delete</button></td>
      </tr>
    `;

    if (task["Status"]) {
      row = $(row).addClass('completed-task');
      $(row).find('.completeBtn').attr('disabled', true);
    }

    $('#tasklist-tbody').append(row);
  }
}

// Deletes a task by logging to the console and making a DELETE request to the server, if something went wrong, alert the user
function deleteTask(event) {
  console.log('Deleting task function');
  const idTasks = $(event.currentTarget).data("task-id");
  console.log('Deleted task');
  $.ajax({
    method: 'DELETE',
    url: `/Tasks/${idTasks}`
  }).then(function(response) {
    $(event.currentTarget).closest('tr').remove(); // Remove the task from the webpage
    refreshTasks(); // Refresh the task list to update the webpage
  }).catch((error) => {
    alert('Error in deleteTask DELETE', error);
  })
}

// Marks a task as read by logging to the console that it was read, then makes a PUT request to the server for that task. If something went wrong, alert the user
function markTask(event) {
  console.log('Marking task read');
  const idTasks = $(event.currentTarget).data("task-id");
  const taskRow = $(event.currentTarget).closest('tr');
  $.ajax({
    method: 'PUT',
    url: `/Tasks/${idTasks}/done`,
    data: {
      status: true
    }
  }).then((response) => {
    taskRow.addClass('completed-task');
    refreshTasks();
  }).catch((error) => {
    alert('Error in markTask PUT', error);
  });
}