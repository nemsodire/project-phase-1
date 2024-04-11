
const dataPath = './db.json'; // Assuming db.json is in the same directory

const booksContainer = document.getElementById('books-container');  // Get reference to container element
document.addEventListener('DOMContentLoaded', () => {
    // Your code that fetches data and uses boo
fetch(dataPath)
    .then(res => res.json()) // Parse the response as JSON
    .then(data => {
        displayBooks(data); // Call function to display books
    })
    .catch(error => console.error(error));
 }) // Handle errors during fetching

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
}