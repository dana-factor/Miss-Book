export default {
    props: ['googleBooks'],
    template: `
        <section>
            <input type="text" placeholder="Add new books" v-model="searchStr" @input="search"/>
            <ul v-if = "googleBooks" v-for = "book in googleBooks" :key=book.id>
                <li>
                    {{book.volumeInfo.title}}
                    <button @click="addGoogleBook(book)">Add</button>
                </li>
            </ul>
        </section>
    `,
    data(){
        return{
            searchStr: "",
        }
    },
    computed:{

    },
    methods: {
        search() {
            this.$emit('searched', this.searchStr);
        },

        addGoogleBook(googleBook){
            this.$emit('added', googleBook);
            
        }
    },
    created() {
    
    }

}