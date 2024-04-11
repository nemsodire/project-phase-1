const dataPath = './db.json'; // Assuming db.json is in the same directory

const notAvailableMsg = document.getElementById('not-available-msg');

const booksContainer = document.getElementById('books-container');  // Get reference to container element
document.addEventListener('DOMContentLoaded', () => {
    // Your code that fetches data and uses boo
    fetch(dataPath)
        .then(res => res.json()) // Parse the response as JSON
        .then(data => {
            displayBooks(data); // Call function to display books
        })
        .catch(error => console.error(error));
}); // Handle errors during fetching

function displayBooks(data) {
    for (const book of data.books) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book'); // Add a class for styling

        const titleElement = document.createElement('h2');
        titleElement.textContent = book.name;

        const authorElement = document.createElement('p');
        authorElement.textContent = `By: ${book.author}`;

        const imageElement = document.createElement('img');
        imageElement.src = book.image;

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(imageElement);

        booksContainer.appendChild(bookElement);
    }

    // Add event listener for search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterBooks);
}

function filterBooks() {
    const searchTerm = this.value.trim().toLowerCase(); // Get user input and convert to lowercase
    const books = document.querySelectorAll('.book'); // Get all book elements

    let bookFound = false;

    books.forEach(book => {
        const title = book.querySelector('h2').textContent.toLowerCase(); // Get book title and convert to lowercase
        const author = book.querySelector('p').textContent.toLowerCase(); // Get book author and convert to lowercase

        // Check if title or author includes the search term
        if (title.includes(searchTerm) || author.includes(searchTerm)) {
            book.style.display = 'block'; // Show the book if it matches the search term
            book.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to the book
            bookFound = true;
        } else {
            book.style.display = 'none'; // Hide the book if it doesn't match the search term
        }
    });

    if (!bookFound) {
        notAvailableMsg.style.display = 'block'; // Display "Not available" message if no books match the search term
    } else {
        notAvailableMsg.style.display = 'none'; // Hide "Not available" message if books match the search term
    }
}