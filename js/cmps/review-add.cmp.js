import {bookService} from '../services/book.service.js'

export default {
    template:`
        <section class="review-add flex column space-around align-center">
            <form @submit.prevent="save" class="">
                <h3>Tell us what you thought about this book</h3>
                <input ref="name" type="text" placeholder="Full Name" v-model="name">
                <select v-model="rate" required>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
                <input type="date" v-model="readAt">
                <textarea v-model="review"></textarea>
                <button>Save Review</button>
            </form>
        </section>    
    `,
     data(){
        return{
            name: 'Books Reader',
            rate: null,
            readAt: '2020-06-23',
            review: null
            // readAt: (new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()).toString()
        }
    },
    methods: {
        // focusInput() {
        //     this.$refs.name.focus();
        // },
        save(){
            const review = {
                writenBy: this.name,
                rate: this.rate,
                readAt: this.readAt,
                review: this.review
            }
            const { bookId } = this.$route.params;
            bookService.addReview(bookId, review)
        }
    },
    mounted(){
        this.$refs.name.focus();
    }
}