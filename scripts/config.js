// -------------- Objects --------------------
let books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

// ------------- book grid var ----------------
const booksGrid = document.getElementById('books-grid');

// ------------ add book form vars -------------
const newBookTitle = document.getElementById('new-title');
const newBookAuthor = document.getElementById('new-author');
const addBookBtn = document.getElementById('add-book');

// ------------ functions -----------------------
const renderBooksGrid = () => {
  booksGrid.innerHTML = '';
  books.forEach((book) => {
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

  // ------------ remove book Func ---------------
  const removeBook = (id) => {
    books = books.filter((book) => book.id !== +id);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooksGrid();
  };

  // ------------ event listener -----------------
  removeBookBtn.forEach((btn) => btn.addEventListener('click', (e) => {
    removeBook(e.target.dataset.id);
  }));
};

const addBook = () => {
  if (newBookTitle.value.trim() === '' || newBookAuthor.value.trim() === '') {
    return;
  }

  const newBook = {
    id: Math.floor((Math.random() * Date.now())),
    title: `${newBookTitle.value}`,
    author: `${newBookAuthor.value}`,
  };

  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));

  newBookTitle.value = '';
  newBookAuthor.value = '';
  renderBooksGrid();
};

// ----------- call func and listeners -----
renderBooksGrid();
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
});