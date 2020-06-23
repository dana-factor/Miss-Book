import { bookService } from "../services/book.service.js";
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
// import bookDetails from '../cmps/book-details.cmp.js';

export default {
    template: `
        <main class="app-main book-app">
            <book-filter @filtered="setFilter"></book-filter>
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
            console.log('filter selected');
            this.filterBy = filterBy;
            
        },
        // setCurrBook(book){
        //     console.log('book selected');
        //     this.currBook = book;
            
        // }

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
        bookList
    }
};