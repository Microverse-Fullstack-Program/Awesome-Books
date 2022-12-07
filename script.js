const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const addBtn = document.querySelector('#add-book');
const errorMsg = document.querySelector('.error');

class book {
    constructor (title, author, id) {
      this.title = title;
      this.author = author;
      this.id = id;
    }

    displayBooks = (title=this.title, author=this.author, id = this.id) => {
      const addNewBook = document.createElement('div');
      addNewBook.id = id;
      addNewBook.innerHTML = `
        <p>${title}</p>
        <p>${author}</p>
        <button class="remove-btn ${id}">Remove</button>
      `;
      console.log("i am here2")
      const booksList = document.querySelector('#book-list');
      booksList.appendChild(addNewBook);

      const removeBtn = document.querySelectorAll('.remove-btn');
      removeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          const booksList = document.querySelectorAll('#book-list div');
          booksList.forEach((theBook) => {
            if (theBook.id === btn.classList[1]) {
              theBook.remove();
              const books = JSON.parse(localStorage.getItem('books'));
              localStorage.removeItem('books');
              const newBooks = books.filter((theBook) => {
                if (theBook.id !== JSON.parse(btn.classList[1])) {
                  return true;
                }
                return false;
              });
              if (newBooks.length > 0) {
                localStorage.setItem('books', JSON.stringify(newBooks));
              }
            }
          });
        });
      });
    };
  } //end of the class

addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const id = Date.now();
  if (bookTitle.value && bookAuthor.value) {
    errorMsg.classList.remove('active');
    const newBook = new book (title, author, id);
    bookTitle.value = '';
    bookAuthor.value = '';
    let books = localStorage.getItem('books');
    if (books === null) {
      books = [];
    } else {
      books = JSON.parse(books);
    }
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    newBook.displayBooks (title, author, id);
  } else {
    errorMsg.innerHTML = 'Please enter book details';
    errorMsg.classList.add('active');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  let books = localStorage.getItem('books');
  books = JSON.parse(books);
  if (books) {
    books.forEach((bk) => {
      const theBook = new book(bk.title, bk.author, bk.id)
      theBook.displayBooks();
    });
  }
});
