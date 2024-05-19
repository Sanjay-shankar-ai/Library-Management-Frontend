// script.js

document.addEventListener("DOMContentLoaded", () => {
    const bookListElement = document.getElementById("book-list");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    const filters = {
        title: '',
        author: '',
        subject: '',
        publishDate: ''
    };

    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            subject: "Fiction",
            publishDate: "1925",
            image: "images/img1.jpg"
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            subject: "Fiction",
            publishDate: "1860",
            image: "images/img2.jpg"
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            subject: "Dystopian",
            publishDate: "1949",
            image: "images/img3.jpg"
        },
    ];

    let filteredBooks = books;
    let currentPage = 1;
    const limit = 10;

    const filterBooks = () => {
        filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
            book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
            book.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
            book.publishDate.toLowerCase().includes(filters.publishDate.toLowerCase())
        );
        currentPage = 1;
        updateBookList();
        updatePagination();
    };

    const updateBookList = () => {
        bookListElement.innerHTML = '';
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        const paginatedBooks = filteredBooks.slice(start, end);
        paginatedBooks.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <div>
                    <h2>${book.title}</h2>
                    <p>${book.author}</p>
                    <p>${book.subject}</p>
                    <p>${book.publishDate}</p>
                </div>
            `;
            bookListElement.appendChild(bookItem);
        });
    };

    const updatePagination = () => {
        const totalPages = Math.ceil(filteredBooks.length / limit);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    };

    const handleFilterChange = (event) => {
        const { id, value } = event.target;
        filters[id.replace('filter-', '')] = value;
        filterBooks();
    };

    document.querySelectorAll('.filters input').forEach(input => {
        input.addEventListener('input', handleFilterChange);
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateBookList();
            updatePagination();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage * limit < filteredBooks.length) {
            currentPage++;
            updateBookList();
            updatePagination();
        }
    });

    // Initial load
    filterBooks();
});
