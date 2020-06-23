

export default {
    template: `
        <section class="book-filter">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="Search By Book Title" v-model="filterBy.searchStr" @input="filter"/>
            <select v-model="filterBy.priceRange" @input="filter">
                <option value = "all" >All Prices</option>
                <option value = "1" >Up to 75</option>
                <option value = "2">75 - 150</option>
                <option value = "3">150 and up</option>
            </select>
            <!-- <input type="number" placeholder="speed?" v-model.number="filterBy.speed" @input="filter"/> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                searchStr: '',
                priceRange: 'all'
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
}