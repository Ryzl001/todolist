$(document).ready(() => { // uruchomi się dopiero jak cały DOM zostanie załadowany
  $.getJSON('/api/todos')
    .then(addTodos)
    .catch(err => console.log(err))
});

const addTodos = (todos) => {
  // add todos to the page
  todos.forEach(todo => {
    const newTodo = $('<li class="task">' + todo.name + '</li>');  // class można dodać w ten sposób lub  newTodo.addClass('task')
    // newTodo.addClass('task')
    if(todo.completed) { // musimy się odnosić do todo które jest częscią danych w bazie danych
      newTodo.addClass('done')
    }
    $('.list').append(newTodo)
  })
}