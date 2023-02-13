// -------------- Objects --------------------
let books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

// ------------- book grid var ----------------
const booksGrid = document.getElementById('books-grid');

// ------------ add book form vars -------------
const newBookTitle = document.getElementById('new-title');
const newBookAuthor = document.getElementById('new-author');
const addBookBtn = document.getElementById('add-book');
