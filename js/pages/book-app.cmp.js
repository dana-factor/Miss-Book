import { bookService } from "../services/book.service.js";
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookAdd from '../cmps/book-add.cmp.js';
// import bookDetails from '../cmps/book-details.cmp.js';

export default {
    template: `
        <main class="app-main book-app">
            <book-filter @filtered="setFilter"></book-filter>
            <book-add @searched="searchGoogleBook" @added="addGoogleBook":googleBooks = googleBooks></book-add>
            <!-- <book-details :book="currBook" @close="setCurrBook" v-if="currBook"></book-details> -->
            <book-list v-if="books" :books="booksToShow"></book-list>
            <!-- <book-list :books="booksToShow" @bookSelected="setCurrBook" v-else></book-list> -->
        </main>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            currBook: null,
            googleBooks: null
        } 
    },
    computed: {
        booksToShow() {
            const filterBy = this.filterBy;
            if (!filterBy) return this.books;

            var filteredBooks = this.books.filter(book => {
                return book.title.toLowerCase().includes(filterBy.searchStr.toLowerCase());
            });
            filteredBooks = filteredBooks.filter(book => {
                if (!filterBy.priceRange) return true
                else if (filterBy.priceRange === "all") return book;
                else if (filterBy.priceRange === "1") return book.listPrice.amount <= 75;
                else if (filterBy.priceRange === "2") return book.listPrice.amount > 75 && book.listPrice.amount <= 150;
                else if (filterBy.priceRange === "3") return book.listPrice.amount > 150;
            });

            return filteredBooks;
        },
    },
    methods: {
        setFilter(filterBy){
            this.filterBy = filterBy;
        },
        searchGoogleBook(searchStr){
            bookService.getGoogleBooks()
                .then(books=> {
                    let filteredBooks = books.items.filter(book=>{
                        return book.volumeInfo.title.toLowerCase().includes(searchStr.toLowerCase())
                    })
                    this.googleBooks =  filteredBooks
                })
        },
        addGoogleBook(googleBook){
            bookService.addGoogleBook(googleBook);
        }
   
    },
    created() {
        bookService.getBooks()
            .then(books =>{
                 this.books = books;
            })
    },
    components: {
        // bookDetails,
        bookFilter,
        bookList,
        bookAdd
    }
};