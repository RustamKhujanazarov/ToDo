const formCreate = document.getElementById('form-create');
const inputCreate = document.getElementById("input-create");
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const allClear = document.getElementById("allClear");
// const messageCreate = document.getElementById('message-create')

const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const closeEl = document.getElementById('close');
const clearInput= document.getElementById("clearInput");

let editItemId;

// check
let todos = JSON.parse(localStorage.getItem('list'))
  ? JSON.parse(localStorage.getItem('list'))
  : []

if (todos.length) showTodos()

// setTodos to localstorage
function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos))
}

clearInput.addEventListener("click", () => {
  inputCreate.value = '';
  console.log("salom");

});


// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem('list'))
  listGroupTodo.innerHTML = ''
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
        <div class="newDiw">
          <span class="newDiw__name">${item.text}</span>
          <span class="todo-icons">
            
            <i class="fas fa-pen" onclick=(editTodo(${i})) src="img/edit.svg" alt="edit icon" width="25" height="25"></i>
            <i class="fas fa-trash " onclick=(deleteTodo(${i}))  src="img/delete.svg" alt="delete icon" width="25" height="25"></i>
          </span>
        </div>
        
    `
  })
}

// get Todos
formCreate.addEventListener('submit', (e) => {
  e.preventDefault()
  const todoText = formCreate['input-create'].value.trim()
  formCreate.reset()
  if (todoText.length) {
    todos.push({ text: todoText})
    setTodos()
    showTodos()
  } else {
    alert('Please, Enter some text...')
  }
})

// delete todo
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id
  })

  todos = deletedTodos
  setTodos()
  showTodos()
}



// edit Form
formEdit.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoText = formEdit['input-edit'].value.trim()
  formEdit.reset()
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText
    })
    setTodos()
    showTodos()
    close()
  } else {
    alert('Please, Enter some todo...')
  }
})

// editTodo
function editTodo(id) {
  open()
  editItemId = id
}

overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)

document.addEventListener('keydown', (e) => {
  if (e.which == 27) {
    close()
  }
})

function open() {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

function close() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
};


localStorage.clear(); 
allClear.addEventListener("click", () =>{
  localStorage.removeItem("list");
  todos = []
  listGroupTodo.innerHTML = '';
  console.log('salom');
 
});




