import bookPreview from './book-preview.cmp.js';

export default{
    props: ['books'],
    template: `
        <ul class="book-list clean-list flex wrap align-center space-around">
            <book-preview v-for="book in books" :key="book.id" :book=book></book-preview>
        </ul>

    `,
    methods: {

  
    },
    components: {
        bookPreview
    }
};