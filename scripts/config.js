// ------------- book grid var ----------------
const booksGrid = document.getElementById('books-grid');

// ------------ add book form vars -------------
const newBookTitle = document.getElementById('new-title');
const newBookAuthor = document.getElementById('new-author');
const addBookBtn = document.getElementById('add-book');

// ----------- Classes ------------------------
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

  addBook() {
    if (newBookTitle.value.trim() === '' || newBookAuthor.value.trim() === '') {
      return;
    }

    Book.books.push(this);
    localStorage.setItem('books', JSON.stringify(Book.books));

    newBookTitle.value = '';
    newBookAuthor.value = '';
    this.renderBooksGrid();
  }

  removeBook(id) {
    Book.books = Book.books.filter((book) => book.id !== +id);
    localStorage.setItem('books', JSON.stringify(Book.books));
    this.renderBooksGrid();
  }

  renderBooksGrid() {
    booksGrid.innerHTML = '';
    Book.books.forEach((book) => {
      booksGrid.insertAdjacentHTML('beforeend',
        `<article>
              <h2>${book.title}</h2>
              <p>${book.author}</p>
              <button class="remove-book" data-id="${book.id}">Remove</button>
              <hr>
          </article>`);
    });

    // ------------ remove book --------------------
    const removeBookBtn = document.querySelectorAll('.remove-book');

    // ------------ event listener -----------------
    removeBookBtn.forEach((btn) => btn.addEventListener('click', (e) => {
      this.removeBook(e.target.dataset.id);
    }));
  }
}

// ----------- call func and listeners -----
new Book().renderBooksGrid();
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(
    Math.floor((Math.random() * Date.now())), newBookTitle.value, newBookAuthor.value,
  );
  newBook.addBook();
});