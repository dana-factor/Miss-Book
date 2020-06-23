
export default{
  props: ["book"],
  template: `
          <li class="book-preview flex column space-between align-center">
            <router-link :to="'/book/' + book.id">Details</router-link> 
              <h3>{{book.title}}</h3>
              <img :src="book.thumbnail">
              <p>{{getFormatedCurrency}}</p>
              
          </li>
    `,
  computed: {
     getFormatedCurrency() {
        let bookPrice = this.book.listPrice.amount;
        let currencyCode = this.book.listPrice.currencyCode;
        return new Intl.NumberFormat('he-IL', {style: 'currency', currency: currencyCode}).format(bookPrice)
     },
  },
  created () {
    console.log('BOOK',this.book);
    
  }
};
