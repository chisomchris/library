const LOCALSTORAGE_KEY = 'books';
const myLibrary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
const form = document.querySelector('form')

renderList(myLibrary);


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
  e.preventDefault()
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
})

function renderList(listArr) {
  const list = document.querySelector('ul.card__grid')
  list.innerHTML = '';
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
  
  card.setAttribute('class', 'card');
  title.setAttribute('class', 'title');
  author.setAttribute('class', 'author');
  numOfPages.setAttribute('class', 'number__of__pages');
  readStatus.setAttribute('class', 'read__status');
  deleteBtn.setAttribute('class', 'delete');

  const titleContent = document.createElement('h2');
  titleContent.textContent = book.title;

  const authorContent = document.createElement('p');
  authorContent.textContent = book.author;

  const numOfPagesContent = document.createElement('p');
  numOfPagesContent.textContent = book.numOfPages;

  const button = document.createElement('button');
  button.textContent = 'Delete';

  title.appendChild(titleContent);
  author.appendChild(authorContent);
  numOfPages.appendChild(numOfPagesContent);

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  if(book.isRead){
    checkbox.setAttribute('checked', '');
  }
  const readContent = document.createElement('p');
  readContent.textContent = 'read';

  readStatus.appendChild(readContent);
  readStatus.appendChild(checkbox);

  deleteBtn.appendChild(button);
  deleteBtn.addEventListener('click', (e) => { 
    const list = document.querySelectorAll('ul.card__grid > li'); 
    const parent = e.target.parentElement.parentElement.parentElement;
    const index = [...list].findIndex(item => item === parent );
    myLibrary.splice(index,1);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(myLibrary))
    renderList(myLibrary);
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(numOfPages);
  card.appendChild(readStatus);
  card.appendChild(deleteBtn);
  return card;
};


