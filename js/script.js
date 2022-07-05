const LOCALSTORAGE_KEY = 'books';
const myLibrary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
const form = document.querySelector('form');
const showFormBtn = document.querySelector('header .head button');
const mode = {edit: false, index: null}
renderList(myLibrary);


showFormBtn.addEventListener('click', () => {
  form.classList.toggle('show');
  if(form.classList.contains('show')) {
    showFormBtn.textContent = 'x'
  } else{
    showFormBtn.textContent = '+'
    mode.edit = false;
    mode.index = null;

    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const numOfPages = document.querySelector('#num__of__pages');
    const readStatus = document.querySelector('#read__status');
    author.value = '';
    title.value = '';
    numOfPages.value = '';
    readStatus.checked = false;
  };
})

function Book(title,author,numOfPages,isRead) {
   this.title = title;
   this.author = author;
   this.numOfPages = numOfPages;
   this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const createBook = ( title, author, numOfPages, isRead) => {
  return new Book(title, author, numOfPages, isRead)
}

form.addEventListener( 'submit', (e) => {
  e.preventDefault();
  if (mode.edit) {
    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const numOfPages = document.querySelector('#num__of__pages');
    const readStatus = document.querySelector('#read__status');

    const index = mode.index;
    myLibrary[index].title = title.value;
    myLibrary[index].author = author.value;
    myLibrary[index].numOfPages = numOfPages.value;
    myLibrary[index].readStatus = readStatus.value;

    author.value = '';
    title.value = '';
    numOfPages.value = '';
    readStatus.checked = false;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(myLibrary));
    renderList(myLibrary);
    form.classList.remove('show');
    showFormBtn.textContent = '+';
    mode.edit = false;
    mode.index = null;
  } else {
    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const numOfPages = document.querySelector('#num__of__pages');
    const readStatus = document.querySelector('#read__status');

    addBookToLibrary(createBook(title.value, author.value, Number(numOfPages.value), readStatus.checked));

    author.value = '';
    title.value = '';
    numOfPages.value = '';
    readStatus.checked = false;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(myLibrary));
    renderList(myLibrary);
    form.classList.remove('show');
    showFormBtn.textContent = '+';
    mode.edit = false;
    mode.index = null;
  }
  
})

function renderList(listArr) {
  const list = document.querySelector('ul.card__grid');
  if(document.querySelector('.empty__list')){
    const emptyList = document.querySelector('.empty__list');
    document.querySelector('main').removeChild(emptyList)
  }
 
  list.innerHTML = '';
  if (listArr.length < 1){
    const emptyList = document.createElement('div');
    emptyList.setAttribute('class', 'empty__list')
    const msg =  document.createElement('p');
    msg.textContent = 'Your Library is currently empty, click the add button above to add books';
    emptyList.appendChild(msg);
    return document.querySelector('main').appendChild(emptyList)
  }
  return listArr.map(
    (item) => {
      const listItem = createCard(item);
      const li = document.createElement('li')
      li.appendChild(listItem);
      return list.appendChild(li)
    }
  )
}

function createCard(book) {
  const card = document.createElement('div');
  const title = document.createElement('div');
  const author = document.createElement('div');
  const numOfPages = document.createElement('div');
  const readStatus = document.createElement('div');
  const deleteBtn = document.createElement('div');
  deleteBtn.setAttribute('class', 'delete__edit');
  
  card.setAttribute('class', 'card');
  title.setAttribute('class', 'title');
  author.setAttribute('class', 'author');
  numOfPages.setAttribute('class', 'number__of__pages');
  readStatus.setAttribute('class', 'read__status');
 

  const titleContent = document.createElement('h2');
  titleContent.textContent = book.title;

  const authorContent = document.createElement('p');
  authorContent.textContent = 'author : ' + book.author;

  const numOfPagesContent = document.createElement('p');
  numOfPagesContent.textContent = 'pages : ' + book.numOfPages;

  const buttonDel = document.createElement('button');
  buttonDel.setAttribute('class', 'delete');
  buttonDel.textContent = 'Delete';

  const buttonEdit = document.createElement('button');
  buttonEdit.setAttribute('class', 'edit');
  buttonEdit.textContent = 'Edit';

  title.appendChild(titleContent);
  author.appendChild(authorContent);
  numOfPages.appendChild(numOfPagesContent);

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  if(book.isRead){  
    checkbox.setAttribute('checked', '');
  }

  checkbox.addEventListener('change', (e) => {
    const list = document.querySelectorAll('ul.card__grid > li'); 
    const parent = e.target.parentElement.parentElement.parentElement;
    const index = [...list].findIndex(item => item === parent );
    myLibrary[index].isRead = !myLibrary[index].isRead;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(myLibrary));
  })

  const readContent = document.createElement('p');
  readContent.textContent = 'read';

  readStatus.appendChild(readContent);
  readStatus.appendChild(checkbox);

  deleteBtn.appendChild(buttonDel);
  deleteBtn.appendChild(buttonEdit);
  deleteBtn.querySelector('.delete').addEventListener('click', (e) => { 
    const list = document.querySelectorAll('ul.card__grid > li'); 
    const parent = e.target.parentElement.parentElement.parentElement;
    const index = [...list].findIndex(item => item === parent );
    myLibrary.splice(index,1);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(myLibrary))
    renderList(myLibrary);
  });
  deleteBtn.querySelector('.edit').addEventListener('click', (e) => { 
    mode.edit = true;
    showFormBtn.textContent = 'x'
    const list = document.querySelectorAll('ul.card__grid > li'); 
    const parent = e.target.parentElement.parentElement.parentElement;
    const index = [...list].findIndex(item => item === parent );
    mode.index = index;
    form.classList.add('show');
    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const numOfPages = document.querySelector('#num__of__pages');
    const readStatus = document.querySelector('#read__status');
    author.value = myLibrary[index].author;
    title.value = myLibrary[index].title;
    numOfPages.value = myLibrary[index].numOfPages;
    readStatus.checked = myLibrary[index].isRead;


  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(numOfPages);
  card.appendChild(readStatus);
  card.appendChild(deleteBtn);

  return card;
};


