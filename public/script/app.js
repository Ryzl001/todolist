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

  $('.list').on('click', 'li', function(){
    updateTodo($(this));
  })

  // bez funkcji strzałkowej bo wtedy this nie będzie działać
  $('.list').on('click', 'span', function(event) {
    // odnosimy się do istniejącego elementu na stronie w tym przypadku do listy ul a po evencie 'click' określamy na jaki element tylko ma działać click - 'span' znajdujący się w tej liście '.list'
    // $(this).parent().remove(); // usuwa tylko element <li></li> ale po odświeżeniu znowu się pojawiają bo nei zostały usunięte z bazy danych
    event.stopPropagation(); // zapobiega uruchomieniu się innego trigera, jak klikniemy na span to nie uruchomi się triger który jest ustawiony na rodzica w tym wypadku li
    removeTodo($(this).parent()); // usuwamy całe li (rodzic spana)
  });
});

// *********************************************
// Funkcje pomocnicze
// *********************************************

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
    newTodo.data('completed', todo.completed);

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


function updateTodo(todo) {
  const updateUrl = '/api/todos/' + todo.data('id');
  const isDone = !todo.data('completed'); // przypisujemy odwrotność akutalnego stanu danego elementu, isDone to wartość na jaką chcemy zmienić
  const updateData = { completed: isDone }
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData  // zmieniamy odwrotność rzeczywistego stanu
  })
  .then(updateTodo => { // zwraca zaktualizowany todo
    todo.toggleClass('done'); // jeśli ma taką klasę to ją usunie, jeśli nie ma to ją doda
    todo.data('completed', isDone); // przypisuje ... ???
  })
}