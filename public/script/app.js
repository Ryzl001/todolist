$(document).ready(() => { // uruchomi się dopiero jak cały DOM zostanie załadowany
  $.getJSON('/api/todos')
    .then(addTodos)
    .catch(err => console.log(err))

  $('#todoInput').keypress(event => {
    if(event.which == 13) { // numer 13 odpowiada za Enter na klawiaturze, jeśli zostanie wciśnięty Enter to ...
      // create todo
      createTodo();
    }
  })
});

// funckja która wyświetla wszystkie todos
const addTodos = (todos) => {
  // add todos to the page
  todos.forEach(todo => {
    addTodo(todo)
  })
}

// funkcja która dodaje pojedyczy todo
const addTodo = (todo) => {
  const newTodo = $('<li class="task">' + todo.name + '</li>');  // class można dodać w ten sposób lub  newTodo.addClass('task')
    // newTodo.addClass('task')
    if(todo.completed) { // musimy się odnosić do todo które jest częscią danych w bazie danych
      newTodo.addClass('done')
    }
    $('.list').append(newTodo)
}

const createTodo = () => {
  // send request to create new todo
  const usrInput = $('#todoInput').val(); // pobieramy z inputa to co wpisał user
  $.post('/api/todos', {name: usrInput})
    .then(newTodo => {
      $('#todoInput').val(''); // Czyści input - ustawiamy pusty string
      addTodo(newTodo);  // dodajemy stworzony todo do listy za pomocą wcześniej utworzonej funkcji
    })
    .catch(err => console.log(err))
}

