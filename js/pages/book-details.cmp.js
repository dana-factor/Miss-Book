import { bookService } from "../services/book.service.js";
import reviewAdd from "../cmps/review-add.cmp.js";
// import reviewDetails from "../cmps/review-details.cmp.js"

export default {
  template: `
  <section v-if="book" class="book-details" :class="getPriceDisplay">
    <button class="close" @click="close">X</button>
    <div class="info">
      <h3 class="book-title">{{book.title}} / {{getBookAuthors}} ({{book.publishedDate}}{{getReleaseDesc}})</h3>
      <h4>{{book.subtitle}}</h4>
      <p>{{book.description}}</p>
      <p class="price">{{getFormatedCurrency}}<img class="sale" v-if="book.listPrice.isOnSale" src="img/sale.png"/></p>
      <p>Language: {{book.language.toUpperCase()}}.</p>
      <p>Page Count: {{book.pageCount}} {{getLengthDesc}}</p>
      <p>Categories: {{getBookCategories}}</p>
      <p>Book ID: {{book.id}}</p>
      <img class="book-cover":src="book.thumbnail">      
    </div>
    <div class="reviews flex wrap">
      <review-add @reviewAdded="saveReview" ></review-add>
      <p v-if="!reviews">No reviews yet.. Write a review and help others!</p>
      <div v-else v-for="(review, idx) in book.reviews">
        <button @click="remove(idx)">Delete Review</button>
        <h4>{{review.writenBy}}'s review:</h4>
        <h5>Rate:</h5> <p>{{review.rate}}</p>
        <h5>Read at:</h5> <p>{{review.readAt}}</p>
        <p>{{review.review}}</p>
      </div>
    </div>
            <!-- <review-details v-for="review in book.reviews" :review="review"></review-details> -->
  </section>
 
    `,
  data() {
    return {
      book: null,
    };
  },
  methods: {
    close() {
      this.$router.push("/books");
    },

    remove(idx) {
      bookService.removeReview(idx,this.book.id)
    },

    saveReview({review,bookId}){
      bookService.addReview(bookId, review)
    }
  },
  computed: {
    getBookAuthors() {
      let authorsStr = "";
      this.book.authors.map((author, idx) => {
        if (idx === 0 && this.book.authors.length === 1)
          authorsStr += author + ".";
        else if (idx === 0) authorsStr += author;
        else if (
          idx === this.book.authors.length - 1 &&
          this.book.authors.length > 1
        )
          authorsStr += ", " + author + ".";
        else {
          authorsStr += ", " + author;
        }
      });
      console.log(authorsStr);
      return authorsStr;
    },
    getBookCategories() {
      let categoriesStr = "";
      this.book.categories.map((category, idx) => {
        if (idx === 0 && this.book.categories.length === 1)
          categoriesStr += category + ".";
        else if (idx === 0) categoriesStr += category;
        else if (idx === this.book.categories.length - 1 && this.book.categories.length > 1) categoriesStr += ", " + category + ".";
        else {categoriesStr += ", " + category}
      });
      return categoriesStr;
    },
    getLengthDesc() {
      if (this.book.pageCount < 100) return "(Light Reading)";
      else if (this.book.pageCount > 500) return "(Long Reading)";
      else if (this.book.pageCount > 200) return "(Decent Reading)";
    },
    getReleaseDesc() {
      let currDate = new Date();
      if (this.book.publishedDate < currDate.getFullYear() - 10)
        return " - Veteran Book";
      if (this.book.publishedDate >= currDate.getFullYear() - 1)
        return " - New!";
    },
    getPriceDisplay() {
      if (this.book.listPrice.amount > 150) return "red";
      else if (this.book.listPrice.amount < 20) return "green";
    },
    getFormatedCurrency() {
      let bookPrice = this.book.listPrice.amount;
      let currencyCode = this.book.listPrice.currencyCode;
      return new Intl.NumberFormat("he-IL", {
        style: "currency",
        currency: currencyCode,
      }).format(bookPrice);
    },
    reviews() {
      let bookReviews = this.book.reviews;
      return !bookReviews || bookReviews.length === 0 ? false : true;
    },
  },
  created() {
    const { bookId } = this.$route.params;
    bookService.getBookById(bookId).then((book) => {
      this.book = book;
      console.log("book details created", book);
    });
  },
  components: {
    reviewAdd,
    // reviewDetails
  },
};
