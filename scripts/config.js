// ------------- main and nav variables ------------
const navLinks = document.querySelectorAll('.nav-link');
const headline = document.querySelector('h1');
const sections = document.querySelectorAll('.section');

// ------------- book grid section -----------------
const booksGrid = document.getElementById('books-grid');

// ------------- new book form section -------------
const form = document.querySelector('form');
const newBookTitle = document.getElementById('new-title');
const newBookAuthor = document.getElementById('new-author');
const addBookBtn = document.getElementById('add-book');

// ------------- Classes ---------------------------
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
    form.classList.remove('active');
    booksGrid.classList.add('active');
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
        `<article class="book-item">
          <div class="item-meta">
            <h2>"${book.title}"</h2>
            <span>by</span>
            <p>${book.author}</p>
          </div>
            <button class="remove-book btn" data-id="${book.id}">Remove</button>
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

// ------------- functions -------------------------
const renderContent = (currSection) => {
  sections.forEach((section) => section.classList.remove('active'));
  document.querySelector(`${currSection}`).classList.add('active');
  if (currSection === '#books-grid') {
    headline.textContent = 'All awesome books';
  } else if (currSection === 'form') {
    headline.textContent = 'Add a new Book';
  } else {
    headline.textContent = 'Contact Information';
  }
};
// ------------- call func and listeners -----------
new Book().renderBooksGrid();
navLinks.forEach((link) => link.addEventListener('click', (e) => {
  renderContent(e.target.dataset.link);
}));
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(
    Math.floor((Math.random() * Date.now())), newBookTitle.value, newBookAuthor.value,
  );
  newBook.addBook();
});