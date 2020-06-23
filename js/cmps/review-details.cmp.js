import { bookService } from "../services/book.service.js";
import bookDetailes from "../pages/book-details.cmp.js"

export default{
    props: ["review"],
    template:`
    <li>
        <h4>{{review.writenBy}}'s review:</h4>
        <h5>Rate:</h5> <p>{{review.rate}}</p>
        <h5>Read at:</h5> <p>{{review.readAt}}</p>
        <p>{{review.review}}</p>

    </li>
        
    `,
    data(){
        return{

        }
    },
    computed: {
    

    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getBookById(bookId)
          .then((book) => {
            this.review = book;
            console.log('book details created', book);
          });
        
      },
    components:{
        bookDetailes
    }
}