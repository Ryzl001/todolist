$(document).ready(() => { // uruchomi się dopiero jak cały DOM zostanie załadowany
  $.getJSON('/api/todos')
    .then(addTodos)
    .catch(err => console.log(err))

  $('#todoInput').keypress(event => {
    if(event.which == 13) { // numer 13 odpowiada za Enter na klawiaturze, jeśli zostanie wciśnięty Enter to ...
      // create todo
      createTodo();
    }
  });


  // bez funkcji strzałkowej bo wtedy this nie będzie działać
  $('.list').on('click', 'span', function() {
    // odnosimy się do istniejącego elementu na stronie w tym przypadku do listy ul a po evencie 'click' określamy na jaki element tylko ma działać click - 'span' znajdujący się w tej liście '.list'
    // $(this).parent().remove(); // usuwa tylko element <li></li> ale po odświeżeniu znowu się pojawiają bo nei zostały usunięte z bazy danych
    removeTodo($(this).parent()); // usuwamy całe li (rodzic spana)
  });

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
  const newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');  // class można dodać w ten sposób lub  newTodo.addClass('task')

    newTodo.data('id', todo._id); // metoda, która pozwala przypisać np id do wybranego elementu (nie będzie widoczne na stronie, jquery przechowuje w pamięci)

    // newTodo.addClass('task')
    if(todo.completed) { // musimy się odnosić do todo które jest częscią danych w bazie danych
      newTodo.addClass('done')
    }
    $('.list').append(newTodo)
}

// create todo
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

function removeTodo(todo) {
  const clickedId = todo.data('id') // przypisujemy id do zmiennej
  const deleteUrl = '/api/todos/' + clickedId;

  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(data => {
    todo.remove();
  })
  .catch(err => console.log(err))
}
